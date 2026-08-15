import { ADDRESS, MAP_EMBED_URL, MAPS_URL, EXTERNAL_PROPS } from "@/lib/constants";

export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`map-frame ${className}`.trim()}>
      <iframe
        title="Map showing D'Lucca Hair & Beauty at 904 N California Avenue in Chicago"
        src={MAP_EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="map-fallback">
        <address>{ADDRESS}</address>
        <a className="inline-link label" href={MAPS_URL} {...EXTERNAL_PROPS}>Get directions</a>
      </div>
    </div>
  );
}
