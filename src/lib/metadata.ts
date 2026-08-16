import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { localeDetails, locales, routeFor, type Locale, type PageId } from "@/i18n/config";
import { getPages } from "@/i18n/pages";

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
}): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = `${title} — D’Lucca Hair & Beauty | Chicago`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: "D’Lucca Hair & Beauty",
      locale: "en_US",
      type: "website",
      images: [{ url: `/og/${image}.jpg`, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`/og/${image}.jpg`],
    },
  };
}

export function localizedPageMetadata(locale: Locale, page: PageId, image: string): Metadata {
  const copy = getPages(locale).metadata[page];
  const path = routeFor(locale, page);
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = `${copy.title} — D’Lucca Hair & Beauty | Chicago`;
  const languages = Object.fromEntries(locales.map((option) => [localeDetails[option].html, routeFor(option, page)]));
  return {
    title: fullTitle,
    description: copy.description,
    alternates: { canonical, languages: { ...languages, "x-default": routeFor("en", page) } },
    openGraph: { title: fullTitle, description: copy.description, url: canonical, siteName: "D’Lucca Hair & Beauty", locale: localeDetails[locale].openGraph, alternateLocale: locales.filter((option) => option !== locale).map((option) => localeDetails[option].openGraph), type: "website", images: [{ url: `/og/${image}.jpg`, width: 1200, height: 630, alt: fullTitle }] },
    twitter: { card: "summary_large_image", title: fullTitle, description: copy.description, images: [`/og/${image}.jpg`] },
  };
}
