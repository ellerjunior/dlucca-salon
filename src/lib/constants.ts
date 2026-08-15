export const SITE_URL = "https://www.dluccasalon.com";
export const BOOKING_URL =
  "https://book.squareup.com/appointments/1qxvwmck0vibcb/location/LDSYEV6DSTW7W/services";
export const CHERRY_URL =
  "https://pay.withcherry.com/d-lucca-hair-beauty?utm_source=merchant&utm_medium=website";
export const INSTAGRAM_URL = "https://instagram.com/dluccahairbeauty";
export const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=904+N+California+Ave,+Chicago,+IL+60622";
export const MAP_EMBED_URL =
  "https://www.google.com/maps?q=904+N+California+Ave,+Chicago,+IL+60622&output=embed";
export const PHONE_DISPLAY = "+1 (224) 413-8559";
export const PHONE_HREF = "tel:+12244138559";
export const EMAIL = "Flavianodluccasalon@gmail.com";
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
