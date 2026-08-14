import type { Metadata } from "next";
import Link from "next/link";
import { ServiceMenu } from "@/components/features/service-menu";
import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { daniServices, flavianoServices } from "@/data/services";
import { BOOKING_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Hair Services & Prices",
  description: "See current pricing for balayage, Brazilian keratin, cuts, color, styling and hair treatments in Chicago.",
  path: "/hair",
  image: "hair",
});

const signatures = [
  { image: "home-hero", name: "Balayage — Long", price: "$500", duration: "4h 30m", copy: "The appointment begins with a consultation on placement and tone. Color is hand-painted through the lengths, then refined to the agreed finish. Time is reserved for the full process, including styling.", flip: false },
  { image: "work-1325", name: "Brazilian Keratin — Long", price: "$300", duration: "3h", copy: "The hair is assessed before product is applied. Processing and heat work are paced for the full length. The service closes with the finishing needed to complete the treatment.", flip: true },
  { image: "work-0799", name: "Hair Therapy", price: "$80", duration: "1h", copy: "This hour is set aside for the condition of the hair itself. The treatment is selected after the hair is examined. Styling follows so the result can be seen and managed clearly.", flip: false },
  { image: "work-1616", name: "Hair Extensions", price: "Variable", duration: "3h 30m", copy: "Extension work begins with a consultation on length, density and color. The final price depends on the agreed plan. A dedicated appointment is then reserved for placement and finish.", flip: true },
];

export default function HairPage() {
  return (
    <main id="main-content">
      <PageSchema name="Hair" path="/hair" />
      <section className="page-hero hair-hero surface-void">
        <div className="hair-hero__media"><ResponsiveImage image="work-1616" alt="Long dimensional blonde balayage created at D'Lucca" sizes="(max-width: 767px) 100vw, 50vw" fill priority imageClassName="hair-hero__image" /></div>
        <div className="site-container site-grid"><div className="page-hero__copy hair-hero__copy"><h1 className="display-xl">Hair</h1><span className="brass-rule" /><p className="standfirst">Color, cuts, treatment and styling by Flaviano and Dani.</p></div></div>
      </section>

      <section className="section-space surface-linen"><div className="site-container"><ServiceMenu flaviano={flavianoServices} dani={daniServices} /><p className="service-source-note label">Prices and durations captured from the public Square catalog on August 14, 2026. Final totals may vary where noted.</p></div></section>

      <section className="section-space surface-alabaster"><div className="site-container"><SectionHeader title="Signature services" standfirst="Four appointments that benefit from a little more context." /></div>
        <div className="signature-stack">{signatures.map((item, index) => <article className={`signature-band ${index % 2 ? "surface-linen" : "surface-alabaster"}`} key={item.name}><div className="signature-band__media media-frame" data-hover="true"><ResponsiveImage image={item.image} alt={`${item.name} work at D'Lucca`} sizes="(max-width: 767px) 100vw, 52vw" imageClassName="signature-band__image" /></div><div className="signature-band__copy"><h3 className="display-l">{item.name}</h3><div className="signature-band__meta label"><span>{item.price}</span><span>{item.duration}</span></div><p>{item.copy}</p><a className="inline-link label" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book this service</a></div></article>)}</div>
      </section>

      <section className="section-space surface-void"><div className="site-container centered-cta"><h2 className="display-l">Not sure where to start?</h2><p className="standfirst">The consultation with Flaviano is thirty minutes, and it’s free.</p><ButtonLink href={BOOKING_URL} external variant="on-dark">Book the consultation</ButtonLink></div></section>

      <section className="section-space surface-linen"><div className="site-container"><SectionHeader title="Before the next appointment" standfirst="A small edit from the current work." /><div className="mini-masonry">{["work-1039", "work-1533", "work-2225"].map((image, index) => <figure className="mini-masonry__item" key={image}><div className="media-frame"><ResponsiveImage image={image} alt={["Dimensional blonde with a soft face frame", "Long bright blonde with soft layers", "Voluminous blonde styling"][index]} sizes="(max-width: 767px) 80vw, 32vw" imageClassName="mini-masonry__image" /></div></figure>)}</div><Link className="inline-link label" href="/gallery">See the full gallery</Link></div></section>

      <section className="section-space surface-sand"><div className="site-container financing-note"><p className="heading">Larger transformations can be split into monthly payments through Cherry.</p><ButtonLink href="/financing" variant="ghost">See payment plans</ButtonLink></div></section>
    </main>
  );
}
