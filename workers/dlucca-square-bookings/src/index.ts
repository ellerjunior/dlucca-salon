const WEBHOOK_PATH = "/webhooks/square/bookings";
const PROCESSING_LEASE_MS = 2 * 60 * 1000;
const MAX_BODY_BYTES = 1_000_000;

export interface Env {
  WEBHOOK_EVENTS: WebhookEventDatabase;
  SQUARE_WEBHOOK_SIGNATURE_KEY?: string;
  SQUARE_NOTIFICATION_URL?: string;
  SQUARE_MERCHANT_ID?: string;
  SQUARE_LOCATION_ID: string;
  GA4_MEASUREMENT_ID: string;
  GA4_API_SECRET?: string;
}

export interface WebhookEventDatabase {
  prepare(query: string): WebhookEventStatement;
}

interface WebhookEventStatement {
  bind(...values: Array<string | number | null>): WebhookEventStatement;
  run(): Promise<{ meta: { changes?: number } }>;
  first<T>(): Promise<T | null>;
}

interface SquareBookingCreatedEvent {
  merchant_id?: unknown;
  location_id?: unknown;
  type?: unknown;
  event_id?: unknown;
  data?: {
    object?: {
      booking?: {
        location_id?: unknown;
        source?: unknown;
        [key: string]: unknown;
      };
    };
  };
  [key: string]: unknown;
}

interface EventRecord {
  status: "processing" | "sent" | "failed";
  updated_at: string;
}

export interface EventStore {
  claim(eventId: string, now: Date): Promise<"claimed" | "sent" | "busy">;
  markSent(eventId: string, now: Date): Promise<void>;
  markFailed(eventId: string, now: Date, errorCode: string): Promise<void>;
}

export interface Ga4Client {
  sendAppointmentBooked(eventId: string): Promise<void>;
}

interface HandlerDependencies {
  eventStore?: EventStore;
  ga4Client?: Ga4Client;
  now?: () => Date;
  verifySignature?: typeof verifySquareSignature;
  fetchImpl?: typeof fetch;
}

class D1EventStore implements EventStore {
  constructor(private readonly db: WebhookEventDatabase) {}

  async claim(eventId: string, now: Date): Promise<"claimed" | "sent" | "busy"> {
    const timestamp = now.toISOString();
    const inserted = await this.db
      .prepare(
        `INSERT OR IGNORE INTO square_webhook_events
          (event_id, status, attempts, received_at, updated_at)
         VALUES (?1, 'processing', 1, ?2, ?2)`,
      )
      .bind(eventId, timestamp)
      .run();

    if ((inserted.meta.changes ?? 0) === 1) return "claimed";

    const existing = await this.db
      .prepare(
        `SELECT status, updated_at
         FROM square_webhook_events
         WHERE event_id = ?1`,
      )
      .bind(eventId)
      .first<EventRecord>();

    if (!existing) throw new Error("event_claim_missing");
    if (existing.status === "sent") return "sent";

    const leaseExpired =
      existing.status === "failed" ||
      Date.parse(existing.updated_at) <= now.getTime() - PROCESSING_LEASE_MS;

    if (!leaseExpired) return "busy";

    const reclaimed = await this.db
      .prepare(
        `UPDATE square_webhook_events
         SET status = 'processing',
             attempts = attempts + 1,
             updated_at = ?2,
             last_error_code = NULL
         WHERE event_id = ?1
           AND status != 'sent'
           AND updated_at = ?3`,
      )
      .bind(eventId, timestamp, existing.updated_at)
      .run();

    return (reclaimed.meta.changes ?? 0) === 1 ? "claimed" : "busy";
  }

  async markSent(eventId: string, now: Date): Promise<void> {
    const timestamp = now.toISOString();
    await this.db
      .prepare(
        `UPDATE square_webhook_events
         SET status = 'sent', updated_at = ?2, sent_at = ?2, last_error_code = NULL
         WHERE event_id = ?1`,
      )
      .bind(eventId, timestamp)
      .run();
  }

  async markFailed(eventId: string, now: Date, errorCode: string): Promise<void> {
    await this.db
      .prepare(
        `UPDATE square_webhook_events
         SET status = 'failed', updated_at = ?2, last_error_code = ?3
         WHERE event_id = ?1`,
      )
      .bind(eventId, now.toISOString(), errorCode)
      .run();
  }
}

class MeasurementProtocolClient implements Ga4Client {
  constructor(
    private readonly measurementId: string,
    private readonly apiSecret: string,
    private readonly fetchImpl: typeof fetch,
  ) {}

  async sendAppointmentBooked(eventId: string): Promise<void> {
    const clientId = await anonymousClientId(eventId);
    const endpoint = new URL("https://www.google-analytics.com/mp/collect");
    endpoint.searchParams.set("measurement_id", this.measurementId);
    endpoint.searchParams.set("api_secret", this.apiSecret);

    const response = await this.fetchImpl(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        events: [
          {
            name: "appointment_booked",
            params: { engagement_time_msec: 1 },
          },
        ],
      }),
    });

    if (!response.ok) throw new Error(`ga4_http_${response.status}`);
  }
}

