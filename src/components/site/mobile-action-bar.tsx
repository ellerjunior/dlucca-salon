"use client";

import { useEffect, useState } from "react";
import { getCommon } from "@/i18n/common";
import type { Locale } from "@/i18n/config";
import { BOOKING_URL, EXTERNAL_PROPS, PHONE_HREF } from "@/lib/constants";

export function MobileActionBar({ locale }: { locale: Locale }) {
  const [hidden, setHidden] = useState(false);
  const copy = getCommon(locale);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="mobile-action-bar" aria-label={copy.actions.quickActions} aria-hidden={hidden} data-hidden={hidden} inert={hidden ? true : undefined}>
      <a href={PHONE_HREF} tabIndex={hidden ? -1 : undefined}>{copy.actions.call}</a>
      <a href={BOOKING_URL} tabIndex={hidden ? -1 : undefined} {...EXTERNAL_PROPS}>{copy.actions.book}</a>
    </nav>
  );
}
