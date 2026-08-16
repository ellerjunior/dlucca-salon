"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Lightbox } from "@/components/features/lightbox";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import type { CommonDictionary } from "@/i18n/common";
import type { PageDictionary } from "@/i18n/pages";
import type { GalleryCategory, GalleryItem } from "@/types";

type Filter = "all" | GalleryCategory;

export function GalleryViewer({ items: allItems, copy, actions }: { items: GalleryItem[]; copy: PageDictionary["gallery"]; actions: CommonDictionary["actions"] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStart = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => allItems.filter((item) => filter === "all" || item.category === filter), [allItems, filter]);
  const item = items[Math.min(activeIndex, Math.max(0, items.length - 1))];

  useEffect(() => setActiveIndex(0), [filter]);
  const previous = () => setActiveIndex((index) => Math.max(0, index - 1));
  const next = () => setActiveIndex((index) => Math.min(items.length - 1, index + 1));
  const filterOptions: Array<{ value: Filter; label: string }> = [
    { value: "all", label: copy.all },
    ...Object.entries(copy.filters).map(([value, label]) => ({ value: value as GalleryCategory, label })),
  ];

  return (
    <>
      <div className="gallery-viewer__filters" role="group" aria-label={copy.filtersLabel}>
        {filterOptions.map((option) => {
          const count = option.value === "all" ? allItems.length : allItems.filter((entry) => entry.category === option.value).length;
          return <button type="button" key={option.value} className="label" data-active={filter === option.value} aria-pressed={filter === option.value} onClick={() => setFilter(option.value)}><span>{option.label}</span><span aria-hidden="true">{String(count).padStart(2, "0")}</span></button>;
        })}
      </div>

      <section className="gallery-viewer" aria-label={copy.thumbnailRail} onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
        if (event.key === "ArrowRight") { event.preventDefault(); next(); }
      }}>
        <div className="gallery-viewer__stage" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const delta = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 45) { if (delta > 0) previous(); else next(); }
          touchStart.current = null;
        }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.button key={item.id} type="button" className="gallery-viewer__main" onClick={() => setLightboxOpen(true)} aria-label={`${copy.openImage}: ${item.caption}`} initial={reduceMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -18 }} transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}>
              <ResponsiveImage image={item.image} alt={item.alt} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 90vw, 68vw" imageClassName="gallery-viewer__photo" priority={activeIndex === 0} />
            </motion.button>
          </AnimatePresence>
          <div className="gallery-viewer__controls" aria-label={actions.galleryNavigation}>
            <button type="button" onClick={previous} disabled={activeIndex === 0 || items.length < 2} aria-label={actions.previousImage}><span className="rule-arrow rule-arrow--left" aria-hidden="true" /></button>
            <button type="button" onClick={next} disabled={activeIndex >= items.length - 1 || items.length < 2} aria-label={actions.nextImage}><span className="rule-arrow" aria-hidden="true" /></button>
          </div>
        </div>

        <div className="gallery-viewer__index">
          <div className="gallery-viewer__meta" aria-live="polite">
            <span className="label">{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            <h2 className="heading">{item.caption}</h2>
            <span className="gallery-viewer__category label">{copy.filters[item.category]}</span>
          </div>
          <div className="gallery-viewer__thumbs" aria-label={copy.thumbnailRail}>
            {items.map((entry, index) => <button type="button" key={entry.id} className="gallery-viewer__thumb" data-active={index === activeIndex} aria-label={`${copy.openImage}: ${entry.caption}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => setActiveIndex(index)}><ResponsiveImage image={entry.image} alt="" sizes="8rem" imageClassName="gallery-viewer__thumb-photo" /><span className="label" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></button>)}
          </div>
        </div>
      </section>
      {lightboxOpen ? <Lightbox items={items} initialIndex={activeIndex} onClose={() => setLightboxOpen(false)} labels={actions} /> : null}
    </>
  );
}
