import { describe, expect, it } from "vitest";
import { aestheticsServices, daniServices, flavianoServices, formatDuration, formatPrice } from "@/data/services";

describe("service catalog", () => {
  it("keeps live Square anchor prices", () => {
    expect(flavianoServices.find((service) => service.displayName === "Balayage — Long")?.price).toEqual({ kind: "fixed", cents: 50000 });
    expect(aestheticsServices.find((service) => service.displayName === "Upper-Face Toxin")?.price).toEqual({ kind: "fixed", cents: 50000 });
  });

  it("publishes the supported providers", () => {
    expect(flavianoServices.length).toBeGreaterThan(20);
    expect(daniServices.length).toBe(7);
    expect(aestheticsServices.length).toBeGreaterThan(20);
  });

  it("formats price and time data for the printed menu", () => {
    expect(formatPrice({ kind: "fixed", cents: 49999 })).toBe("$499.99");
    expect(formatPrice({ kind: "perUnit", cents: 1000, unit: "unit" })).toBe("$10 / unit");
    expect(formatDuration(270)).toBe("4h 30m");
  });
});
