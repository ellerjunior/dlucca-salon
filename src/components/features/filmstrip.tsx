"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbox } from "@/components/features/lightbox";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import type { GalleryItem } from "@/types";

export function Filmstrip({ items, bridal = false }: { items: GalleryItem[]; bridal?: boolean }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      setProgress(max <= 0 ? 1 : strip.scrollLeft / max);
    };
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || strip.scrollWidth <= strip.clientWidth) return;
      event.preventDefault();
      strip.scrollLeft += event.deltaY;
    };
    strip.addEventListener("scroll", update, { passive: true });
    strip.addEventListener("wheel", wheel, { passive: false });
    update();
    return () => {
      strip.removeEventListener("scroll", update);
      strip.removeEventListener("wheel", wheel);
    };
  }, []);

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
      <div className="filmstrip__progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
      {active !== null ? <Lightbox items={items} initialIndex={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}
