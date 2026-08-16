import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "@/lib/constants";

describe("share-card site URL", () => {
  it("prefers the explicitly configured public domain", () => {
    expect(resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "https://www.dluccasalon.com/",
      VERCEL_ENV: "preview",
      VERCEL_URL: "dlucca-preview.vercel.app",
    })).toBe("https://www.dluccasalon.com");
  });

  it("uses the current Vercel URL for preview deployments", () => {
    expect(resolveSiteUrl({
      VERCEL_ENV: "preview",
      VERCEL_URL: "dlucca-git-main-ellerjunior.vercel.app",
      VERCEL_PROJECT_PRODUCTION_URL: "dlucca-salon.vercel.app",
    })).toBe("https://dlucca-git-main-ellerjunior.vercel.app");
  });

  it("uses the stable Vercel project URL in production", () => {
    expect(resolveSiteUrl({
      VERCEL_ENV: "production",
      VERCEL_URL: "dlucca-abc123.vercel.app",
      VERCEL_PROJECT_PRODUCTION_URL: "dlucca-salon.vercel.app",
    })).toBe("https://dlucca-salon.vercel.app");
  });

  it("falls back to the salon domain outside Vercel", () => {
    expect(resolveSiteUrl({})).toBe("https://www.dluccasalon.com");
  });
});
