import { PublicPage } from "@/components/pages/public-page";
import { localizedPageMetadata } from "@/lib/metadata";
export const metadata = localizedPageMetadata("en", "gallery", "gallery");
export default function Page() { return <PublicPage locale="en" page="gallery" />; }
