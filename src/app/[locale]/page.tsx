import { notFound } from "next/navigation";
import { PublicPage } from "@/components/pages/public-page";
import { isLocalizedLocale } from "@/i18n/config";
import { localizedPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocalizedLocale(locale) ? localizedPageMetadata(locale, "home", "home") : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();
  return <PublicPage locale={locale} page="home" />;
}
