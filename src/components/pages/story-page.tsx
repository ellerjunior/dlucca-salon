import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { routeFor, type Locale } from "@/i18n/config";
import { getPages } from "@/i18n/pages";
import { BOOKING_URL, SITE_URL } from "@/lib/constants";

export function StoryPageContent({ locale }: { locale: Locale }) {
  const copy = getPages(locale).story;
  const person = { "@context": "https://schema.org", "@type": "Person", name: "Flaviano D. Lucca", jobTitle: locale === "pt" ? "Cabeleireiro e Maquiador" : locale === "es" ? "Estilista y Maquillador" : "Hairstylist and Makeup Artist", worksFor: { "@id": `${SITE_URL}/#salon` }, alumniOf: ["Anhembi Morumbi University", "Tricoci Beauty College", "Vidal Sassoon Academy", "Pivot Point"] };
  return <main id="main-content">
    <PageSchema name={copy.schemaName} path={routeFor(locale, "story")} homeLabel={locale === "pt" ? "Início" : locale === "es" ? "Inicio" : "Home"} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    <section className="story-hero surface-linen"><div className="site-container site-grid"><div className="story-hero__copy"><h1 className="display-xl">{copy.heroTitle}</h1></div><p className="standfirst story-hero__standfirst">{copy.standfirst}</p><div className="story-hero__portrait media-frame"><ResponsiveImage image="flaviano-portrait" alt={copy.portraitAlt} sizes="(max-width: 767px) 80vw, 28vw" imageClassName="story-hero__photo" priority /></div></div></section>
    <section className="story-craft surface-void"><div className="site-container"><Reveal><blockquote className="display-l story-craft__quote">{copy.quote}</blockquote><div className="story-craft__attribution label">Flaviano D. Lucca</div></Reveal></div></section>
    <section className="section-space surface-linen"><div className="site-container"><SectionHeader title={copy.trainingTitle} standfirst={copy.trainingStandfirst} /><div className="training-list">{copy.training.map(([index, institution, discipline, city]) => <div className="training-row" key={institution}><span className="training-row__index label">{index}</span><span className="training-row__institution">{institution}</span><span className="training-row__discipline">{discipline}</span><span className="training-row__city label">{city}</span></div>)}</div></div></section>
    <section className="section-space surface-alabaster"><div className="site-container"><SectionHeader title={copy.standardTitle} /><div className="principles">{copy.principles.map((item) => <article className="principle" key={item.index}><span className="principle__index label">{item.index}</span><h3 className="heading">{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>
    <section className="portrait-plate"><ResponsiveImage image="flaviano-wide" alt={copy.wideAlt} sizes="100vw" fill imageClassName="portrait-plate__image" /></section>
    <section className="section-space surface-linen"><div className="site-container centered-cta"><h2 className="display-l">{copy.ctaTitle}</h2><p className="standfirst">{copy.ctaCopy}</p><ButtonLink href={BOOKING_URL} external>{copy.ctaButton}</ButtonLink></div></section>
  </main>;
}
