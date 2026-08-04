/** Measures hero height and h1 size across page types, at desktop and mobile. */
import http from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join } from "node:path";

const { chromium } = await import("playwright");
const PORT = 4407;
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};
const server = http.createServer((req, res) => {
  let f = join("dist", decodeURIComponent(req.url.split("?")[0]));
  try {
    if (statSync(f).isDirectory()) f = join(f, "index.html");
  } catch {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, {
    "Content-Type": MIME[extname(f)] || "application/octet-stream",
  });
  createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const PAGES = [
  "/",
  "/book/",
  "/readings/",
  "/readings/natal/",
  "/readings/gift/",
  "/explore/",
  "/explore/signs/aries/",
  "/explore/signs/",
  "/explore/dignities/",
  "/current-sky/",
  "/current-sky/the-sky-in-2026/",
  "/current-sky/archive/",
  "/blog/",
  "/blog/what-is-a-transit/",
  "/about/",
  "/approach/",
  "/credentials/",
  "/testimonials/",
  "/contact/",
  "/newsletter/",
  "/videos/",
  "/start-here/",
  "/how-readings-work/",
  "/prepare-for-your-reading/",
  "/reading-finder/",
  "/resources/",
  "/courses/",
  "/guides/",
  "/horoscopes/",
  "/privacy/",
];
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});

for (const vp of [
  { n: "desktop", w: 1440, h: 900 },
  { n: "mobile", w: 390, h: 844 },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
  });
  const page = await ctx.newPage();
  console.log(`\n${vp.n} (${vp.w}x${vp.h})`);
  console.log(`  ${"page".padEnd(30)} hero-h   %fold   img-h`);
  for (const p of PAGES) {
    await page.goto(`http://localhost:${PORT}${p}`, { waitUntil: "load" });
    const m = await page.evaluate(() => {
      const hero = document.querySelector(".hero");
      const h1 = document.querySelector("h1");
      const img = document.querySelector(".hero__img, .hero__portrait img");
      return {
        hero: hero ? Math.round(hero.getBoundingClientRect().height) : 0,
        img: img ? Math.round(img.getBoundingClientRect().height) : 0,
        h1: h1 ? getComputedStyle(h1).fontSize : "-",
        body: getComputedStyle(document.body).fontSize,
      };
    });
    const pct = Math.round((m.hero / vp.h) * 100);
    const flag = pct > 70 ? "  <-- over 70% of the fold" : "";
    console.log(
      `  ${p.padEnd(30)} ${String(m.hero).padStart(5)}px  ${String(pct).padStart(4)}%  ${String(m.img).padStart(5)}px${flag}`,
    );
  }
  await ctx.close();
}
await browser.close();
server.close();
