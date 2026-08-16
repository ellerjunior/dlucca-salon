"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { BOOKING_URL } from "@/lib/constants";
import type { PageDictionary } from "@/i18n/pages";

export function HomeHero({ copy, bookLabel }: { copy: PageDictionary["home"]["hero"]; bookLabel: string }) {
  const reduceMotion = useReducedMotion();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("dlucca-hero-seen");
    if (!seen && !reduceMotion) {
      setAnimate(true);
      sessionStorage.setItem("dlucca-hero-seen", "true");
    }
  }, [reduceMotion]);

  const lines = copy.lines;
  return (
    <section className="home-hero surface-void" aria-labelledby="home-title">
      <motion.div
        className="home-hero__media"
        initial={animate ? { scale: 1.06 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <ResponsiveImage
          image="hero-blonde-2026"
          alt={copy.alt}
          sizes="100vw"
          priority
          fill
          className="home-hero__picture"
          imageClassName="home-hero__image"
        />
      </motion.div>
      <div className="home-hero__scrim" aria-hidden="true" />
      <div className="site-container site-grid home-hero__content">
        <div className="home-hero__copy">
          <h1 id="home-title" className="display-xl home-hero__title">
            {lines.map((line, index) => (
              <span className="home-hero__line-mask" key={line}>
                <motion.span
                  initial={animate ? { y: "110%" } : false}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {index === 1 ? <em>{line}</em> : line}
                </motion.span>
              </span>
            ))}
          </h1>
          <span className="brass-rule" />
          <p>{copy.copy}</p>
          <ButtonLink href={BOOKING_URL} external variant="on-dark">{bookLabel}</ButtonLink>
        </div>
        <div className="home-hero__cue label" aria-hidden="true">
          <span>{copy.cue}</span><span className="home-hero__cue-line" />
        </div>
      </div>
    </section>
  );
}
