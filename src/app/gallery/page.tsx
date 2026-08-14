import type { Metadata } from "next";
import { GalleryGrid } from "@/components/features/gallery-grid";
import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: "See real D’Lucca color, balayage, styling, makeup, bridal and aesthetics work from Chicago.",
  path: "/gallery",
  image: "gallery",
});

export default function GalleryPage() {
  return (
    <main id="main-content">
      <PageSchema name="Gallery" path="/gallery" />
      <section className="gallery-header surface-linen"><div className="site-container"><div className="gallery-header__copy"><h1 className="display-xl">The work</h1><span className="brass-rule" /><p className="standfirst">Color, styling, bridal and clinical spaces — photographed at the house.</p></div><GalleryGrid /></div></section>
      <section className="section-space surface-linen"><div className="site-container centered-cta"><h2 className="display-l">Every one of these started with a consultation.</h2><ButtonLink href={BOOKING_URL} external>Book an appointment</ButtonLink></div></section>
    </main>
  );
}
