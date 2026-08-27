import Image from "next/image";

type BrandWordmarkProps = {
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "adaptive" | "ink" | "white";
};

const dimensions = { width: 1200, height: 420 };

export function BrandWordmark({
  alt = "",
  className = "",
  priority = false,
  sizes = "12rem",
  tone = "adaptive",
}: BrandWordmarkProps) {
  const classes = ["brand-wordmark", `brand-wordmark--${tone}`, className].filter(Boolean).join(" ");

  if (tone !== "adaptive") {
    return (
      <span className={classes}>
        <Image
          src={`/brand/wordmark-${tone}.png`}
          alt={alt}
          {...dimensions}
          priority={priority}
          sizes={sizes}
        />
      </span>
    );
  }

  return (
    <span className={classes}>
      <Image
        className="brand-wordmark__ink"
        src="/brand/wordmark-ink.png"
        alt={alt}
        {...dimensions}
        priority={priority}
        sizes={sizes}
      />
      <Image
        className="brand-wordmark__white"
        src="/brand/wordmark-white.png"
        alt=""
        aria-hidden="true"
        {...dimensions}
        priority={priority}
        sizes={sizes}
      />
    </span>
  );
}
