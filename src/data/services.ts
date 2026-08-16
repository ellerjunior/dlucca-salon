import snapshot from "@/data/square-snapshot.json";
import { getCommon } from "@/i18n/common";
import type { Locale } from "@/i18n/config";
import type { Price, Service, ServiceCategory } from "@/types";

type Provider = Service["provider"];
type SnapshotService = (typeof snapshot.services)[number];

const rawServices = new Map(snapshot.services.map((service) => [service.id, service]));

function raw(id: string): SnapshotService {
  const service = rawServices.get(id);
  if (!service) throw new Error(`Unknown Square service: ${id}`);
  return service;
}

function defaultPrice(service: SnapshotService): Price {
  if (service.priceType === "variable" || service.priceCents === null) {
    return { kind: "variable" };
  }
  return { kind: "fixed", cents: service.priceCents };
}

function service(
  id: string,
  displayName: string,
  provider: Provider,
  category: ServiceCategory,
  options: Partial<Pick<Service, "description" | "details">> & { price?: Price } = {},
): Service {
  const source = raw(id);
  return {
    id,
    sourceName: source.sourceName,
    displayName,
    provider,
    category,
    price: options.price ?? defaultPrice(source),
    durationMinutes: Math.round(source.durationSeconds / 60),
    description: options.description,
    details: options.details,
  };
}

export const flavianoServices: Service[] = [
  service("LJ2ET2VGVDKXCJHDCOXRGTTF", "Hair Consultation with Flaviano", "flaviano", "consultation"),
  service("V3CIDY5ZKOKYBWYV55EADW5Q", "Root Color", "flaviano", "color"),
  service("YFUCXMZPML6C7QJOPEQTMDGP", "All-Over Color", "flaviano", "color"),
  service("ESSXPB4GEG72CJVO3UI6DXAM", "Balayage — Medium", "flaviano", "color"),
  service("PLQ6ILUTK6LNFIM5YVEPJ43H", "Balayage — Long", "flaviano", "color"),
  service("W4VQ5473JV4ORSVESZTTOYPY", "Highlights — Short", "flaviano", "color"),
  service("DD7HPCJLADP2GNWIDEB32QMT", "Highlights — Medium", "flaviano", "color"),
  service("HJ6M6F5DN4NV3STOAWEXEOIZ", "Highlights — Long", "flaviano", "color"),
  service("7UC5SRA5P6V66LT5DHMFOH2N", "Highlights for Men", "flaviano", "color"),
  service("4CMXR6N2PVGZBBSEMOQZVURI", "Hair Therapy", "flaviano", "treatment"),
  service("RFJNOZ44B5W3R5ZS5XFFJYEY", "Botox Hair Therapy", "flaviano", "treatment", {
    price: {
      kind: "tiers",
      tiers: [
        { label: "Short", cents: 15000 },
        { label: "Medium", cents: 20000 },
        { label: "Long", cents: 30000 },
      ],
    },
  }),
  service("RZ6LEKDMBSNVUCIKAKHO6MBJ", "Brazilian Keratin — Medium", "flaviano", "treatment"),
  service("67ZRKMDWAEJTXDW2TLVBKLNA", "Brazilian Keratin — Long", "flaviano", "treatment"),
  service("47SDTXXXXGIFMP7J7XM37FE2", "Keratin for Men", "flaviano", "treatment"),
  service("OCOEDNMLODBTV4MGA6DVY3NM", "Women’s Haircut", "flaviano", "cuts"),
  service("MR7IXZB4MMX5TQMDRPCW56TW", "Men’s Haircut", "flaviano", "cuts"),
  service("24WVZ2N7NAW52EYNXV7NRSCU", "Haircut, Deep Conditioning & Blow Dry", "flaviano", "cuts"),
  service("CGPPY26XJRTE7MQO7VOVYQZN", "Shampoo, Style & Blow Dry", "flaviano", "styling"),
  service("PEWB4SQDV3I6JNQAKGOZNASZ", "Waves", "flaviano", "styling"),
  service("MJMAQB652Y3R3SJ5MH54FRLX", "Deep Conditioner & Blow Dry", "flaviano", "styling"),
  service("VODEAMJXBDD2DE7DF5YGEQP2", "Makeup", "flaviano", "styling"),
  service("XIIA7ICCYYEERMPV5NAO6CQX", "Makeup Artist", "flaviano", "styling"),
  service("XXTY3QCOLOMK4PEHEDNP6U4Y", "Updo & Makeup", "flaviano", "styling"),
  service("E437HC2NG6W764QJDW6TXOML", "Hair Extensions", "flaviano", "extensions"),
  service("FJTPGZAKOMPBAIPWB4KPEH4U", "Brow Lamination", "flaviano", "extensions"),
];

export const daniServices: Service[] = [
  service("HAXWNA432EY55NY3CZVTOE43", "Women’s Haircut & Blow Dry", "dani", "cuts"),
  service("DWB7357VHKIEDPQJWEKN2Y2W", "Women’s Haircut", "dani", "cuts"),
  service("MBNE5AQ6MU2NQ55PC7CQP73G", "Men’s Haircut", "dani", "cuts"),
  service("WV67TN24Q33DEB72SJHJGLGL", "Beard Trim", "dani", "cuts"),
  service("7DSVLMSRJXTMEHJTMSDB6ICP", "Highlights — Short", "dani", "color"),
  service("PGNGCQQZANTV5EIGFILCXCXQ", "Highlights — Medium", "dani", "color"),
  service("CNBZA4ZIXDE5GBVICK6EB7UA", "Highlights — Long", "dani", "color"),
];

