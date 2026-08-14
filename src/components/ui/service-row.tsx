import { formatDuration, formatPrice } from "@/data/services";
import type { Service } from "@/types";

export function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="service-row">
      <div className="service-row__main">
        <span className="service-row__name">{service.displayName}</span>
        <span className="service-row__leader" aria-hidden="true" />
        <span className="service-row__price label">{formatPrice(service.price)}</span>
        <span className="service-row__duration label">{formatDuration(service.durationMinutes)}</span>
      </div>
      {service.price.kind === "tiers" ? (
        <div className="service-row__tiers" aria-label={`${service.displayName} price tiers`}>
          {service.price.tiers.map((tier) => (
            <div className="service-tier" key={tier.label}>
              <span>{tier.label}</span>
              <span className="service-tier__rule" aria-hidden="true" />
              <span className="label">{formatPrice({ kind: "fixed", cents: tier.cents })}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
