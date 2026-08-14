import type { Metadata } from "next";
import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceRow } from "@/components/ui/service-row";
import { aestheticsServices } from "@/data/services";
import { BOOKING_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import type { ServiceCategory } from "@/types";

export const metadata: Metadata = pageMetadata({
  title: "Medical Aesthetics",
  description: "Current pricing for injectables, regenerative treatments, advanced facials, brows, lashes and device treatments in Chicago.",
  path: "/aesthetics",
  image: "aesthetics",
});

const groups: Array<{ title: string; categories: ServiceCategory[] }> = [
  { title: "Injectables & regenerative", categories: ["consultation", "injectables"] },
  { title: "Device treatments", categories: ["devices"] },
  { title: "Advanced facials", categories: ["facials"] },
  { title: "Brows, lashes & waxing", categories: ["brows"] },
];

export default function AestheticsPage() {
  return (
    <main id="main-content">
      <PageSchema name="Aesthetics" path="/aesthetics" />
      <section className="page-hero aesthetics-hero surface-alabaster"><div className="site-container site-grid"><div className="page-hero__copy aesthetics-hero__copy"><h1 className="display-xl">Aesthetics</h1><p className="standfirst">Injectables, regenerative treatments and advanced skincare, delivered under clinical supervision.</p><p className="page-hero__credential label">All treatments are performed by our Board Certified Nurse Practitioner or a licensed Esthetician.</p></div><div className="page-hero__media aesthetics-hero__media arch media-frame"><ResponsiveImage image="aesthetics-room" alt="D'Lucca private aesthetics treatment room" sizes="(max-width: 767px) 80vw, 25vw" priority imageClassName="aesthetics-hero__image" /></div></div></section>

      <section className="section-space surface-linen"><div className="site-container">{groups.map((group) => <section className="treatment-group" key={group.title}><SectionHeader title={group.title} className="treatment-group__header" />{aestheticsServices.filter((service) => group.categories.includes(service.category)).map((service) => <div key={service.id}><ServiceRow service={service} />{service.description || service.details ? <Disclosure title={<span className="label">Treatment details</span>}><div className="treatment-detail-copy">{service.description ? <p>{service.description}</p> : null}{service.details ? <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : null}</div></Disclosure> : null}</div>)}</section>)}</div></section>

      <section className="section-space surface-void"><div className="site-container"><SectionHeader title="How a visit works" standfirst="During your consultation an individualized treatment plan will be made." /><div className="visit-steps">{[["I", "Consultation", "$50, thirty minutes, credited toward treatment."], ["II", "Plan", "The provider and client agree on an individualized plan."], ["III", "Treatment", "The booked service is performed by the appropriate provider."], ["IV", "Follow-up", "Next steps are discussed according to the treatment plan."]].map(([index, title, copy]) => <article className="visit-step" key={title}><span className="visit-step__index label">{index}</span><h3 className="heading">{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="section-space surface-white"><div className="site-container site-grid"><div className="safety-copy"><SectionHeader title="Safety & suitability" /><p>Injectable and regenerative treatments begin with a consultation. Share your medical history, current medications, allergies, pregnancy or nursing status, and prior treatment history with the provider before any service.</p><p>The provider will determine whether a treatment is suitable for you. No result is promised on this site.</p></div><aside className="safety-aside"><span className="label">Provider standard</span><p>Clinical treatments are performed by a Board Certified Nurse Practitioner. Esthetic services are performed by a licensed Esthetician.</p></aside></div></section>

      <section className="section-space surface-linen"><div className="site-container centered-cta"><h2 className="display-l">Begin with a treatment plan.</h2><p className="standfirst">Plans from $150 to $1,600 can be financed monthly through Cherry.</p><div className="financing-note"><ButtonLink href={BOOKING_URL} external>Book a consultation</ButtonLink><ButtonLink href="/financing" variant="ghost">See financing</ButtonLink></div></div></section>
    </main>
  );
}
