import type { Metadata } from "next";
import { MapEmbed } from "@/components/features/map-embed";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { PageSchema } from "@/components/site/page-schema";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { ADDRESS, BOOKING_URL, EMAIL, EXTERNAL_PROPS, INSTAGRAM_URL, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Book, call or find D’Lucca Hair & Beauty at 904 N California Ave in Chicago.",
  path: "/contact",
  image: "contact",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageSchema name="Contact" path="/contact" />
      <section className="contact-hero surface-void"><div className="site-container site-grid"><div className="contact-hero__title"><h1 className="display-xl">Your <em>hair</em> journey starts here</h1></div><div className="contact-hero__actions"><p className="standfirst"><em>Book. Ask. Connect.</em></p><a className="contact-action label" href={BOOKING_URL} {...EXTERNAL_PROPS}><span>Book online</span><span className="contact-action__line" /></a><a className="contact-action label" href={PHONE_HREF}><span>Call {PHONE_DISPLAY}</span><span className="contact-action__line" /></a><a className="contact-action label" href={`mailto:${EMAIL}`}><span>Email the house</span><span className="contact-action__line" /></a></div></div></section>

      <section className="section-space surface-linen"><div className="site-container site-grid"><div className="studio-image media-frame"><ResponsiveImage image="salon-interior" alt="Inside the D'Lucca salon on California Avenue" sizes="(max-width: 767px) 100vw, 50vw" imageClassName="studio-image__photo" /></div><div className="studio-copy"><SectionHeader title="The studio" /><address>{ADDRESS}</address><a className="inline-link label" href={MAPS_URL} {...EXTERNAL_PROPS}>Get directions</a><div className="studio-hours"><span className="label">Current availability</span><p>Please call before visiting. Published business hours are awaiting client confirmation.</p></div></div></div></section>

      <MapEmbed className="contact-map" />

      <section className="surface-alabaster"><div className="follow-band"><div className="follow-band__copy"><h2 className="display-l">Recent work, from the house.</h2><a className="inline-link label" href={INSTAGRAM_URL} {...EXTERNAL_PROPS}>@dluccahairbeauty</a></div>{[["work-0799", "Dimensional shoulder-length color"], ["work-0847", "Polished makeup"], ["work-1533", "Long bright blonde hair"]].map(([image, alt]) => <div className="follow-band__image media-frame" key={image}><ResponsiveImage image={image} alt={alt} sizes="(max-width: 767px) 100vw, 25vw" imageClassName="follow-band__photo" /></div>)}</div></section>

      <section className="section-space surface-linen"><div className="site-container contact-news"><SectionHeader title="News from the house" standfirst="Openings, new treatments, and the occasional note from Flaviano." /><NewsletterForm /></div></section>
    </main>
  );
}
