"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { localeDetails, locales, routeFor, type Locale, type PageId } from "@/i18n/config";

export function LanguageSelector({ locale, page, label, className = "" }: { locale: Locale; page: PageId; label: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = localeDetails[locale];
  return (
    <div ref={rootRef} className={`language-selector ${className}`.trim()} data-open={open}>
      <button ref={triggerRef} type="button" className="language-selector__trigger" aria-expanded={open} aria-controls={menuId} aria-label={`${label}: ${current.label}`} onClick={() => setOpen((value) => !value)}>
        <Image className="language-selector__flag" src={current.flagSrc} alt="" width={24} height={16} aria-hidden="true" /><span>{current.short}</span><span className="language-selector__chevron" aria-hidden="true" />
      </button>
      <div id={menuId} className="language-selector__menu" aria-label={label}>
        {locales.map((option) => {
          const detail = localeDetails[option];
          return (
            <a key={option} href={routeFor(option, page)} lang={detail.html} aria-current={option === locale ? "page" : undefined} onClick={() => setOpen(false)}>
              <Image className="language-selector__flag" src={detail.flagSrc} alt="" width={24} height={16} aria-hidden="true" /><span>{detail.label}</span><span className="label">{detail.short}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
