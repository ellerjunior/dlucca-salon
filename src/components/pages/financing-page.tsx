import { CherryWidget } from "@/components/features/cherry-widget";
import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { SectionHeader } from "@/components/ui/section-header";
import { getCommon } from "@/i18n/common";
import { routeFor, type Locale } from "@/i18n/config";
import { getPages } from "@/i18n/pages";
import { BOOKING_URL, CHERRY_URL } from "@/lib/constants";

export function FinancingPageContent({ locale }: { locale: Locale }) {
  const common = getCommon(locale);
  const copy = getPages(locale).financing;
  return <main id="main-content">
    <PageSchema name={copy.schemaName} path={routeFor(locale, "financing")} homeLabel={locale === "pt" ? "Início" : locale === "es" ? "Inicio" : "Home"} />
    <section className="page-hero page-hero--compact surface-linen"><div className="site-container site-grid"><div className="page-hero__copy financing-hero__copy"><h1 className="display-xl">{copy.heroTitle}</h1><p className="standfirst">{copy.heroCopy}</p><a className="inline-link label" href={CHERRY_URL} target="_blank" rel="noopener noreferrer">{copy.cherryLink}</a></div></div></section>
    <section className="section-space surface-alabaster"><div className="site-container"><SectionHeader title={copy.howTitle} /><div className="finance-steps">{copy.steps.map((item) => <article className="finance-step" key={item.index}><span className="finance-step__index label">{item.index}</span><h3 className="heading">{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>
    <section className="section-space surface-white"><div className="site-container site-grid"><div className="finance-check"><SectionHeader title={copy.checkTitle} /><div className="finance-check__widget"><CherryWidget locale={locale} copy={common.cherry} openLabel={common.actions.openCherry} /></div></div></div></section>
    <section className="section-space surface-linen"><div className="site-container"><SectionHeader title={copy.coverTitle} standfirst={copy.coverStandfirst} /><ul className="ruled-list coverage-list">{copy.coverage.map(([title, price]) => <li key={title}><span>{title}</span><span className="label">{price}</span></li>)}</ul></div></section>
    <section className="section-space surface-alabaster"><div className="site-container"><SectionHeader title={copy.questionsTitle} /><div className="finance-faq">{copy.faqs.map((item) => <Disclosure title={item.question} key={item.question}><p>{item.answer}</p></Disclosure>)}</div></div></section>
    <section className="section-space surface-sand"><div className="site-container centered-cta"><h2 className="display-l">{copy.ctaTitle}</h2><div className="finance-actions"><ButtonLink href={routeFor(locale, "hair")} variant="ghost">{copy.back}</ButtonLink><ButtonLink href={BOOKING_URL} external>{common.actions.bookAppointment}</ButtonLink></div></div></section>
  </main>;
}
