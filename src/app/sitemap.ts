import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/story", "/hair", "/aesthetics", "/weddings", "/gallery", "/financing", "/contact"];
  return routes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified: new Date("2026-08-14"), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : 0.8 }));
}
