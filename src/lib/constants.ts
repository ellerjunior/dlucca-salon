const DEFAULT_SITE_URL = "https://www.dluccasalon.com";

function normalizeSiteOrigin(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`);
    return url.origin;
  } catch {
    return null;
  }
}

export function resolveSiteUrl(env: Record<string, string | undefined> = process.env) {
  const configured = normalizeSiteOrigin(env.NEXT_PUBLIC_SITE_URL);
  if (configured) return configured;

  const vercelHost = env.VERCEL_ENV === "preview"
    ? env.VERCEL_URL
    : env.VERCEL_PROJECT_PRODUCTION_URL ?? env.VERCEL_URL;

  return normalizeSiteOrigin(vercelHost) ?? DEFAULT_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();
export const BOOKING_URL =
  "https://book.squareup.com/appointments/1qxvwmck0vibcb/location/LDSYEV6DSTW7W/services";
export const CHERRY_URL =
  "https://pay.withcherry.com/d-lucca-hair-beauty?utm_source=merchant&utm_medium=website";
export const INSTAGRAM_URL = "https://www.instagram.com/dluccahairbeauty";
export const FACEBOOK_URL = "https://www.facebook.com/Flavianohairstylist";
export const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=904+N+California+Ave,+Chicago,+IL+60622";
export const MAP_EMBED_URL =
  "https://www.google.com/maps?q=904+N+California+Ave,+Chicago,+IL+60622&output=embed";
export const PHONE_DISPLAY = "+1 (224) 413-8559";
export const PHONE_HREF = "tel:+12244138559";
export const EMAIL = "contact@dluccasalon.com";
export const ADDRESS = "904 N California Ave, Chicago, IL 60622";

export const NAV_ITEMS = [
  { href: "/story", label: "Story" },
  { href: "/hair", label: "Hair" },
  { href: "/aesthetics", label: "Aesthetics" },
  { href: "/weddings", label: "Weddings" },
  { href: "/gallery", label: "Gallery" },
  { href: "/financing", label: "Payment Plans" },
  { href: "/contact", label: "Contact" },
] as const;

export const EXTERNAL_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
