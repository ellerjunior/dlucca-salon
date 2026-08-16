"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageSelector } from "@/components/site/language-selector";
import { getCommon } from "@/i18n/common";
import { pageIds, routeFor, routes, type Locale, type PageId } from "@/i18n/config";
import { BOOKING_URL, EXTERNAL_PROPS, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

const navPages: Array<Exclude<PageId, "home">> = ["story", "hair", "aesthetics", "weddings", "gallery", "financing", "contact"];
const darkAtTop = new Set<PageId>(["home", "hair", "weddings", "contact"]);

function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

export function Navigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const common = getCommon(locale);
  const currentPage = pageIds.find((page) => normalize(routes[locale][page]) === normalize(pathname)) ?? "home";
  const isDark = darkAtTop.has(currentPage);
  const [solid, setSolid] = useState(!isDark);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(!isDark || window.scrollY > window.innerHeight * 0.82);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDark, pathname]);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const panel = document.querySelector<HTMLElement>(".mobile-menu");
      const focusable = panel?.querySelectorAll<HTMLElement>('a, button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const active = (page: PageId) => currentPage === page;
  const close = () => setOpen(false);

  return (
    <>
      <header className="site-nav" data-dark={isDark} data-solid={solid}>
        <div className="site-container site-nav__inner desktop-nav">
          <nav className="site-nav__group" aria-label={`${common.actions.primaryNavigation}, 1`}>
            {navPages.slice(0, 4).map((page) => <Link key={page} href={routeFor(locale, page)} className="site-nav__link" aria-current={active(page) ? "page" : undefined}>{common.nav[page]}</Link>)}
          </nav>
          <Link href={routeFor(locale, "home")} className="site-nav__logo" aria-label={common.actions.home}><Image src="/logo.svg" alt="" width={1040} height={300} /></Link>
          <nav className="site-nav__group" aria-label={`${common.actions.primaryNavigation}, 2`}>
            {navPages.slice(4).map((page) => <Link key={page} href={routeFor(locale, page)} className="site-nav__link" aria-current={active(page) ? "page" : undefined}>{common.nav[page]}</Link>)}
            <LanguageSelector locale={locale} page={currentPage} label={common.actions.chooseLanguage} />
            <a href={BOOKING_URL} className="button button-ghost site-nav__book" {...EXTERNAL_PROPS}>{common.actions.book}</a>
          </nav>
        </div>

        <div className="site-container mobile-nav">
          <Link href={routeFor(locale, "home")} className="site-nav__logo" aria-label={common.actions.home}><Image src="/logo.svg" alt="" width={1040} height={300} /></Link>
          <LanguageSelector locale={locale} page={currentPage} label={common.actions.chooseLanguage} className="mobile-nav__language" />
          <button ref={triggerRef} type="button" className="mobile-nav__toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><span className="visually-hidden">{common.actions.openMenu}</span><span /><span /></button>
        </div>
      </header>

      <div id="mobile-menu" className="mobile-menu" data-open={open} aria-hidden={!open}>
        <div className="mobile-menu__top">
          <Image src="/logo.svg" alt="D'Lucca" width={1040} height={300} />
          <button ref={closeRef} type="button" className="mobile-menu__close" onClick={close}><span className="visually-hidden">{common.actions.closeMenu}</span></button>
        </div>
        <nav aria-label={common.actions.mobileNavigation}>
          <ul className="mobile-menu__links">
            {navPages.map((page, index) => <li key={page} style={{ transitionDelay: `${index * 60}ms` }}><Link href={routeFor(locale, page)} onClick={close} aria-current={active(page) ? "page" : undefined}>{common.nav[page]}</Link></li>)}
          </ul>
        </nav>
        <div className="mobile-menu__bottom">
          <div className="mobile-menu__meta label"><a href={PHONE_HREF}>{PHONE_DISPLAY}</a><a href={INSTAGRAM_URL} {...EXTERNAL_PROPS}>Instagram</a></div>
          <a href={BOOKING_URL} className="button button-on-dark" {...EXTERNAL_PROPS}>{common.actions.bookAppointment}</a>
        </div>
      </div>
    </>
  );
}
