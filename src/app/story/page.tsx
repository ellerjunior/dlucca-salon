import type { Metadata } from "next";
import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import { BOOKING_URL, SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Story",
  description: "Meet Brazilian hairstylist and makeup artist Flaviano D. Lucca and the training behind his Chicago salon.",
  path: "/story",
  image: "story",
});

const training = [
  ["I", "Anhembi Morumbi University", "Visagism & Hair Therapy", "São Paulo"],
  ["II", "Pivot Point", "Advanced hair training", "Argentina"],
  ["III", "Vidal Sassoon Academy", "Advanced hair training", "Miami"],
  ["IV", "Tricoci Beauty College", "Cosmetology", "Chicago"],
];

export default function StoryPage() {
  const person = {
    "@context": "https://schema.org", "@type": "Person", name: "Flaviano D. Lucca",
    jobTitle: "Hairstylist and Makeup Artist", worksFor: { "@id": `${SITE_URL}/#salon` },
    alumniOf: ["Anhembi Morumbi University", "Tricoci Beauty College", "Vidal Sassoon Academy", "Pivot Point"],
  };
  return (
    <main id="main-content">
      <PageSchema name="Story" path="/story" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <section className="story-hero surface-linen">
        <div className="site-container site-grid">
          <div className="story-hero__copy"><h1 className="display-xl">My journey in the art of beauty</h1></div>
          <p className="standfirst story-hero__standfirst">From the heart of Brazil to the city of Chicago, Flaviano’s devotion to his craft shines through in every transformation. His story is one of talent, dedication, and a deep desire to help people see their true beauty.</p>
          <div className="story-hero__portrait arch media-frame"><ResponsiveImage image="flaviano-portrait" alt="Portrait of Flaviano D. Lucca" sizes="(max-width: 767px) 80vw, 28vw" imageClassName="story-hero__photo" priority /></div>
        </div>
      </section>

      <section className="story-craft surface-void">
        <div className="site-container"><Reveal><blockquote className="display-l story-craft__quote">I give the best of myself to bring out the best in you.</blockquote><div className="story-craft__attribution label">Flaviano D. Lucca</div></Reveal></div>
      </section>

      <section className="section-space surface-linen">
        <div className="site-container"><SectionHeader title="The training" standfirst="A Brazilian foundation, sharpened across four cities." />
          <div className="training-list">{training.map(([index, institution, discipline, city]) => <div className="training-row" key={institution}><span className="training-row__index label">{index}</span><span className="training-row__institution">{institution}</span><span className="training-row__discipline">{discipline}</span><span className="training-row__city label">{city}</span></div>)}</div>
        </div>
      </section>

      <section className="section-space surface-alabaster">
        <div className="site-container"><SectionHeader title="The standard" />
          <div className="principles">
            <article className="principle"><span className="principle__index label">I</span><h3 className="heading">Visagism</h3><p>The face is read before the cut is designed. Shape, proportion and personal style guide the decision.</p></article>
            <article className="principle"><span className="principle__index label">II</span><h3 className="heading">Hair therapy</h3><p>Hair is treated as material with its own condition and history. The plan begins with what it needs, not only how it should look.</p></article>
            <article className="principle"><span className="principle__index label">III</span><h3 className="heading">Brazilian technique</h3><p>Flaviano’s São Paulo training remains present in his color, treatment and finishing work. Chicago is now the home for that practice.</p></article>
          </div>
        </div>
      </section>

      <section className="portrait-plate"><ResponsiveImage image="flaviano-wide" alt="Flaviano D. Lucca standing in the salon" sizes="100vw" fill imageClassName="portrait-plate__image" /></section>
      <section className="section-space surface-linen"><div className="site-container centered-cta"><h2 className="display-l">Book a consultation with Flaviano.</h2><p className="standfirst">Thirty minutes. No charge. A clear place to begin.</p><ButtonLink href={BOOKING_URL} external>Book the free consultation</ButtonLink></div></section>
    </main>
  );
}
