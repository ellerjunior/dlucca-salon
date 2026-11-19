"use client";

import { useEffect } from "react";

/** Faz a assinatura do rodapé se escrever ao entrar na tela (CSS em globals.css). */
export function SignatureWrite() {
  useEffect(() => {
    const els = document.querySelectorAll(".signature");
    if (!els.length || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Observa o pai (sem recorte): o IntersectionObserver não dispara em alvo com clip-path total.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement & { _sig: Element })._sig.classList.add("is-written");
          io.unobserve(e.target);
        }
      },
      { threshold: 0 },
    );
    els.forEach((el) => {
      const watch = (el.parentElement ?? el) as HTMLElement & { _sig: Element };
      watch._sig = el;
      el.classList.add("sig-armed");
      io.observe(watch);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
