import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { baseMetadata, RootDocument, siteViewport } from "@/components/site/root-document";
import { isLocalizedLocale, localizedLocales } from "@/i18n/config";

export const dynamicParams = false;
export const viewport = siteViewport;
export function generateStaticParams() { return localizedLocales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocalizedLocale(locale) ? baseMetadata(locale) : {};
}

export default async function LocalizedLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();
  return <RootDocument locale={locale}>{children}</RootDocument>;
}
