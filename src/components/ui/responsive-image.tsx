import Image from "next/image";
import manifestData from "@/data/image-manifest.json";
import type { ImageAsset } from "@/types";

const manifest = manifestData as Record<string, ImageAsset>;

export function ResponsiveImage({
  image,
  alt,
  sizes,
  priority = false,
  fill = false,
  className = "",
  imageClassName = "",
}: {
  image: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  const asset = manifest[image];
  if (!asset) throw new Error(`Unknown image asset: ${image}`);
  const avif = asset.formats.avif.map((item) => `${item.src} ${item.width}w`).join(", ");
  const webp = asset.formats.webp.map((item) => `${item.src} ${item.width}w`).join(", ");

  return (
    <>
      {priority ? <link rel="preload" as="image" type="image/avif" imageSrcSet={avif} imageSizes={sizes} fetchPriority="high" /> : null}
      <picture className={className}>
        <source type="image/avif" srcSet={avif} sizes={sizes} />
        <source type="image/webp" srcSet={webp} sizes={sizes} />
        {fill ? (
          <Image
            src={asset.src}
            alt={alt}
            fill
            sizes={sizes}
            loading={priority ? "eager" : undefined}
            fetchPriority={priority ? "high" : "low"}
            placeholder="blur"
            blurDataURL={asset.blurDataURL}
            className={imageClassName}
          />
        ) : (
          <Image
            src={asset.src}
            alt={alt}
            width={asset.width}
            height={asset.height}
            sizes={sizes}
            loading={priority ? "eager" : undefined}
            fetchPriority={priority ? "high" : "low"}
            placeholder="blur"
            blurDataURL={asset.blurDataURL}
            className={imageClassName}
          />
        )}
      </picture>
    </>
  );
}
