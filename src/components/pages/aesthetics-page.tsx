import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceRow } from "@/components/ui/service-row";
import { aestheticsServices } from "@/data/services";
import { routeFor, type Locale } from "@/i18n/config";
import { getPages } from "@/i18n/pages";
import { localizeServices } from "@/i18n/services";
import { BOOKING_URL } from "@/lib/constants";

export function AestheticsPageContent({ locale }: { locale: Locale }) {
  const copy = getPages(locale).aesthetics;
  const services = localizeServices(aestheticsServices, locale);
  return <main id="main-content">
    <PageSchema name={copy.schemaName} path={routeFor(locale, "aesthetics")} homeLabel={locale === "pt" ? "Início" : locale === "es" ? "Inicio" : "Home"} />
    <section className="page-hero aesthetics-hero surface-alabaster"><div className="site-container site-grid"><div className="page-hero__copy aesthetics-hero__copy"><h1 className="display-xl">{copy.heroTitle}</h1><p className="standfirst">{copy.heroCopy}</p><p className="page-hero__credential label">{copy.credential}</p></div><div className="page-hero__media aesthetics-hero__media media-frame"><ResponsiveImage image="aesthetics-room" alt={copy.heroAlt} sizes="(max-width: 767px) 80vw, 25vw" priority imageClassName="aesthetics-hero__image" /></div></div></section>
    <section className="section-space surface-linen"><div className="site-container">{copy.groups.map((group) => <section className="treatment-group" key={group.title}><SectionHeader title={group.title} className="treatment-group__header" />{services.filter((service) => group.categories.includes(service.category as string)).map((service) => <div key={service.id}><ServiceRow service={service} locale={locale} />{service.description || service.details ? <Disclosure title={<span className="label">{copy.treatmentDetails}</span>}><div className="treatment-detail-copy">{service.description ? <p>{service.description}</p> : null}{service.details ? <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : null}</div></Disclosure> : null}</div>)}</section>)}</div></section>
    <section className="section-space surface-void"><div className="site-container"><SectionHeader title={copy.visitTitle} standfirst={copy.visitStandfirst} /><div className="visit-steps">{copy.steps.map((item) => <article className="visit-step" key={item.index}><span className="visit-step__index label">{item.index}</span><h3 className="heading">{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>
    <section className="section-space surface-white"><div className="site-container site-grid"><div className="safety-copy"><SectionHeader title={copy.safetyTitle} />{copy.safetyCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><aside className="safety-aside"><span className="label">{copy.providerLabel}</span><p>{copy.providerCopy}</p></aside></div></section>
    <section className="section-space surface-linen"><div className="site-container centered-cta"><h2 className="display-l">{copy.ctaTitle}</h2><p className="standfirst">{copy.ctaCopy}</p><div className="financing-note"><ButtonLink href={BOOKING_URL} external>{copy.ctaBook}</ButtonLink><ButtonLink href={routeFor(locale, "financing")} variant="ghost">{copy.ctaFinancing}</ButtonLink></div></div></section>
  </main>;
}
