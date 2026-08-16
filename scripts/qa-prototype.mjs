import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:8080/";
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await page.goto(url, { waitUntil: "networkidle" });
await page.screenshot({ path: "/workspace/screenshots/01-family-welcome.png", fullPage: true });

await page.getByRole("button", { name: "Get started" }).click();
await page.getByRole("button", { name: /For my parents/i }).click();
await page.getByRole("button", { name: "Save and continue" }).click();
await page.screenshot({ path: "/workspace/screenshots/02-family-home.png" });

await page.getByRole("button", { name: "Empty" }).click();
await page.screenshot({ path: "/workspace/screenshots/03-family-empty.png" });
await page.getByRole("button", { name: "Loading" }).click();
await page.screenshot({ path: "/workspace/screenshots/04-family-loading.png" });
await page.getByRole("button", { name: "Errors" }).click();
await page.screenshot({ path: "/workspace/screenshots/05-family-error.png" });
await page.getByRole("button", { name: "Happy path" }).click();

await page.getByRole("button", { name: "Provider" }).click();
await page.screenshot({ path: "/workspace/screenshots/06-provider-jobs.png" });
await page.getByRole("button", { name: "View" }).click();
await page.getByRole("button", { name: "Accept job" }).click();
await page.screenshot({ path: "/workspace/screenshots/07-provider-active.png" });

await page.getByRole("button", { name: "Admin" }).click();
await page.screenshot({ path: "/workspace/screenshots/08-admin-dash.png" });
await page.getByRole("button", { name: "Quote queue", exact: true }).click();
await page.getByRole("button", { name: "Quote" }).first().click();
await page.screenshot({ path: "/workspace/screenshots/09-admin-quote.png" });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(url, { waitUntil: "networkidle" });
await mobile.screenshot({ path: "/workspace/screenshots/10-mobile.png" });

console.log(JSON.stringify({ errors, title: await page.title() }, null, 2));
await browser.close();
