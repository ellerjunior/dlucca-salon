import { PublicPage } from "@/components/pages/public-page";
import { localizedPageMetadata } from "@/lib/metadata";
export const metadata = localizedPageMetadata("en", "contact", "contact");
export default function Page() { return <PublicPage locale="en" page="contact" />; }
