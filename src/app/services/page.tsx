import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/site/legacy-redirect";
export const metadata: Metadata = { robots: { index: false }, alternates: { canonical: "/hair" } };
export default function Page() { return <LegacyRedirect to="/hair" label="Hair" />; }
