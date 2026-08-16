import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:8080/";
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const errors = [];
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto(url, { waitUntil: "networkidle" });
await page.screenshot({ path: "/workspace/screenshots/m-home.png", fullPage: false });

await page.getByRole("link", { name: "Health at home" }).first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/m-category.png" });

await page.getByRole("link", { name: /Nurse visit, 90/ }).first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/m-product.png" });

await page.getByRole("button", { name: "Book this" }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/m-checkout.png" });

await page.getByRole("button", { name: "Pay and confirm" }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/m-track.png" });

await page.goto(url + "plans", { waitUntil: "networkidle" });
await page.screenshot({ path: "/workspace/screenshots/m-plans.png" });

await page.goto(url + "shop/mitra", { waitUntil: "networkidle" });
await page.screenshot({ path: "/workspace/screenshots/m-shop.png" });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("pageerror", (e) => errors.push("m:" + e));
await mobile.goto(url, { waitUntil: "networkidle" });
await mobile.screenshot({ path: "/workspace/screenshots/m-mobile.png" });

console.log(JSON.stringify({ errors, title: await page.title() }, null, 2));
await browser.close();
