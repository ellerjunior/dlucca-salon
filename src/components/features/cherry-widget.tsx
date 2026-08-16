"use client";

import { useEffect, useRef, useState } from "react";
import { CHERRY_URL } from "@/lib/constants";
import type { CommonDictionary } from "@/i18n/common";
import type { Locale } from "@/i18n/config";

type CherryFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window { _hw?: CherryFunction; }
}

export function CherryWidget({ locale, copy, openLabel }: { locale: Locale; copy: CommonDictionary["cherry"]; openLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || state !== "idle") return;
      observer.disconnect();
      setState("loading");
      const styles = getComputedStyle(document.documentElement);
      const ink = styles.getPropertyValue("--color-ink").trim();
      const linen = styles.getPropertyValue("--color-linen").trim();
      const queue: CherryFunction = (...args: unknown[]) => { (queue.q = queue.q || []).push(args); };
      window._hw = window._hw || queue;
      window._hw("init", {
        debug: false,
        variables: {
          slug: "d-lucca-hair-beauty",
          name: "Flaviano D Lucca Hair & Beauty",
          images: [24],
          customLogo: "",
          defaultPurchaseAmount: 1000,
          customImage: "",
          imageCategory: "other",
          language: locale === "pt" ? "pt" : locale === "es" ? "es" : "en",
        },
        styles: {
          primaryColor: ink,
          secondaryColor: linen,
          fontFamily: "Arial",
          headerFontFamily: "Georgia",
        },
      }, ["hero", "calculator", "howitworks", "faq"]);
      const existing = document.getElementById("_hw");
      if (existing) { setState("ready"); return; }
      const script = document.createElement("script");
      script.id = "_hw";
      script.src = "https://files.withcherry.com/widgets/widget.js";
      script.async = true;
      script.onload = () => window.setTimeout(() => setState("ready"), 800);
      script.onerror = () => setState("error");
      document.head.appendChild(script);
    }, { rootMargin: "300px" });
    observer.observe(root);
    return () => observer.disconnect();
  }, [state, locale]);

  return (
    <div ref={ref} className="cherry-frame" data-state={state}>
      {state === "idle" || state === "loading" ? <div className="cherry-skeleton"><div><span className="label" role="status">{copy.connecting}</span><p className="heading">{copy.opening}</p><p>{copy.explainer}</p><a className="inline-link label" href={CHERRY_URL} target="_blank" rel="noopener noreferrer">{openLabel}</a></div></div> : null}
      <div id="all" className="cherry-widget-output"><div id="hero" /><div id="calculator" /><div id="howitworks" /><div id="faq" /></div>
      {state === "error" ? <p className="status-message">{copy.errorBefore} <a className="inline-link" href={CHERRY_URL} target="_blank" rel="noopener noreferrer">{copy.errorAfter}</a>.</p> : null}
    </div>
  );
}
