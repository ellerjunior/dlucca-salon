"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { Lightbox } from "@/components/features/lightbox";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { galleryFilters, galleryItems } from "@/data/gallery";
import type { GalleryCategory } from "@/types";

type Filter = "all" | GalleryCategory;

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => galleryItems.filter((item) => filter === "all" || item.category === filter), [filter]);

  return (
    <>
      <div className="gallery-filters" role="group" aria-label="Filter gallery">
        {galleryFilters.map((option) => <button type="button" key={option.value} className="label" data-active={filter === option.value} aria-pressed={filter === option.value} onClick={() => setFilter(option.value as Filter)}>{option.label}</button>)}
      </div>
      <motion.div className="gallery-grid" layout={!reduceMotion}>
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.figure
              layout={!reduceMotion}
              className={`gallery-grid__item gallery-grid__item--${item.size}`}
              key={item.id}
              initial={reduceMotion ? false : { y: 12 }}
              animate={{ y: 0 }}
              exit={reduceMotion ? undefined : { y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : Math.min(index, 5) * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <button type="button" className="gallery-grid__button media-frame" onClick={() => setActive(index)}>
                <ResponsiveImage image={item.image} alt={item.alt} sizes="(max-width: 767px) 88vw, (max-width: 1200px) 50vw, 42vw" imageClassName="gallery-grid__image" priority={index === 0} />
              </button>
              <figcaption className="label">{item.caption}</figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>
      {active !== null ? <Lightbox items={items} initialIndex={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}
