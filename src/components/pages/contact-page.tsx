import { MapEmbed } from "@/components/features/map-embed";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { PageSchema } from "@/components/site/page-schema";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { getCommon } from "@/i18n/common";
import { routeFor, type Locale } from "@/i18n/config";
import { getPages } from "@/i18n/pages";
import { ADDRESS, BOOKING_URL, EMAIL, EXTERNAL_PROPS, INSTAGRAM_URL, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

export function ContactPageContent({ locale }: { locale: Locale }) {
  const common = getCommon(locale);
  const copy = getPages(locale).contact;
  return <main id="main-content">
    <PageSchema name={copy.schemaName} path={routeFor(locale, "contact")} homeLabel={locale === "pt" ? "Início" : locale === "es" ? "Inicio" : "Home"} />
    <section className="contact-hero surface-void"><div className="site-container site-grid"><div className="contact-hero__title"><h1 className="display-xl">{copy.heroBefore} <em>{copy.heroEmphasis}</em> {copy.heroAfter}</h1></div><div className="contact-hero__actions"><p className="standfirst"><em>{copy.heroCopy}</em></p><a className="contact-action label" href={BOOKING_URL} {...EXTERNAL_PROPS}><span>{copy.bookOnline}</span><span className="contact-action__line" /></a><a className="contact-action label" href={PHONE_HREF}><span>{copy.call} {PHONE_DISPLAY}</span><span className="contact-action__line" /></a><a className="contact-action label" href={`mailto:${EMAIL}`}><span>{copy.emailHouse}</span><span className="contact-action__line" /></a></div></div></section>
    <section className="section-space surface-linen"><div className="site-container site-grid"><div className="studio-image media-frame"><ResponsiveImage image="salon-interior" alt={copy.studioAlt} sizes="(max-width: 767px) 100vw, 50vw" imageClassName="studio-image__photo" /></div><div className="studio-copy"><SectionHeader title={copy.studioTitle} /><address>{ADDRESS}</address><a className="inline-link label" href={MAPS_URL} {...EXTERNAL_PROPS}>{common.actions.getDirections}</a><div className="studio-hours"><span className="label">{copy.availabilityLabel}</span><p>{copy.availabilityCopy}</p></div></div></div></section>
    <MapEmbed className="contact-map" copy={common} />
    <section className="surface-alabaster"><div className="follow-band"><div className="follow-band__copy"><h2 className="display-l">{copy.recentTitle}</h2><a className="inline-link label" href={INSTAGRAM_URL} {...EXTERNAL_PROPS}>@dluccahairbeauty</a></div>{[["work-0799", copy.recentAlts[0]], ["work-0847", copy.recentAlts[1]], ["work-1533", copy.recentAlts[2]]].map(([image, alt]) => <div className="follow-band__image media-frame" key={image}><ResponsiveImage image={image} alt={alt} sizes="(max-width: 767px) 100vw, 25vw" imageClassName="follow-band__photo" /></div>)}</div></section>
    <section className="section-space surface-linen"><div className="site-container contact-news"><SectionHeader title={copy.newsTitle} standfirst={copy.newsCopy} /><NewsletterForm copy={common.newsletter} /></div></section>
  </main>;
}
