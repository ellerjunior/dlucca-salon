import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const BOOKING_URL =
  "https://book.squareup.com/appointments/1qxvwmck0vibcb/location/LDSYEV6DSTW7W/services";
const OUTPUT = path.resolve("src/data/square-snapshot.json");

function decodeAttribute(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

async function loadCatalogHtml(filePath) {
  if (filePath) return readFile(path.resolve(filePath), "utf8");
  const response = await fetch(BOOKING_URL, {
    headers: { "user-agent": "Casa-DLucca-Service-Verifier/1.0" },
  });
  if (!response.ok) throw new Error(`Square returned ${response.status}`);
  return response.text();
}

async function fetchCatalog(filePath) {
  const html = await loadCatalogHtml(filePath);
  const match = html.match(/<meta name="widget" content="([^"]*)"/);
  if (!match) {
    throw new Error("Square widget data was not found in the booking page.");
  }

  const widget = JSON.parse(decodeAttribute(match[1]));
  const services = widget.services
    .map((service) => {
      const variation = service.variations?.[0] ?? {};
      return {
        id: service.id,
        sourceName: service.name,
        description: service.description || null,
        priceType: service.price_type,
        priceCents:
          service.price_type === "variable"
            ? null
            : (service.price_cents ?? variation.price_cents ?? null),
        priceDescription:
          service.price_description || variation.price_description || null,
        durationSeconds: variation.service_time ?? service.time ?? null,
        staffIds: service.staff_ids ?? variation.staff_ids ?? [],
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  return {
    source: BOOKING_URL,
    capturedAt: new Date().toISOString(),
    currency: widget.business.currency_code,
    services,
  };
}

function comparable(snapshot) {
  return snapshot.services.map(({ id, sourceName, priceType, priceCents, priceDescription, durationSeconds }) => ({
    id,
    sourceName,
    priceType,
    priceCents,
    priceDescription,
    durationSeconds,
  }));
}

const mode = process.argv[2];
const fileFlag = process.argv.indexOf("--from-file");
const filePath = fileFlag >= 0 ? process.argv[fileFlag + 1] : undefined;
if (!new Set(["--write", "--verify"]).has(mode)) {
  console.error("Use --write to refresh the snapshot or --verify to compare it.");
  process.exit(2);
}

const live = await fetchCatalog(filePath);

if (mode === "--write") {
  await writeFile(OUTPUT, `${JSON.stringify(live, null, 2)}\n`, "utf8");
  console.log(`Saved ${live.services.length} services to ${OUTPUT}`);
} else {
  const committed = JSON.parse(await readFile(OUTPUT, "utf8"));
  const before = JSON.stringify(comparable(committed));
  const after = JSON.stringify(comparable(live));
  if (before !== after) {
    console.error("The public Square catalog differs from the committed snapshot.");
    process.exit(1);
  }
  console.log(`Square snapshot is current (${live.services.length} services).`);
}
