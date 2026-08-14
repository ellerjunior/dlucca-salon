"use client";

import { useEffect, useState } from "react";
import { ServiceRow } from "@/components/ui/service-row";
import type { Service, ServiceCategory } from "@/types";

const labels: Partial<Record<ServiceCategory, string>> = {
  consultation: "Consultation",
  color: "Color",
  treatment: "Treatment",
  cuts: "Cuts",
  styling: "Styling & Makeup",
  extensions: "Extensions & More",
};

const categories: ServiceCategory[] = ["consultation", "color", "treatment", "cuts", "styling", "extensions"];

function ProviderMenu({ id, title, services }: { id: string; title: string; services: Service[] }) {
  const available = categories.filter((category) => services.some((service) => service.category === category));
  return (
    <section id={id} className="service-provider">
      <div className="service-provider__title section-header">
        <h2 className="display-l">{title}</h2>
        <span className="section-header__line" aria-hidden="true" />
      </div>
      {available.map((category) => (
        <section className="service-category" id={`${id}-${category}`} data-menu-section={category} key={category}>
          <h3 className="service-category__title label">{labels[category]}</h3>
          {services.filter((service) => service.category === category).map((item) => <ServiceRow key={item.id} service={item} />)}
        </section>
      ))}
    </section>
  );
}

export function ServiceMenu({ flaviano, dani }: { flaviano: Service[]; dani: Service[] }) {
  const [active, setActive] = useState<ServiceCategory>("consultation");

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-menu-section]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive((visible.target as HTMLElement).dataset.menuSection as ServiceCategory);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="service-menu-layout">
      <nav className="service-menu-nav" aria-label="Service categories">
        {categories.map((category) => (
          <a key={category} href={`#flaviano-${category}`} className="label" data-active={active === category}>
            {labels[category]}
          </a>
        ))}
      </nav>
      <div>
        <ProviderMenu id="flaviano" title="By Flaviano — Master Stylist" services={flaviano} />
        <ProviderMenu id="dani" title="By Dani — Stylist" services={dani} />
      </div>
    </div>
  );
}
