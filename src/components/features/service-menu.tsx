"use client";

import { useEffect, useState } from "react";
import { ServiceRow } from "@/components/ui/service-row";
import { getCommon } from "@/i18n/common";
import type { Locale } from "@/i18n/config";
import type { Service, ServiceCategory } from "@/types";

const categories: ServiceCategory[] = ["consultation", "color", "treatment", "cuts", "styling", "extensions"];

function ProviderMenu({ id, title, services, locale }: { id: string; title: string; services: Service[]; locale: Locale }) {
  const labels = getCommon(locale).service.categories;
  const available = categories.filter((category) => services.some((service) => service.category === category));
  return <section id={id} className="service-provider"><div className="service-provider__title"><h2 className="display-l">{title}</h2></div>{available.map((category) => <section className="service-category" id={`${id}-${category}`} data-menu-section={category} key={category}><h3 className="service-category__title label">{labels[category as keyof typeof labels]}</h3>{services.filter((service) => service.category === category).map((item) => <ServiceRow key={item.id} service={item} locale={locale} />)}</section>)}</section>;
}

export function ServiceMenu({ flaviano, dani, locale }: { flaviano: Service[]; dani: Service[]; locale: Locale }) {
  const [active, setActive] = useState<ServiceCategory>("consultation");
  const copy = getCommon(locale).service;
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-menu-section]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive((visible.target as HTMLElement).dataset.menuSection as ServiceCategory);
    }, { rootMargin: "-30% 0px -55%", threshold: [0.05, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <div className="service-menu-layout"><nav className="service-menu-nav" aria-label={copy.categoryNavigation}>{categories.map((category) => <a key={category} href={`#flaviano-${category}`} className="label" data-active={active === category}>{copy.categories[category as keyof typeof copy.categories]}</a>)}</nav><div><ProviderMenu id="flaviano" title={copy.flaviano} services={flaviano} locale={locale} /><ProviderMenu id="dani" title={copy.dani} services={dani} locale={locale} /></div></div>;
}