export const aestheticsServices: Service[] = [
  service("HK3XPXAG54D4GHIFXWA75JJX", "Aesthetic Consultation", "clinical", "consultation", {
    description: "The $50 consultation is credited toward any treatment booked.",
  }),
  service("ARFSCK73TDZ2SZCFAJK5EASU", "Dysport", "clinical", "injectables", {
    price: { kind: "perUnit", cents: 1000, unit: "unit" },
  }),
  service("H5B2P7ELXYVQE2BMRXVP5IQG", "Upper-Face Toxin", "clinical", "injectables"),
  service("K3LWWGJEDBVV66X6X25OCE24", "HA Filler", "clinical", "injectables"),
  service("4GYYHTRK7XXUPS6Y7N4DJRM5", "Lip Filler", "clinical", "injectables"),
  service("7HMMT4NTTWVCZVGQA3VFX3LH", "Sculptra", "clinical", "injectables"),
  service("Q66KKC4J7E4TOLDEA554SY4T", "Under-Eye PRP — Single", "clinical", "injectables"),
  service("26H5REXSDTHHS3UO7NOGZWIK", "Under-Eye PRP — Three Sessions", "clinical", "injectables"),
  service("JETE7VQCAZNRQKNZF4JYL7RW", "Microneedling with PRP", "clinical", "injectables"),
  service("QCHPJHYUNGWN47MTJUEODGBO", "Microneedling with PRP — Three Sessions", "clinical", "injectables"),
  service("NWKBLILQ3IWBWRZMBTIQWNEZ", "Microneedling with PDRN", "clinical", "injectables"),
  service("OTWIPHOUVJPSZMC64NPRGBA6", "Microneedling — Three Sessions", "clinical", "injectables"),
  service("TDZUF7GZTF2FM5PDFOGTZVWA", "Ultraformer MPT — Face", "clinical", "devices"),
  service("2IZAS2AJLSFASDJNTDUXR73K", "Ultraformer MPT — Face & Neck", "clinical", "devices"),
  service("QZXVU7PH7GVALSELAWQTJFYF", "Ultraformer MPT — Three Sessions", "clinical", "devices"),
  service("GWE57V73RZQ6XXECU7Y27GF6", "Sculpting Session", "clinical", "devices"),
  service("SIBGE422K7WPMOO2YZ72RQLM", "Emsculpt — Three Sessions", "clinical", "devices", {
    description: "For the abdomen or glutes.",
  }),
  service("AKR7EAPSVAWWOE2ALNOJ55LU", "Hydrofacial", "esthetician", "facials", {
    details: [
      "Cleansing and exfoliation remove dead skin cells and open pores.",
      "A gentle glycolic and salicylic acid peel loosens dirt and oil.",
      "Vacuum suction removes blackheads and impurities.",
      "Hyaluronic acid, antioxidants and peptides finish the treatment.",
    ],
  }),
  service("LEGYGDHGVDVYPAWB4ZV5QQP2", "Detox Oxygen Glow Facial", "esthetician", "facials", {
    description: "Cleansing, exfoliation, extractions when needed, an oxygen-activating mask, customized hydration and SPF.",
    details: [
      "Décolleté Oxygen Boost — $40",
      "LED Light Therapy — $35",
      "High-Frequency Treatment — $25",
    ],
  }),
  service("NHYODTZ2ULJAO5I6DHZ3SHK7", "PCA Sensi Peel", "esthetician", "facials", {
    description: "A gentle peel for sensitive skin that addresses tone, texture and fine lines with minimal irritation.",
  }),
  service("RG62FXSTWUBFX73T3BDTHPKD", "PCA Acne Peel", "esthetician", "facials", {
    description: "Targets active acne, inflammation and congestion to help unclog pores and reduce breakouts.",
  }),
  service("WJJFP7YQJMXXXX3DCRHUK4HP", "PCA Brightening Peel", "esthetician", "facials", {
    description: "Addresses uneven tone, dark spots and sun damage while supporting clarity.",
  }),
  service("NR37OV5BE6OBITXBSEN6VRED", "Brow Microblading", "esthetician", "brows"),
  service("FJTPGZAKOMPBAIPWB4KPEH4U", "Brow Lamination", "esthetician", "brows", {
    description: "A semi-permanent treatment that smooths and sets brow hairs in place.",
  }),
  service("UFB7OBTLUZZQLI3DAUSNJCV5", "Lash Lift", "esthetician", "brows"),
  service("5USSYNFAVUOIV6MASXHHFZK6", "Underarm Waxing", "esthetician", "brows"),
  service("OBIEXHQPSQXZU7PRBHUHUY5P", "Upper Lip Waxing", "esthetician", "brows"),
];

export function formatPrice(price: Price, locale: Locale = "en"): string {
  const labels = getCommon(locale).service;
  const currency = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    }).format(cents / 100);

  if (price.kind === "variable") return labels.variable;
  if (price.kind === "perUnit") return `${currency(price.cents)} / ${labels.unit}`;
  if (price.kind === "tiers") return `${labels.from} ${currency(price.tiers[0].cents)}`;
  if (price.cents === 0) return labels.free;
  return currency(price.cents);
}

export function formatDuration(minutes: number, locale: Locale = "en"): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return `${minutes} min`;
  return remainder ? `${hours}h ${remainder}${locale === "en" ? "m" : "min"}` : `${hours}h`;
}

export const squareCapturedAt = snapshot.capturedAt;
