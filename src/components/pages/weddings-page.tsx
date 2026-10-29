import { Filmstrip } from "@/components/features/filmstrip";
import { InquiryForm } from "@/components/features/inquiry-form";
import { PageSchema } from "@/components/site/page-schema";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { galleryItems } from "@/data/gallery";
import { getCommon } from "@/i18n/common";
import { routeFor, type Locale } from "@/i18n/config";
import { localizeGallery } from "@/i18n/gallery";
import { getPages } from "@/i18n/pages";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

export function WeddingsPageContent({ locale }: { locale: Locale }) {
  const common = getCommon(locale);
  const copy = getPages(locale).weddings;
  const bridalGallery = localizeGallery(galleryItems, locale).filter((item) => ["bride", "wedding-final-touches", "wedding-veil", "wedding-bridal-party", "wedding-black-white"].includes(item.id));
  return <main id="main-content">
    <PageSchema name={copy.schemaName} path={routeFor(locale, "weddings")} homeLabel={locale === "pt" ? "Início" : locale === "es" ? "Inicio" : "Home"} />
    <section className="wedding-hero surface-void"><div className="wedding-hero__media"><ResponsiveImage image="wedding-veil" alt={copy.heroAlt} sizes="100vw" fill priority imageClassName="wedding-hero__image" /></div><div className="wedding-hero__veil" /><div className="site-container site-grid wedding-hero__content"><div className="wedding-hero__copy"><h1 className="display-xl">{copy.heroTitleBefore} <em>{copy.heroTitleEmphasis}</em> {copy.heroTitleAfter}</h1><span className="brass-rule" /><p>{copy.heroCopy}</p></div></div></section>
    <section className="section-space surface-linen"><div className="site-container"><SectionHeader title={copy.waysTitle} standfirst={copy.waysStandfirst} /><div className="package-spread"><article className="package"><h3 className="display-l">{copy.brideTitle}</h3><ul className="ruled-list">{copy.bride.map((item) => <li key={item}>{item}</li>)}</ul><div className="package__price"><span className="label">{copy.publishedReference}</span><strong>{copy.bridePrice}</strong><p>{copy.bridePriceCopy}</p></div></article><article className="package"><h3 className="display-l">{copy.partyTitle}</h3><ul className="ruled-list">{copy.party.map((item) => <li key={item}>{item}</li>)}</ul><div className="package__price"><span className="label">{copy.publishedReference}</span><strong>{copy.partyPrice}</strong><p>{copy.partyPriceCopy}</p></div></article></div></div></section>
    <section className="section-space surface-void"><div className="site-container"><SectionHeader title={copy.timelineTitle} /><div className="wedding-timeline">{copy.timeline.map((item) => <article className="wedding-timeline__step" key={item.index}><span className="label">{item.index}</span><h3 className="heading">{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>
    <section className="home-work surface-void"><div className="home-work__header"><SectionHeader title={copy.workTitle} /></div><Filmstrip items={bridalGallery} bridal labels={common.actions} /></section>
    <section className="section-space surface-alabaster"><div className="site-container"><SectionHeader title={copy.inquiryTitle} standfirst={copy.inquiryStandfirst} /><div className="inquiry-layout"><InquiryForm copy={common.forms} /><aside className="inquiry-aside"><h3 className="heading">{copy.directTitle}</h3><p>{copy.directCopy}</p><div className="inquiry-aside__links"><a href={PHONE_HREF}>{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></aside></div></div></section>
  </main>;
}
