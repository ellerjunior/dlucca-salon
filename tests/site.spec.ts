import { expect, test } from "@playwright/test";

const routes = ["/", "/story", "/hair", "/aesthetics", "/weddings", "/gallery", "/financing", "/contact", "/styleguide"];

for (const route of routes) {
  test(`${route} renders without overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator('a[href*="book.squareup.com"]:visible').first()).toBeVisible();
  });
}

test("mobile navigation opens, traps intent and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile project only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toHaveAttribute("aria-hidden", "true");
});

test("gallery filters and lightbox are keyboard operable", async ({ page }) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: "Bridal", exact: true }).click();
  await expect(page.locator(".gallery-grid__item")).toHaveCount(1);
  await page.locator(".gallery-grid__button").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("aesthetics disclosures report expanded state", async ({ page }) => {
  await page.goto("/aesthetics");
  const trigger = page.getByRole("button", { name: "Treatment details" }).first();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
});

test("home hero preserves its three-line lockup without clipping", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const lines = page.locator(".home-hero__line-mask");
  await expect(lines).toHaveCount(3);

  const measurements = await lines.evaluateAll((elements) => elements.map((element) => {
    const inner = element.firstElementChild as HTMLElement;
    return {
      text: element.textContent?.trim(),
      fits: inner.scrollWidth <= element.clientWidth + 1,
      visualLines: inner.getClientRects().length,
    };
  }));

  expect(measurements.map(({ text }) => text)).toEqual(["Chicago’s", "Brazilian beauty", "destination"]);
  expect(measurements.every(({ fits, visualLines }) => fits && visualLines === 1)).toBe(true);
});

test("map keeps a sighted address and directions fallback", async ({ page }) => {
  await page.goto("/");
  const fallback = page.locator(".map-fallback");
  await expect(fallback).toBeVisible();
  await expect(fallback).toContainText("904 N California Ave");
  await expect(fallback.getByRole("link", { name: "Get directions" })).toBeVisible();
});

test("financing recovers compactly when Cherry is unavailable", async ({ page }) => {
  await page.route("https://files.withcherry.com/**", (route) => route.abort());
  await page.goto("/financing");

  const frame = page.locator(".cherry-frame");
  await frame.scrollIntoViewIfNeeded();
  await expect(frame).toHaveAttribute("data-state", "error");
  await expect(frame.getByRole("link", { name: "Open Cherry directly" })).toBeVisible();

  const height = await frame.evaluate((element) => element.getBoundingClientRect().height);
  expect(height).toBeLessThan(700);
});

test("wedding form never fakes delivery without an endpoint", async ({ page }) => {
  await page.goto("/weddings");
  await page.locator("#name").fill("Sample Client");
  await page.locator("#email").fill("client@example.com");
  await page.locator("#phone").fill("3125550100");
  await page.locator("#eventDate").fill("2027-05-10");
  await page.locator("#eventType").selectOption("bride");
  await page.locator("#partySize").fill("2");
  await page.locator("#location").selectOption("studio");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator(".inquiry-form__status")).toContainText("not connected");
});
