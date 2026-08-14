import type { Metadata } from "next";
import { Filmstrip } from "@/components/features/filmstrip";
import { InquiryForm } from "@/components/features/inquiry-form";
import { PageSchema } from "@/components/site/page-schema";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { galleryItems } from "@/data/gallery";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Weddings & Events",
  description: "Bridal hair and makeup in the D’Lucca studio or on location in Chicago. See services and send an inquiry.",
  path: "/weddings",
  image: "weddings",
});

const bride = ["Beauty consultation, based in visagism", "Trial hair and makeup", "Bridal hairstyle: updo, waves or custom", "Waterproof, long-wear HD makeup", "Skin preparation", "Eyelash application", "Hair accessory and veil styling", "Optional on-site service"];
const party = ["Personalized hair", "Natural makeup", "Skin preparation", "Lash application", "Touch-up kit recommendations"];
const bridalGallery = galleryItems.filter((item) => ["bride", "0847", "1325", "2225"].includes(item.id));

export default function WeddingsPage() {
  return (
    <main id="main-content">
      <PageSchema name="Weddings" path="/weddings" />
      <section className="wedding-hero surface-void"><div className="wedding-hero__media"><ResponsiveImage image="wedding-hero" alt="Bride with polished makeup and a crystal hair accessory" sizes="100vw" fill priority imageClassName="wedding-hero__image" /></div><div className="wedding-hero__veil" /><div className="site-container site-grid wedding-hero__content"><div className="wedding-hero__copy"><h1 className="display-xl">Unforgettable <em>beauty</em> for your unforgettable day</h1><span className="brass-rule" /><p>Bridal hair and makeup in the studio or on location, anywhere in Chicago.</p></div></div></section>

      <section className="section-space surface-linen"><div className="site-container"><SectionHeader title="Two ways to gather" standfirst="The complete bridal package is quoted for the people, place and schedule involved." /><div className="package-spread"><article className="package"><h3 className="display-l">The Bride</h3><ul className="ruled-list">{bride.map((item) => <li key={item}>{item}</li>)}</ul><div className="package__price"><span className="label">Published reference</span><strong>Updo & Makeup — $400</strong><p>2h 30m. Full bridal packages are quoted individually.</p></div></article><article className="package"><h3 className="display-l">The Party</h3><ul className="ruled-list">{party.map((item) => <li key={item}>{item}</li>)}</ul><div className="package__price"><span className="label">Published reference</span><strong>Makeup Artist — $250</strong><p>1h 30m. Bridesmaids and debutantes are quoted for the full party.</p></div></article></div></div></section>

      <section className="section-space surface-void"><div className="site-container"><SectionHeader title="From inquiry to the day" /><div className="wedding-timeline">{[["I", "Inquiry", "Tell us the date, party and location."], ["II", "Consultation", "We shape the service around the event."], ["III", "Trial", "Hair and makeup are rehearsed before the event."], ["IV", "The Day", "The plan is held, paced and finished."]].map(([index, title, copy]) => <article className="wedding-timeline__step" key={title}><span className="label">{index}</span><h3 className="heading">{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="home-work surface-void"><div className="home-work__header"><SectionHeader title="Bridal work" /></div><Filmstrip items={bridalGallery} bridal /></section>

      <section className="section-space surface-alabaster"><div className="site-container"><SectionHeader title="Tell us about the date" standfirst="Dates book out months in advance. Reach out early." /><div className="inquiry-layout"><InquiryForm /><aside className="inquiry-aside"><h3 className="heading">Direct contact</h3><p>If you prefer to speak first, call or email the house.</p><div className="inquiry-aside__links"><a href={PHONE_HREF}>{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></aside></div></div></section>
    </main>
  );
}
