import { describe, expect, it } from "vitest";
import { getCommon } from "@/i18n/common";
import { localeDetails, locales, pageFromSlug, pageIds, routeFor, routes } from "@/i18n/config";
import { getPages } from "@/i18n/pages";

describe("localized public routes", () => {
  it("defines every public page in every supported language", () => {
    for (const locale of locales) {
      expect(Object.keys(routes[locale]).sort()).toEqual([...pageIds].sort());
      expect(pageIds.every((page) => Boolean(getPages(locale)[page]))).toBe(true);
      expect(getCommon(locale).actions.language).toBeTruthy();
    }
  });

  it("uses English at the root and translated slugs for Portuguese and Spanish", () => {
    expect(routeFor("en", "home")).toBe("/");
    expect(routeFor("pt", "hair")).toBe("/pt/cabelo");
    expect(routeFor("es", "weddings")).toBe("/es/bodas");
    expect(pageFromSlug("pt", "financiamento")).toBe("financing");
    expect(pageFromSlug("es", "contacto")).toBe("contact");
    expect(pageFromSlug("es", "weddings")).toBeNull();
    expect(localeDetails.es.flagSrc).toBe("/flags/es.svg");
  });
});
