import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "@/app/globals.css";
import "@/app/site-pages.css";
import { Footer } from "@/components/site/footer";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { Navigation } from "@/components/site/navigation";
import { RouteCurtain } from "@/components/site/route-curtain";
import { getCommon } from "@/i18n/common";
import { localeDetails, type Locale } from "@/i18n/config";
import { getPages } from "@/i18n/pages";
import { ADDRESS, EMAIL, INSTAGRAM_URL, PHONE_DISPLAY, SITE_URL } from "@/lib/constants";

const display = localFont({
  src: [
    { path: "../../app/fonts/bodoni-moda-latin-normal.woff2", style: "normal", weight: "400 900" },
    { path: "../../app/fonts/bodoni-moda-latin-italic.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
  fallback: ["Didot", "Times New Roman"],
});

const body = localFont({
  src: [
    { path: "../../app/fonts/lora-latin-normal.woff2", style: "normal", weight: "400 700" },
    { path: "../../app/fonts/lora-latin-italic.woff2", style: "italic", weight: "400 700" },
  ],
  variable: "--font-body",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

const label = localFont({
  src: [{ path: "../../app/fonts/inter-tight-latin-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-label",
  display: "swap",
  preload: false,
  fallback: ["Arial", "sans-serif"],
});

export const siteViewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F3F0E9", colorScheme: "light" };

export function baseMetadata(locale: Locale): Metadata {
  const copy = getPages(locale).metadata.home;
  return {
    metadataBase: new URL(SITE_URL),
    title: "D’Lucca Hair & Beauty | Chicago",
    description: copy.description,
    applicationName: "D’Lucca Hair & Beauty",
    icons: { icon: "/logo-mark.svg", apple: "/logo-mark.svg" },
    manifest: "/site.webmanifest",
  };
}

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const common = getCommon(locale);
  const home = getPages(locale).home;
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
    address: { "@type": "PostalAddress", streetAddress: "904 N California Ave", addressLocality: "Chicago", addressRegion: "IL", postalCode: "60622", addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: 41.8976569, longitude: -87.6970995 },
    areaServed: "Chicago",
    slogan: home.hero.lines.join(" "),
    description: `${home.hero.copy} ${ADDRESS}.`,
  };

  return (
    <html lang={localeDetails[locale].html} className={`${display.variable} ${body.variable} ${label.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">{common.skipToContent}</a>
        <RouteCurtain />
        <Navigation locale={locale} />
        {children}
        <Footer locale={locale} />
        <MobileActionBar locale={locale} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </body>
    </html>
  );
}