export async function handleRequest(
  request: Request,
  env: Env,
  dependencies: HandlerDependencies = {},
): Promise<Response> {
  const url = new URL(request.url);

  if (request.method === "GET" && url.pathname === "/health") {
    return Response.json({ status: "ok" }, { headers: { "cache-control": "no-store" } });
  }

  if (url.pathname !== WEBHOOK_PATH) return new Response(null, { status: 404 });
  if (request.method !== "POST") return new Response(null, { status: 405 });

  if (
    !env.SQUARE_WEBHOOK_SIGNATURE_KEY ||
    !env.SQUARE_NOTIFICATION_URL ||
    !env.SQUARE_MERCHANT_ID ||
    !env.SQUARE_LOCATION_ID
  ) {
    return new Response(null, { status: 503 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return new Response(null, { status: 413 });

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return new Response(null, { status: 413 });
  }

  const signature = request.headers.get("x-square-hmacsha256-signature");
  if (!signature) return new Response(null, { status: 403 });

  const verifySignature = dependencies.verifySignature ?? verifySquareSignature;
  const signatureIsValid = await verifySignature(
    rawBody,
    signature,
    env.SQUARE_WEBHOOK_SIGNATURE_KEY,
    env.SQUARE_NOTIFICATION_URL,
  );
  if (!signatureIsValid) return new Response(null, { status: 403 });

  let event: SquareBookingCreatedEvent;
  try {
    event = JSON.parse(rawBody) as SquareBookingCreatedEvent;
  } catch {
    return new Response(null, { status: 400 });
  }

  const eventId = typeof event.event_id === "string" ? event.event_id : "";
  const booking = event.data?.object?.booking;
  const merchantId = typeof event.merchant_id === "string" ? event.merchant_id : "";
  const locationId =
    typeof event.location_id === "string"
      ? event.location_id
      : typeof booking?.location_id === "string"
        ? booking.location_id
        : "";
  const source = typeof booking?.source === "string" ? booking.source : "";

  if (
    event.type !== "booking.created" ||
    !eventId ||
    merchantId !== env.SQUARE_MERCHANT_ID ||
    locationId !== env.SQUARE_LOCATION_ID ||
    source !== "FIRST_PARTY_BUYER"
  ) {
    return new Response(null, { status: 204 });
  }

  if (!env.GA4_MEASUREMENT_ID || !env.GA4_API_SECRET) {
    // Never acknowledge a valid production booking if GA4 is not configured.
    // Square can retry after the missing secret is added.
    return new Response(null, { status: 503 });
  }

  const now = dependencies.now ?? (() => new Date());
  const store = dependencies.eventStore ?? new D1EventStore(env.WEBHOOK_EVENTS);
  const ga4 =
    dependencies.ga4Client ??
    new MeasurementProtocolClient(
      env.GA4_MEASUREMENT_ID,
      env.GA4_API_SECRET,
      dependencies.fetchImpl ?? fetch,
    );

  let claim: "claimed" | "sent" | "busy";
  try {
    claim = await store.claim(eventId, now());
  } catch {
    return new Response(null, { status: 500 });
  }

  if (claim === "sent") return new Response(null, { status: 200 });
  if (claim === "busy") return new Response(null, { status: 503 });

  try {
    await ga4.sendAppointmentBooked(eventId);
    await store.markSent(eventId, now());
    return new Response(null, { status: 200 });
  } catch (error) {
    const errorCode = safeErrorCode(error);
    try {
      await store.markFailed(eventId, now(), errorCode);
    } catch {
      // The response remains retryable even if the failure marker cannot be written.
    }
    return new Response(null, { status: 502 });
  }
}

export async function verifySquareSignature(
  rawBody: string,
  signature: string,
  signatureKey: string,
  notificationUrl: string,
): Promise<boolean> {
  let signatureBytes: Uint8Array;
  try {
    signatureBytes = base64ToBytes(signature);
  } catch {
    return false;
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(signatureKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );

  return crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes as BufferSource,
    encoder.encode(notificationUrl + rawBody),
  );
}

export async function anonymousClientId(eventId: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(eventId));
  const view = new DataView(digest);
  const first = view.getUint32(0) || 1;
  const second = view.getUint32(4) || 1;
  return `${first}.${second}`;
}

function base64ToBytes(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const decoded = atob(normalized);
  return Uint8Array.from(decoded, (character) => character.charCodeAt(0));
}

function safeErrorCode(error: unknown): string {
  if (error instanceof Error && /^ga4_http_\d{3}$/.test(error.message)) return error.message;
  return "ga4_delivery_failed";
}

const worker = {
  fetch(request: Request, env: Env): Promise<Response> {
    return handleRequest(request, env);
  },
};

export default worker;
