import { ADDRESS, MAP_EMBED_URL, MAPS_URL, EXTERNAL_PROPS } from "@/lib/constants";
import type { CommonDictionary } from "@/i18n/common";

export function MapEmbed({ copy, className = "" }: { copy: Pick<CommonDictionary, "map" | "actions">; className?: string }) {
  return (
    <div className={`map-frame ${className}`.trim()}>
      <iframe
        title={copy.map.title}
        src={MAP_EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="map-fallback">
        <address>{ADDRESS}</address>
        <a className="inline-link label" href={MAPS_URL} {...EXTERNAL_PROPS}>{copy.actions.getDirections}</a>
      </div>
    </div>
  );
}
