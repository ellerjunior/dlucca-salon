import type { Metadata } from "next";
import { CherryWidget } from "@/components/features/cherry-widget";
import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { SectionHeader } from "@/components/ui/section-header";
import { BOOKING_URL, CHERRY_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Payment Plans",
  description: "Learn how to check Cherry payment options for eligible D’Lucca hair, aesthetics and bridal services.",
  path: "/financing",
  image: "financing",
});

export default function FinancingPage() {
  return (
    <main id="main-content">
      <PageSchema name="Financing" path="/financing" />
      <section className="page-hero page-hero--compact surface-linen"><div className="site-container site-grid"><div className="page-hero__copy financing-hero__copy"><h1 className="display-xl">Payment plans</h1><p className="standfirst">Treatments can be paid monthly through Cherry. Checking your options does not affect your credit score.</p><a className="inline-link label" href={CHERRY_URL} target="_blank" rel="noopener noreferrer">View options on Cherry</a></div></div></section>

      <section className="section-space surface-alabaster"><div className="site-container"><SectionHeader title="How it works" /><div className="finance-steps">{[["I", "Apply", "Complete Cherry’s application in about a minute."], ["II", "See your options", "Review the options Cherry makes available to you."], ["III", "Book and pay over time", "Use the selected plan for an eligible service."]].map(([index, title, copy]) => <article className="finance-step" key={title}><span className="finance-step__index label">{index}</span><h3 className="heading">{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="section-space surface-white"><div className="site-container site-grid"><div className="finance-check"><SectionHeader title="Check your options" /><div className="finance-check__widget"><CherryWidget /></div></div></div></section>

      <section className="section-space surface-linen"><div className="site-container"><SectionHeader title="What it may cover" standfirst="Eligibility and final terms are determined by Cherry." /><ul className="ruled-list coverage-list">{[["Hair extensions", "Variable"], ["Multi-session aesthetics", "$500–$1,600"], ["Bridal services", "Quoted individually"], ["Full color transformations", "$400–$500"]].map(([title, price]) => <li key={title}><span>{title}</span><span className="label">{price}</span></li>)}</ul></div></section>

      <section className="section-space surface-alabaster"><div className="site-container"><SectionHeader title="Questions" /><div className="finance-faq"><Disclosure title="Does checking my options affect my credit score?"><p>Cherry states that checking available options does not affect your credit score. Review current disclosures directly with Cherry before accepting a plan.</p></Disclosure><Disclosure title="Who decides eligibility and terms?"><p>Cherry determines eligibility, available terms and approval. D’Lucca does not make lending decisions.</p></Disclosure><Disclosure title="Can I use financing for every service?"><p>Coverage depends on the purchase and the options Cherry provides. Confirm the treatment plan with the salon and financing details with Cherry.</p></Disclosure></div></div></section>

      <section className="section-space surface-sand"><div className="site-container centered-cta"><h2 className="display-l">Return to the service, then choose the pace.</h2><div className="finance-actions"><ButtonLink href="/hair" variant="ghost">Back to hair</ButtonLink><ButtonLink href={BOOKING_URL} external>Book an appointment</ButtonLink></div></div></section>
    </main>
  );
}
