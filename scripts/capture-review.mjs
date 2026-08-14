import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const round = process.argv[2] ?? "round1";
const output = path.resolve(".impeccable/review", round);
const routes = [
  ["home", "/"],
  ["story", "/story"],
  ["hair", "/hair"],
  ["aesthetics", "/aesthetics"],
  ["weddings", "/weddings"],
  ["gallery", "/gallery"],
  ["financing", "/financing"],
  ["contact", "/contact"],
];

await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const viewports = [
  ["desktop", { width: 1440, height: 1000, deviceScaleFactor: 1 }],
  ["mobile", { width: 390, height: 844, deviceScaleFactor: 1 }],
];

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [name, route] of routes) {
    await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      const step = Math.max(window.innerHeight * 0.8, 500);
      for (let position = 0; position < document.documentElement.scrollHeight; position += step) {
        window.scrollTo(0, position);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(output, `${viewportName}-${name}.png`), fullPage: true });
  }
  await context.close();
}

await browser.close();
console.log(`Captured ${routes.length * viewports.length} screenshots in ${output}`);
