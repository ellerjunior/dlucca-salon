import { chromium } from "@playwright/test";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const route = process.argv[2] ?? "/";
await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: "networkidle" });
if (route === "/financing") {
  await page.locator(".cherry-frame").scrollIntoViewIfNeeded();
  await page.waitForTimeout(6000);
  await page.locator(".cherry-frame").screenshot({ path: ".impeccable/review/round2/desktop-financing-widget.png" });
}
const result = await page.evaluate(() => {
  const viewport = document.documentElement.clientWidth;
  const offenders = [...document.querySelectorAll("body *")]
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        element: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className : "",
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      };
    })
    .filter(({ left, right, width }) => width > 0 && (left < -1 || right > viewport + 1))
    .sort((a, b) => Math.max(b.right - viewport, -b.left) - Math.max(a.right - viewport, -a.left))
    .slice(0, 20);

  return {
    viewport,
    scrollWidth: document.documentElement.scrollWidth,
    cherry: document.querySelector(".cherry-frame") instanceof HTMLElement ? {
      state: document.querySelector(".cherry-frame")?.dataset.state,
      height: Math.round(document.querySelector(".cherry-frame")?.getBoundingClientRect().height ?? 0),
    } : null,
    offenders,
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
