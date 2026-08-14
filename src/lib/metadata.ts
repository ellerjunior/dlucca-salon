import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

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
