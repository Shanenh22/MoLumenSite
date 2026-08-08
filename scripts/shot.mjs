/**
 * Screenshots pages from dist/ at desktop and mobile widths, so a layout
 * complaint can be looked at rather than guessed at.
 * Usage: node scripts/shot.mjs /book/ /testimonials/
 */
import { chromiumPath } from "./lib/chromium-path.mjs";
import { mkdirSync } from "node:fs";
import { startDistServer } from "./lib/dist-server.mjs";

async function requireTool(name) {
  try {
    return await import(name);
  } catch {
    console.error(
      `\n[shot] "${name}" not installed. Run: npm run audit:install\n`,
    );
    process.exit(1);
  }
}
const { chromium } = await requireTool("playwright");

const PORT = 4404;
const server = await startDistServer(PORT);

const pages = process.argv.slice(2);
if (!pages.length) pages.push("/");
mkdirSync("shots", { recursive: true });

const browser = await chromium.launch({
  executablePath: chromiumPath(),
});
for (const vp of [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 900 },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(`http://localhost:${PORT}${p}`, { waitUntil: "load" });
    await page.waitForTimeout(400);
    const slug = p.replace(/\//g, "_").replace(/^_|_$/g, "") || "home";
    const out = `shots/${slug}-${vp.name}.png`;
    await page.screenshot({ path: out, fullPage: true });
    const h = await page.evaluate(() => document.body.scrollHeight);
    console.log(`${out}  (${vp.width}x${h})`);
  }
  await ctx.close();
}
await browser.close();
server.close();
