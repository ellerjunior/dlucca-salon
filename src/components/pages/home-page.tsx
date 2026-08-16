import Link from "next/link";
import { Filmstrip } from "@/components/features/filmstrip";
import { HomeHero } from "@/components/features/home-hero";
import { MapEmbed } from "@/components/features/map-embed";
import { ButtonLink } from "@/components/ui/button";
import { Figure } from "@/components/ui/figure";
import { Quote } from "@/components/ui/quote";
import { Reveal } from "@/components/ui/reveal";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { galleryItems } from "@/data/gallery";
import { getCommon } from "@/i18n/common";
import { routeFor, type Locale } from "@/i18n/config";
import { localizeGallery } from "@/i18n/gallery";
import { getPages } from "@/i18n/pages";
import { BOOKING_URL, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

const doorImages = ["work-1039", "aesthetics-treatment", "wedding-hero"] as const;
const doorPages = ["hair", "aesthetics", "weddings"] as const;

export function HomePageContent({ locale }: { locale: Locale }) {
  const common = getCommon(locale);
  const copy = getPages(locale).home;
  const gallery = localizeGallery(galleryItems, locale);
  const work = gallery.filter((item) => ["hero-blonde", "1039", "1533", "1616", "2225"].includes(item.id));
  return <main id="main-content">
    <HomeHero copy={copy.hero} bookLabel={common.actions.bookAppointment} />
    <section className="section-space surface-linen"><div className="site-container site-grid"><Reveal className="home-invitation__copy"><SectionHeader title={copy.invitation.title} /><p className="body-copy">{copy.invitation.copy}</p></Reveal><Reveal className="home-invitation__image" delay={0.08}><Figure image="salon-interior" alt={copy.invitation.alt} sizes="(max-width: 767px) 80vw, 42vw" /></Reveal></div></section>
    <section className="home-work surface-void" aria-labelledby="work-title"><Reveal className="home-work__header"><h2 id="work-title" className="display-l home-work__title">{copy.workTitle}</h2><span className="brass-rule" aria-hidden="true" /></Reveal><Filmstrip items={work} labels={common.actions} /></section>
    <section className="surface-alabaster" aria-labelledby="house-title"><div className="site-container section-space"><SectionHeader title={copy.doorsTitle} className="home-work__header" /><h2 id="house-title" className="visually-hidden">{copy.doorsA11y}</h2><div className="home-doors">{copy.doors.map((door, index) => <article className="home-door" key={door.title}><div className="home-door__image media-frame" data-hover="true"><ResponsiveImage image={doorImages[index]} alt={door.alt} sizes="(max-width: 1023px) 50vw, 33vw" imageClassName="home-door__photo" /></div><div className="home-door__copy"><h3 className="heading">{door.title}</h3><p>{door.copy}</p><Link className="inline-link label" href={routeFor(locale, doorPages[index])}>{door.link}</Link></div></article>)}</div></div></section>
    <section className="section-space surface-linen"><div className="site-container site-grid"><Reveal className="home-founder__image"><Figure image="flaviano-wide" alt={copy.founder.alt} sizes="(max-width: 767px) 100vw, 50vw" /></Reveal><Reveal className="home-founder__copy"><SectionHeader title={copy.founder.title} /><p className="body-copy">{copy.founder.copy}</p><ul className="ruled-list credential-list">{copy.founder.credentials.map((item) => <li key={item}>{item}</li>)}</ul><ButtonLink href={routeFor(locale, "story")} variant="ghost">{copy.founder.button}</ButtonLink></Reveal></div></section>
    <section className="section-space surface-sand"><div className="site-container"><SectionHeader title={copy.testimonialsTitle} className="home-work__header" /><div className="home-testimonials">{copy.testimonials.map((item, index) => <Reveal key={item.attribution} delay={index ? 0.08 : 0}><Quote attribution={item.attribution}>{item.quote}</Quote></Reveal>)}</div></div></section>
    <section className="home-visit surface-void"><MapEmbed className="home-visit__map" copy={common} /><div className="home-visit__copy"><h2 className="display-l">{copy.visit.title}</h2><span className="brass-rule" aria-hidden="true" /><div className="home-visit__details"><address>904 N California Ave<br />Chicago, IL 60622</address><p>{copy.visit.availability}</p><a href={PHONE_HREF}>{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div><ButtonLink href={BOOKING_URL} external variant="on-dark">{common.actions.bookAppointment}</ButtonLink></div></section>
  </main>;
}
