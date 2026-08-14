import type { Metadata } from "next";
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
import { BOOKING_URL, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Brazilian Hair, Aesthetics & Bridal",
  description: "D’Lucca brings Brazilian hair, aesthetics and bridal artistry to California Avenue in Chicago.",
  path: "/",
  image: "home",
});

const work = galleryItems.filter((item) => ["hero-blonde", "1039", "1533", "1616", "2225"].includes(item.id));

export default function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />

      <section className="section-space surface-linen">
        <div className="site-container site-grid">
          <Reveal className="home-invitation__copy">
            <SectionHeader title="An invitation to the house" />
            <p className="body-copy">
              Experience the essence of Brazilian beauty in the heart of Chicago. Our expert team blends authentic techniques with top-tier local talent to deliver personalized hair, beauty, and wellness services. Discover a vibrant, transformative experience where Brazilian flair meets Chicago sophistication.
            </p>
          </Reveal>
          <Reveal className="home-invitation__image" delay={0.08}>
            <Figure image="salon-interior" alt="The bright D'Lucca salon interior on California Avenue" sizes="(max-width: 767px) 80vw, 42vw" arch />
          </Reveal>
        </div>
      </section>

      <section className="home-work surface-void" aria-labelledby="work-title">
        <Reveal className="home-work__header">
          <h2 id="work-title" className="display-l home-work__title">The work speaks first.</h2>
          <span className="brass-rule" aria-hidden="true" />
        </Reveal>
        <Filmstrip items={work} />
      </section>

      <section className="surface-alabaster" aria-labelledby="house-title">
        <div className="site-container section-space">
          <SectionHeader title="Three doors, one house" className="home-work__header" />
          <h2 id="house-title" className="visually-hidden">Explore hair, aesthetics and weddings</h2>
          <div className="home-doors">
            <article className="home-door">
              <div className="home-door__image media-frame" data-hover="true"><ResponsiveImage image="work-1039" alt="Dimensional blonde hair styled in long waves" sizes="(max-width: 1023px) 50vw, 33vw" imageClassName="home-door__photo" /></div>
              <div className="home-door__copy"><h3 className="heading">Hair</h3><p>Color, cuts, Brazilian keratin, extensions.</p><Link className="inline-link label" href="/hair">Enter hair</Link></div>
            </article>
            <article className="home-door">
              <div className="home-door__image media-frame" data-hover="true"><ResponsiveImage image="aesthetics-treatment" alt="A clinician preparing an aesthetics treatment" sizes="(max-width: 1023px) 50vw, 33vw" imageClassName="home-door__photo" /></div>
              <div className="home-door__copy"><h3 className="heading">Aesthetics</h3><p>Injectables, microneedling, advanced facials.</p><Link className="inline-link label" href="/aesthetics">Enter aesthetics</Link></div>
            </article>
            <article className="home-door">
              <div className="home-door__image media-frame" data-hover="true"><ResponsiveImage image="wedding-hero" alt="Bride with polished makeup and crystal hair accessory" sizes="(max-width: 1023px) 50vw, 33vw" imageClassName="home-door__photo" /></div>
              <div className="home-door__copy"><h3 className="heading">Weddings</h3><p>Bridal hair and makeup, in studio or on location.</p><Link className="inline-link label" href="/weddings">Enter weddings</Link></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space surface-linen">
        <div className="site-container site-grid">
          <Reveal className="home-founder__image"><Figure image="flaviano-wide" alt="Flaviano D. Lucca in the salon" sizes="(max-width: 767px) 100vw, 50vw" /></Reveal>
          <Reveal className="home-founder__copy">
            <SectionHeader title="Flaviano" />
            <p className="body-copy">Flaviano D. Lucca is a distinguished Brazilian hairstylist and makeup artist, with a degree in Visagism and Hair Therapy from Anhembi Morumbi University in São Paulo, Brazil. With over 80 certifications across specialties, his work is grounded in technical mastery and dedication to the art of beauty. In Chicago, he earned a degree in Cosmetology from Tricoci Beauty College.</p>
            <ul className="ruled-list credential-list">
              <li>Anhembi Morumbi — Visagism & Hair Therapy</li><li>Vidal Sassoon Academy, Miami</li><li>Pivot Point, Argentina</li><li>80+ certifications</li>
            </ul>
            <ButtonLink href="/story" variant="ghost">Read his story</ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="section-space surface-sand">
        <div className="site-container">
          <SectionHeader title="In their words" className="home-work__header" />
          <div className="home-testimonials">
            <Reveal><Quote attribution="Kesia Asami">If you’re looking for great hair and a great experience, you found it. The space is stunning, the vibe is welcoming, and the service is excellent. Flaviano is absolutely the best in town. When I go there I just sit and relax. He knows exactly what to do. Thank you for all the passion you put into your work.</Quote></Reveal>
            <Reveal delay={0.08}><Quote attribution="Maria Kalacinski">Simply amazing! Flaviano worked magic on my hair. The color is stunning and the cut is flawless. I’m beyond happy with the results and will definitely be back. If you want gorgeous hair, go see Flaviano!</Quote></Reveal>
          </div>
        </div>
      </section>

      <section className="home-visit surface-void">
        <MapEmbed className="home-visit__map" />
        <div className="home-visit__copy">
          <h2 className="display-l">Come to the house.</h2>
          <span className="brass-rule" aria-hidden="true" />
          <div className="home-visit__details">
            <address>904 N California Ave<br />Chicago, IL 60622</address>
            <p>Please call for current availability.</p>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <ButtonLink href={BOOKING_URL} external variant="on-dark">Book an appointment</ButtonLink>
        </div>
      </section>
    </main>
  );
}
