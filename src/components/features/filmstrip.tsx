"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Lightbox } from "@/components/features/lightbox";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import type { GalleryItem } from "@/types";

export function Filmstrip({ items, bridal = false }: { items: GalleryItem[]; bridal?: boolean }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      const position = Math.max(0, strip.scrollLeft);
      const cards = strip.querySelectorAll<HTMLElement>(".filmstrip__item");
      const stripRect = strip.getBoundingClientRect();
      const firstRect = cards[0]?.getBoundingClientRect();
      const lastRect = cards[cards.length - 1]?.getBoundingClientRect();
      setProgress(max <= 0 ? 1 : Math.min(1, position / max));
      setCanScrollPrevious(Boolean(firstRect && firstRect.left < stripRect.left - 2));
      setCanScrollNext(Boolean(lastRect && lastRect.right > stripRect.right + 2));
    };
    const resizeObserver = new ResizeObserver(update);
    strip.addEventListener("scroll", update, { passive: true });
    resizeObserver.observe(strip);
    update();
    return () => {
      strip.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [items.length]);

  const scrollByItem = (direction: -1 | 1) => {
    const strip = stripRef.current;
    const item = strip?.querySelector<HTMLElement>(".filmstrip__item");
    if (!strip || !item) return;
    const styles = window.getComputedStyle(strip);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    strip.scrollBy({
      left: direction * (item.offsetWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div ref={stripRef} className={`filmstrip ${bridal ? "filmstrip--bridal" : ""}`} tabIndex={0} aria-label="Horizontally scrolling gallery">
        {items.map((item, index) => (
          <figure className="filmstrip__item" key={item.id}>
            <button type="button" className="filmstrip__button media-frame" onClick={() => setActive(index)}>
              <ResponsiveImage image={item.image} alt={item.alt} sizes="(max-width: 767px) 78vw, 42vw" imageClassName="filmstrip__image" />
            </button>
            <figcaption className="label">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="filmstrip__controls">
        <div className="filmstrip__progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
        <div className="filmstrip__navigation" aria-label="Gallery navigation">
          <button type="button" onClick={() => scrollByItem(-1)} disabled={!canScrollPrevious} aria-label="Previous image">
            <span className="rule-arrow rule-arrow--left" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollByItem(1)} disabled={!canScrollNext} aria-label="Next image">
            <span className="rule-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
      {active !== null ? <Lightbox items={items} initialIndex={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}
