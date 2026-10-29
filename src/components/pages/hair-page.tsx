import Link from "next/link";
import { ServiceMenu } from "@/components/features/service-menu";
import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { daniServices, flavianoServices } from "@/data/services";
import { routeFor, type Locale } from "@/i18n/config";
import { getPages } from "@/i18n/pages";
import { localizeServices } from "@/i18n/services";
import { BOOKING_URL } from "@/lib/constants";

const signatureImages = ["hair-blonde-waves", "style-sleek-pink", "hair-brunette-back", "hair-dark-gloss"];

export function HairPageContent({ locale }: { locale: Locale }) {
  const copy = getPages(locale).hair;
  return <main id="main-content">
    <PageSchema name={copy.schemaName} path={routeFor(locale, "hair")} homeLabel={locale === "pt" ? "Início" : locale === "es" ? "Inicio" : "Home"} />
    <section className="page-hero hair-hero surface-void"><div className="hair-hero__media"><ResponsiveImage image="hair-flaviano-client" alt={copy.heroAlt} sizes="(max-width: 767px) 100vw, 50vw" fill priority imageClassName="hair-hero__image" /></div><div className="site-container site-grid"><div className="page-hero__copy hair-hero__copy"><h1 className="display-xl">{copy.heroTitle}</h1><span className="brass-rule" /><p className="standfirst">{copy.heroCopy}</p></div></div></section>
    <section className="section-space surface-linen"><div className="site-container"><ServiceMenu flaviano={localizeServices(flavianoServices, locale)} dani={localizeServices(daniServices, locale)} locale={locale} /><p className="service-source-note label">{copy.sourceNote}</p></div></section>
    <section className="section-space surface-alabaster"><div className="site-container"><SectionHeader title={copy.signaturesTitle} standfirst={copy.signaturesStandfirst} /></div><div className="signature-stack">{copy.signatures.map((item, index) => <article className={`signature-band ${index % 2 ? "surface-linen" : "surface-alabaster"}`} key={item.name}><div className="signature-band__media media-frame" data-hover="true"><ResponsiveImage image={signatureImages[index]} alt={item.alt} sizes="(max-width: 767px) 100vw, 52vw" imageClassName="signature-band__image" /></div><div className="signature-band__copy"><h3 className="display-l">{item.name}</h3><div className="signature-band__meta label"><span>{item.price}</span><span>{item.duration}</span></div><p>{item.copy}</p><a className="inline-link label" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{copy.bookService}</a></div></article>)}</div></section>
    <section className="section-space surface-void"><div className="site-container centered-cta"><h2 className="display-l">{copy.consultTitle}</h2><p className="standfirst">{copy.consultCopy}</p><ButtonLink href={BOOKING_URL} external variant="on-dark">{copy.consultButton}</ButtonLink></div></section>
    <section className="section-space surface-linen"><div className="site-container"><SectionHeader title={copy.galleryTitle} standfirst={copy.galleryCopy} /><div className="mini-masonry">{["hair-copper-waves", "hair-caramel-laugh", "hair-blonde-bob"].map((image, index) => <figure className="mini-masonry__item" key={image}><div className="media-frame" data-hover="true"><ResponsiveImage image={image} alt={copy.galleryAlts[index]} sizes="(max-width: 767px) 80vw, 32vw" imageClassName="mini-masonry__image" /></div></figure>)}</div><Link className="inline-link label" href={routeFor(locale, "gallery")}>{copy.galleryButton}</Link></div></section>
    <section className="section-space surface-sand"><div className="site-container financing-note"><p className="heading">{copy.financingCopy}</p><ButtonLink href={routeFor(locale, "financing")} variant="ghost">{copy.financingButton}</ButtonLink></div></section>
  </main>;
}
