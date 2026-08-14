import { chromium } from "@playwright/test";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const messages = [];
page.on("console", (message) => {
  if (["warning", "error"].includes(message.type())) messages.push(`${message.type()}: ${message.text()}`);
});
page.on("pageerror", (error) => messages.push(`pageerror: ${error.message}`));
await page.goto("http://127.0.0.1:3000/gallery", { waitUntil: "networkidle" });
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(1000);
console.log(messages.length ? messages.join("\n") : "No browser warnings or errors.");
await browser.close();
