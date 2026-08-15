import { ResponsiveImage } from "@/components/ui/responsive-image";

export function Figure({
  image,
  alt,
  caption,
  sizes,
  priority = false,
  className = "",
  imageClassName = "",
}: {
  image: string;
  alt: string;
  caption?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <figure className={className}>
      <div className="media-frame" data-hover="true">
        <ResponsiveImage
          image={image}
          alt={alt}
          sizes={sizes}
          priority={priority}
          imageClassName={imageClassName}
        />
      </div>
      {caption ? <figcaption className="figure-caption label">{caption}</figcaption> : null}
    </figure>
  );
}
