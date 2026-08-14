export type Price =
  | { kind: "fixed"; cents: number }
  | { kind: "variable" }
  | { kind: "perUnit"; cents: number; unit: string }
  | { kind: "tiers"; tiers: Array<{ label: string; cents: number }> };

export type ServiceCategory =
  | "consultation"
  | "color"
  | "treatment"
  | "cuts"
  | "styling"
  | "extensions"
  | "injectables"
  | "devices"
  | "facials"
  | "brows";

export interface Service {
  id: string;
  sourceName: string;
  displayName: string;
  provider: "flaviano" | "dani" | "clinical" | "esthetician";
  category: ServiceCategory;
  price: Price;
  durationMinutes: number;
  description?: string;
  details?: string[];
}

export type GalleryCategory =
  | "blonde-balayage"
  | "color"
  | "styling-makeup"
  | "bridal"
  | "aesthetics";

export interface GalleryItem {
  id: string;
  image: string;
  category: GalleryCategory;
  caption: string;
  alt: string;
  size: "portrait" | "wide" | "feature";
}

export interface ImageVariant {
  src: string;
  width: number;
  height: number;
}

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  formats: {
    avif: ImageVariant[];
    webp: ImageVariant[];
  };
}

export type FormState = "idle" | "submitting" | "success" | "error";
