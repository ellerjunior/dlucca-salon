import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/site/legacy-redirect";
export const metadata: Metadata = { robots: { index: false }, alternates: { canonical: "/weddings" } };
export default function Page() { return <LegacyRedirect to="/weddings" label="Weddings" />; }
