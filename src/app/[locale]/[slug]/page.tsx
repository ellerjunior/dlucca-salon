import { notFound } from "next/navigation";
import { PublicPage } from "@/components/pages/public-page";
import { isLocalizedLocale, pageFromSlug, slugs } from "@/i18n/config";
import { localizedPageMetadata } from "@/lib/metadata";

const images = { story: "story", hair: "hair", aesthetics: "aesthetics", weddings: "weddings", gallery: "gallery", financing: "financing", contact: "contact" } as const;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocalizedLocale(params.locale)) return [];
  return Object.values(slugs[params.locale]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const page = pageFromSlug(locale, slug);
  return page ? localizedPageMetadata(locale, page, images[page]) : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocalizedLocale(locale)) notFound();
  const page = pageFromSlug(locale, slug);
  if (!page) notFound();
  return <PublicPage locale={locale} page={page} />;
}
