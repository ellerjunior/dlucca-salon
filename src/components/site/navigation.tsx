"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BOOKING_URL, EXTERNAL_PROPS, INSTAGRAM_URL, NAV_ITEMS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

const darkAtTop = new Set(["/", "/hair", "/weddings", "/contact"]);

export function Navigation() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(!darkAtTop.has(pathname));
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isDark = darkAtTop.has(pathname);

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
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const active = (href: string) => pathname === href;
  const close = () => setOpen(false);

  return (
    <>
      <header className="site-nav" data-dark={isDark} data-solid={solid}>
        <div className="site-container site-nav__inner desktop-nav">
          <nav className="site-nav__group" aria-label="Primary navigation, first group">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className="site-nav__link" aria-current={active(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="site-nav__logo" aria-label="D'Lucca home">
            <Image src="/logo.svg" alt="" width={1040} height={300} />
          </Link>
          <nav className="site-nav__group" aria-label="Primary navigation, second group">
            {NAV_ITEMS.slice(4).map((item) => (
              <Link key={item.href} href={item.href} className="site-nav__link" aria-current={active(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
            <a href={BOOKING_URL} className="button button-ghost site-nav__book" {...EXTERNAL_PROPS}>Book</a>
          </nav>
        </div>

        <div className="site-container mobile-nav">
          <Link href="/" className="site-nav__logo" aria-label="D'Lucca home">
            <Image src="/logo.svg" alt="" width={1040} height={300} />
          </Link>
          <button ref={triggerRef} type="button" className="mobile-nav__toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
            <span className="visually-hidden">Open menu</span><span /><span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className="mobile-menu" data-open={open} aria-hidden={!open}>
        <div className="mobile-menu__top">
          <Image src="/logo.svg" alt="D'Lucca" width={1040} height={300} />
          <button ref={closeRef} type="button" className="mobile-menu__close" onClick={close}>
            <span className="visually-hidden">Close menu</span>
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <ul className="mobile-menu__links">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href} style={{ transitionDelay: `${index * 60}ms` }}>
                <Link href={item.href} onClick={close} aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__bottom">
          <div className="mobile-menu__meta label">
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            <a href={INSTAGRAM_URL} {...EXTERNAL_PROPS}>Instagram</a>
          </div>
          <a href={BOOKING_URL} className="button button-on-dark" {...EXTERNAL_PROPS}>Book an appointment</a>
        </div>
      </div>
    </>
  );
}
