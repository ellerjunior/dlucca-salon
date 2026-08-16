export const locales = ["en", "pt", "es"] as const;

export type Locale = (typeof locales)[number];

export const localizedLocales = ["pt", "es"] as const;
export type LocalizedLocale = (typeof localizedLocales)[number];

export const pageIds = ["home", "story", "hair", "aesthetics", "weddings", "gallery", "financing", "contact"] as const;
export type PageId = (typeof pageIds)[number];

export const localeDetails: Record<Locale, { html: string; label: string; short: string; flagSrc: string; openGraph: string }> = {
  en: { html: "en-US", label: "English", short: "EN", flagSrc: "/flags/us.svg", openGraph: "en_US" },
  pt: { html: "pt-BR", label: "Português", short: "PT", flagSrc: "/flags/br.svg", openGraph: "pt_BR" },
  es: { html: "es-US", label: "Español", short: "ES", flagSrc: "/flags/es.svg", openGraph: "es_US" },
};

export const routes: Record<Locale, Record<PageId, string>> = {
  en: {
    home: "/",
    story: "/story",
    hair: "/hair",
    aesthetics: "/aesthetics",
    weddings: "/weddings",
    gallery: "/gallery",
    financing: "/financing",
    contact: "/contact",
  },
  pt: {
    home: "/pt",
    story: "/pt/historia",
    hair: "/pt/cabelo",
    aesthetics: "/pt/estetica",
    weddings: "/pt/casamentos",
    gallery: "/pt/galeria",
    financing: "/pt/financiamento",
    contact: "/pt/contato",
  },
  es: {
    home: "/es",
    story: "/es/historia",
    hair: "/es/cabello",
    aesthetics: "/es/estetica",
    weddings: "/es/bodas",
    gallery: "/es/galeria",
    financing: "/es/financiamiento",
    contact: "/es/contacto",
  },
};

export const slugs: Record<LocalizedLocale, Record<Exclude<PageId, "home">, string>> = {
  pt: { story: "historia", hair: "cabelo", aesthetics: "estetica", weddings: "casamentos", gallery: "galeria", financing: "financiamento", contact: "contato" },
  es: { story: "historia", hair: "cabello", aesthetics: "estetica", weddings: "bodas", gallery: "galeria", financing: "financiamiento", contact: "contacto" },
};

export function isLocalizedLocale(value: string): value is LocalizedLocale {
  return localizedLocales.includes(value as LocalizedLocale);
}

export function pageFromSlug(locale: LocalizedLocale, slug: string): Exclude<PageId, "home"> | null {
  const entry = Object.entries(slugs[locale]).find(([, value]) => value === slug);
  return (entry?.[0] as Exclude<PageId, "home"> | undefined) ?? null;
}

export function routeFor(locale: Locale, page: PageId): string {
  return routes[locale][page];
}

export function pageFromEnglishHref(href: string): PageId | null {
  const normalized = href.length > 1 ? href.replace(/\/$/, "") : href;
  const entry = Object.entries(routes.en).find(([, path]) => path === normalized);
  return (entry?.[0] as PageId | undefined) ?? null;
}

export function localizeHref(locale: Locale, href: string): string {
  const page = pageFromEnglishHref(href);
  return page ? routeFor(locale, page) : href;
}
