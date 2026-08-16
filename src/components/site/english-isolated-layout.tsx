import type { ReactNode } from "react";
import { baseMetadata, RootDocument, siteViewport } from "@/components/site/root-document";
export const viewport = siteViewport;
export const metadata = baseMetadata("en");
export function EnglishIsolatedLayout({ children }: { children: ReactNode }) { return <RootDocument locale="en">{children}</RootDocument>; }
