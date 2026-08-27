import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  anonymousClientId,
  type Env,
  type EventStore,
  type Ga4Client,
  handleRequest,
  verifySquareSignature,
  type WebhookEventDatabase,
} from "../src/index";

const notificationUrl = "https://example.workers.dev/webhooks/square/bookings";
const signatureKey = "test-signature-key";

class MemoryEventStore implements EventStore {
  readonly states = new Map<string, "processing" | "sent" | "failed">();

  async claim(eventId: string): Promise<"claimed" | "sent" | "busy"> {
    const state = this.states.get(eventId);
    if (state === "sent") return "sent";
    if (state === "processing") return "busy";
    this.states.set(eventId, "processing");
    return "claimed";
  }

  async markSent(eventId: string): Promise<void> {
    this.states.set(eventId, "sent");
  }

  async markFailed(eventId: string): Promise<void> {
    this.states.set(eventId, "failed");
  }
}

function environment(overrides: Partial<Env> = {}): Env {
  return {
    WEBHOOK_EVENTS: {} as WebhookEventDatabase,
    SQUARE_WEBHOOK_SIGNATURE_KEY: signatureKey,
    SQUARE_NOTIFICATION_URL: notificationUrl,
    SQUARE_MERCHANT_ID: "merchant-dlucca",
    SQUARE_LOCATION_ID: "LDSYEV6DSTW7W",
    GA4_MEASUREMENT_ID: "G-WCL2PLSJF7",
    GA4_API_SECRET: "test-ga4-secret",
    ...overrides,
  };
}

function eventBody(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({
    merchant_id: "merchant-dlucca",
    location_id: "LDSYEV6DSTW7W",
    type: "booking.created",
    event_id: "square-event-1",
    data: {
      object: {
        booking: {
          location_id: "LDSYEV6DSTW7W",
          source: "FIRST_PARTY_BUYER",
          customer_id: "must-not-leave-the-worker",
          customer_note: "private customer note",
          seller_note: "private seller note",
        },
      },
    },
    ...overrides,
  });
}

async function squareSignature(body: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(signatureKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(notificationUrl + body),
  );
  return Buffer.from(signature).toString("base64");
}

async function webhookRequest(body: string, signature?: string): Promise<Request> {
  return new Request(notificationUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-square-hmacsha256-signature": signature ?? (await squareSignature(body)),
    },
    body,
  });
}

describe("Square booking webhook", () => {
  let store: MemoryEventStore;
  let sendAppointmentBooked: ReturnType<
    typeof vi.fn<(eventId: string) => Promise<void>>
  >;
  let ga4: Ga4Client;

  beforeEach(() => {
    store = new MemoryEventStore();
    sendAppointmentBooked = vi
      .fn<(eventId: string) => Promise<void>>()
      .mockResolvedValue(undefined);
    ga4 = { sendAppointmentBooked };
  });

  it("exposes an isolated health endpoint", async () => {
    const response = await handleRequest(
      new Request("https://example.workers.dev/health"),
      environment(),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });

  it("validates the real Square HMAC construction", async () => {
    const body = eventBody();
    const signature = await squareSignature(body);

    await expect(
      verifySquareSignature(body, signature, signatureKey, notificationUrl),
    ).resolves.toBe(true);
    await expect(
      verifySquareSignature(`${body} `, signature, signatureKey, notificationUrl),
    ).resolves.toBe(false);
  });

  it("rejects missing or invalid signatures", async () => {
    const body = eventBody();
    const missing = new Request(notificationUrl, { method: "POST", body });
    const invalid = await webhookRequest(body, "not-a-valid-signature");

    expect((await handleRequest(missing, environment())).status).toBe(403);
    expect((await handleRequest(invalid, environment())).status).toBe(403);
  });

  it("accepts only online buyer bookings for the expected merchant and location", async () => {
    const manual = eventBody({
      data: {
        object: {
          booking: {
            location_id: "LDSYEV6DSTW7W",
            source: "FIRST_PARTY_MERCHANT",
          },
        },
      },
    });
    const wrongMerchant = eventBody({ merchant_id: "another-merchant" });

    for (const body of [manual, wrongMerchant]) {
      const response = await handleRequest(await webhookRequest(body), environment(), {
        eventStore: store,
        ga4Client: ga4,
      });
      expect(response.status).toBe(204);
    }
    expect(sendAppointmentBooked).not.toHaveBeenCalled();
  });

  it("sends one appointment_booked for repeated Square deliveries", async () => {
    const body = eventBody();

    const first = await handleRequest(await webhookRequest(body), environment(), {
      eventStore: store,
      ga4Client: ga4,
    });
    const duplicate = await handleRequest(await webhookRequest(body), environment(), {
      eventStore: store,
      ga4Client: ga4,
    });

    expect(first.status).toBe(200);
    expect(duplicate.status).toBe(200);
    expect(sendAppointmentBooked).toHaveBeenCalledTimes(1);
    expect(sendAppointmentBooked).toHaveBeenCalledWith("square-event-1");
  });

  it("keeps delivery retryable until the GA4 API secret exists", async () => {
    const response = await handleRequest(
      await webhookRequest(eventBody()),
      environment({ GA4_API_SECRET: undefined }),
      { eventStore: store, ga4Client: ga4 },
    );

    expect(response.status).toBe(503);
    expect(sendAppointmentBooked).not.toHaveBeenCalled();
    expect(store.states.size).toBe(0);
  });

  it("marks GA4 failures for a later Square retry", async () => {
    sendAppointmentBooked.mockRejectedValueOnce(new Error("network unavailable"));

    const first = await handleRequest(await webhookRequest(eventBody()), environment(), {
      eventStore: store,
      ga4Client: ga4,
    });
    const retry = await handleRequest(await webhookRequest(eventBody()), environment(), {
      eventStore: store,
      ga4Client: ga4,
    });

    expect(first.status).toBe(502);
    expect(retry.status).toBe(200);
    expect(sendAppointmentBooked).toHaveBeenCalledTimes(2);
  });
});

describe("GA4 payload", () => {
  it("uses a deterministic anonymous client id", async () => {
    const first = await anonymousClientId("square-event-1");
    const second = await anonymousClientId("square-event-1");
    expect(first).toBe(second);
    expect(first).toMatch(/^\d+\.\d+$/);
  });

  it("sends only the approved event and no Square customer payload", async () => {
    const requests: Array<{ url: string; body: unknown }> = [];
    const fetchImpl = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      requests.push({
        url: input.toString(),
        body: JSON.parse(String(init?.body)),
      });
      return new Response(null, { status: 204 });
    });
    const body = eventBody();
    const response = await handleRequest(await webhookRequest(body), environment(), {
      eventStore: new MemoryEventStore(),
      fetchImpl: fetchImpl as typeof fetch,
    });

    expect(response.status).toBe(200);
    expect(requests).toHaveLength(1);
    expect(requests[0]?.url).toContain("measurement_id=G-WCL2PLSJF7");
    expect(requests[0]?.url).toContain("api_secret=test-ga4-secret");
    expect(requests[0]?.body).toEqual({
      client_id: expect.stringMatching(/^\d+\.\d+$/),
      events: [
        {
          name: "appointment_booked",
          params: { engagement_time_msec: 1 },
        },
      ],
    });
    expect(JSON.stringify(requests[0]?.body)).not.toMatch(
      /customer|phone|email|note|service|staff/i,
    );
  });
});
