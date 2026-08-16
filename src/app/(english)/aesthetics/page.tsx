import { PublicPage } from "@/components/pages/public-page";
import { localizedPageMetadata } from "@/lib/metadata";
export const metadata = localizedPageMetadata("en", "aesthetics", "aesthetics");
export default function Page() { return <PublicPage locale="en" page="aesthetics" />; }
