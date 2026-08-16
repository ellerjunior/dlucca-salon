import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { locales, pageIds, routeFor } from "@/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => pageIds.map((page) => {
    const path = routeFor(locale, page);
    return { url: `${SITE_URL}${path === "/" ? "" : path}`, lastModified: new Date("2026-08-16"), changeFrequency: page === "home" ? "weekly" as const : "monthly" as const, priority: page === "home" ? 1 : 0.8, alternates: { languages: Object.fromEntries(locales.map((option) => [option === "en" ? "en-US" : option === "pt" ? "pt-BR" : "es-US", `${SITE_URL}${routeFor(option, page) === "/" ? "" : routeFor(option, page)}`])) } };
  }));
}
