"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import type { GalleryItem } from "@/types";

export function Lightbox({ items, initialIndex, onClose }: { items: GalleryItem[]; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const item = items[index];

  const previous = useCallback(() => setIndex((value) => (value - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIndex((value) => (value + 1) % items.length), [items.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [next, previous]);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 45) {
          if (delta > 0) previous();
          else next();
        }
        touchStart.current = null;
      }}
      aria-label="Gallery image viewer"
    >
      <button className="lightbox__close" type="button" onClick={() => dialogRef.current?.close()}>
        <span className="visually-hidden">Close gallery</span>
      </button>
      <div className="lightbox__image" key={item.id}>
        <ResponsiveImage image={item.image} alt={item.alt} sizes="92vw" imageClassName="lightbox__photo" />
      </div>
      {items.length > 1 ? (
        <>
          <button className="lightbox__arrow lightbox__arrow--left" type="button" onClick={previous}>
            <span className="rule-arrow rule-arrow--left" aria-hidden="true" /><span className="visually-hidden">Previous image</span>
          </button>
          <button className="lightbox__arrow lightbox__arrow--right" type="button" onClick={next}>
            <span className="rule-arrow" aria-hidden="true" /><span className="visually-hidden">Next image</span>
          </button>
        </>
      ) : null}
      <div className="lightbox__caption label">{item.caption}</div>
      <div className="lightbox__count label">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</div>
    </dialog>
  );
}
