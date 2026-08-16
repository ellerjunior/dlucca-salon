import { formatDuration, formatPrice } from "@/data/services";
import { getCommon } from "@/i18n/common";
import type { Locale } from "@/i18n/config";
import type { Service } from "@/types";

export function ServiceRow({ service, locale = "en" }: { service: Service; locale?: Locale }) {
  const labels = getCommon(locale).service;
  return (
    <div className="service-row">
      <div className="service-row__main">
        <span className="service-row__name">{service.displayName}</span>
        <span className="service-row__leader" aria-hidden="true" />
        <span className="service-row__price label">{formatPrice(service.price, locale)}</span>
        <span className="service-row__duration label">{formatDuration(service.durationMinutes, locale)}</span>
      </div>
      {service.price.kind === "tiers" ? (
        <div className="service-row__tiers" aria-label={`${service.displayName} ${labels.priceTiers}`}>
          {service.price.tiers.map((tier) => (
            <div className="service-tier" key={tier.label}>
              <span>{tier.label === "Short" ? labels.short : tier.label === "Medium" ? labels.medium : tier.label === "Long" ? labels.long : tier.label}</span>
              <span className="service-tier__rule" aria-hidden="true" />
              <span className="label">{formatPrice({ kind: "fixed", cents: tier.cents }, locale)}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
