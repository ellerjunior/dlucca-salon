import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "@/app/globals.css";
import "@/app/site-pages.css";
import { Footer } from "@/components/site/footer";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { Navigation } from "@/components/site/navigation";
import { RouteCurtain } from "@/components/site/route-curtain";
import { ADDRESS, EMAIL, INSTAGRAM_URL, PHONE_DISPLAY, SITE_URL } from "@/lib/constants";

/*
THESIS: Casa D'Lucca treats the salon as a private house and refuses the interchangeable luxury-salon card grid.
OWN-WORLD: Warm mineral fields, void-black rooms, antique-brass hairlines, clean architectural frames, Chicago vertical rules, real photographs and disciplined display type.
STORY: Visitors meet the house, see real work, verify services and prices, understand the people and move directly to booking or contact.
FIRST VIEWPORT: One portrait photograph fills the Home viewport; a left-held three-line title, brass rule, one sentence and booking action sit inside its shadowed edge.
FORM: Brief-pinned Casa D'Lucca, grounded direction 1, seed c2341c99.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
*/

const display = localFont({
  src: [
    { path: "./fonts/bodoni-moda-latin-normal.woff2", style: "normal", weight: "400 900" },
    { path: "./fonts/bodoni-moda-latin-italic.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
  fallback: ["Didot", "Times New Roman"],
});

const body = localFont({
  src: [
    { path: "./fonts/lora-latin-normal.woff2", style: "normal", weight: "400 700" },
    { path: "./fonts/lora-latin-italic.woff2", style: "italic", weight: "400 700" },
  ],
  variable: "--font-body",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

const label = localFont({
  src: [{ path: "./fonts/inter-tight-latin-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-label",
  display: "swap",
  preload: false,
  fallback: ["Arial", "sans-serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3F0E9",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "D’Lucca Hair & Beauty | Chicago",
  description: "Brazilian hair, aesthetics and bridal artistry at 904 N California Ave in Chicago.",
  applicationName: "D’Lucca Hair & Beauty",
  icons: { icon: "/logo-mark.svg", apple: "/logo-mark.svg" },
  manifest: "/site.webmanifest",
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "LocalBusiness"],
  "@id": `${SITE_URL}/#salon`,
  name: "Flaviano D’Lucca Hair & Beauty",
  url: SITE_URL,
  telephone: PHONE_DISPLAY,
  email: EMAIL,
  image: `${SITE_URL}/og/home.jpg`,
  priceRange: "$$$",
  sameAs: [INSTAGRAM_URL],
  address: {
    "@type": "PostalAddress",
    streetAddress: "904 N California Ave",
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60622",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.8976569, longitude: -87.6970995 },
  areaServed: "Chicago",
  slogan: "Chicago’s Brazilian beauty destination",
  description: `Hair, aesthetics and bridal services at ${ADDRESS}.`,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${label.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <RouteCurtain />
        <Navigation />
        {children}
        <Footer />
        <MobileActionBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </body>
    </html>
  );
}
