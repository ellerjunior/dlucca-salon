import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { Figure } from "@/components/ui/figure";
import { Quote } from "@/components/ui/quote";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceRow } from "@/components/ui/service-row";
import { flavianoServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Casa D’Lucca Style Guide",
  robots: { index: false, follow: false },
};

const swatches = [
  ["ink", "#1C1C1A"], ["umber", "#51463D"], ["taupe", "#9A8977"], ["sand", "#D8CDBD"],
  ["linen", "#F3F0E9"], ["alabaster", "#FAF9F6"], ["brass", "#B79355"], ["void", "#0E0D0C"],
];

const spaces = [8, 16, 24, 40, 64, 96, 144, 200];

export default function StyleGuidePage() {
  return (
    <main id="main-content">
      <header className="styleguide-hero surface-linen"><div className="site-container"><span className="label">Casa D’Lucca / Internal</span><h1 className="display-xl">The house, in parts.</h1><p className="standfirst">Tokens, type, rules and primitives used across the public site.</p></div></header>

      <section className="styleguide-section surface-alabaster"><div className="site-container"><SectionHeader title="Color" standfirst="Brand colors are fixed. Brass remains a line, label or focus signal in public compositions." /><div className="swatch-grid">{swatches.map(([name, value]) => <div className={`swatch swatch--${name}`} key={name}><span className="label">{name}</span><span>{value}</span></div>)}</div></div></section>

      <section className="styleguide-section surface-linen"><div className="site-container"><SectionHeader title="Typography" /><div className="styleguide-type"><div><span className="label">Display XL</span><p className="display-xl">Brazilian beauty, held in Chicago.</p></div><div><span className="label">Display L</span><p className="display-l">The work speaks first.</p></div><div><span className="label">Heading</span><p className="heading">A considered appointment</p></div><div><span className="label">Body / Lora</span><p className="body-copy">Hair, skin and bridal artistry on California Avenue. Every paragraph stays within a deliberate reading measure.</p></div><div><span className="label">Label / Inter Tight</span></div></div></div></section>

      <section className="styleguide-section surface-alabaster"><div className="site-container"><SectionHeader title="Components" /><div className="styleguide-components"><div className="styleguide-actions"><ButtonLink href="#">Primary link</ButtonLink><ButtonLink href="#" variant="ghost">Ghost link</ButtonLink><Button type="button">Primary button</Button></div><ServiceRow service={flavianoServices[3]} /><Quote attribution="Casa D’Lucca">I give the best of myself to bring out the best in you.</Quote><Disclosure title="A ruled disclosure"><p>Details open within the document flow, without a modal or decorative icon.</p></Disclosure><Figure image="salon-interior" alt="D'Lucca salon interior" sizes="60vw" caption="Photography in a clean architectural frame" /></div></div></section>

      <section className="styleguide-section surface-linen"><div className="site-container"><SectionHeader title="Spacing" /><div className="spacing-demo">{spaces.map((space) => <span key={space} className={`space-${space}`}>{space}</span>)}</div></div></section>

      <section className="styleguide-section surface-void"><div className="site-container"><SectionHeader title="Section rhythm" standfirst="Linen moves to photography, alabaster, void, sand and the final dark footer — never flat, never random." /></div></section>
    </main>
  );
}
