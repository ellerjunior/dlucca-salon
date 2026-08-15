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
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Payment Plans" })).toBeVisible();
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

test("desktop navigation uses Payment Plans and keeps Book legible on hover", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop project only");

  for (const route of ["/", "/aesthetics"]) {
    await page.goto(route);
    const navigation = page.locator(".desktop-nav");
    await expect(navigation.getByRole("link", { name: "Payment Plans" })).toBeVisible();

    const book = navigation.getByRole("link", { name: "Book", exact: true });
    await book.hover();
    await page.waitForTimeout(450);
    const styles = await book.evaluate((element) => ({
      color: getComputedStyle(element).color,
      fill: getComputedStyle(element, "::before").backgroundColor,
      transform: getComputedStyle(element, "::before").transform,
    }));
    expect(styles.color).toBe("rgb(14, 13, 12)");
    expect(styles.fill).toBe("rgb(255, 255, 255)");
    expect(styles.transform).toBe("matrix(1, 0, 0, 1, 0, 0)");
  }
});

test("three home door photographs align on a 13-inch laptop viewport", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop project only");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const bottoms = await page.locator(".home-door__image").evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().bottom),
  );
  expect(bottoms).toHaveLength(3);
  expect(Math.max(...bottoms) - Math.min(...bottoms)).toBeLessThanOrEqual(1);
});

for (const route of ["/", "/weddings"]) {
  test(`${route} filmstrip advances with accessible arrow controls`, async ({ page }) => {
    await page.goto(route);
    const strip = page.locator(".filmstrip");
    const previous = page.getByRole("button", { name: "Previous image" });
    const next = page.getByRole("button", { name: "Next image" });

    await expect(previous).toBeDisabled();
    await expect(next).toBeEnabled();
    const before = await strip.evaluate((element) => element.scrollLeft);
    await next.click();
    await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).toBeGreaterThan(before);
    await expect(previous).toBeEnabled();
  });
}

test("service menus keep category rules and dotted leaders without row separators", async ({ page }) => {
  await page.goto("/hair");
  await expect(page.locator(".service-provider__title .section-header__line")).toHaveCount(0);
  await expect(page.locator(".service-row").first()).toHaveCSS("border-bottom-width", "0px");
  await expect(page.locator(".service-row__leader").first()).toHaveCSS("border-bottom-style", "dotted");
  expect(await page.locator(".service-category__title").first().evaluate((element) => getComputedStyle(element, "::after").height)).not.toBe("0px");

  await page.goto("/aesthetics");
  await expect(page.locator(".treatment-group__header .section-header__line")).toHaveCount(4);
  await expect(page.locator(".service-row").first()).toHaveCSS("border-bottom-width", "0px");
  await expect(page.locator(".treatment-group .disclosure").first()).toHaveCSS("border-bottom-width", "0px");
  await expect(page.locator(".service-row__leader").first()).toHaveCSS("border-bottom-style", "dotted");
});

test("media frames are rectangular and maps omit the decorative marker", async ({ page }) => {
  for (const route of ["/", "/story", "/aesthetics", "/contact"]) {
    await page.goto(route);
    await expect(page.locator(".arch")).toHaveCount(0);
    await expect(page.locator(".map-marker")).toHaveCount(0);
  }
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
