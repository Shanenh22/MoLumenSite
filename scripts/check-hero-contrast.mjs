/**
 * Contrast for text sitting ON a photograph.
 *
 * scripts/check-contrast.mjs composites CSS background colours, which cannot
 * see through an <img>. This screenshots the hero, samples every pixel in the
 * band actually occupied by the h1 and lede, and computes the WORST-CASE ratio
 * against the rendered text colour — so a bright patch of sky behind one word
 * cannot hide behind an average.
 */
import http from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join } from "node:path";
import { PNG } from "pngjs";

const { chromium } = await import("playwright");
const PORT = 4409;
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
  "/current-sky/",
  "/readings/natal/",
  "/about/",
  "/blog/",
  "/explore/",
  "/book/",
  "/credentials/",
  "/approach/",
  "/videos/",
  "/contact/",
];
const lum = ([r, g, b]) => {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const L1 = lum(a),
    L2 = lum(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
};

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});
let fails = 0;
for (const vp of [
  { n: "desktop", w: 1440, h: 900 },
  { n: "mobile", w: 390, h: 844 },
]) {
  const page = await browser.newPage({
    viewport: { width: vp.w, height: vp.h },
  });
  console.log(`\n${vp.n}`);
  for (const p of PAGES) {
    await page.goto(`http://localhost:${PORT}${p}`, { waitUntil: "load" });
    const info = await page.evaluate(() => {
      const hero = document.querySelector(".hero--split");
      if (!hero) return null;
      const els = [...hero.querySelectorAll("h1, .lede")];
      if (!els.length) return null;
      const boxes = els.map((e) => {
        const b = e.getBoundingClientRect();
        return { x: b.x, y: b.y, w: b.width, h: b.height };
      });
      const col = getComputedStyle(els[0])
        .color.match(/[\d.]+/g)
        .map(Number);
      return { boxes, fg: [col[0], col[1], col[2]] };
    });
    if (!info) {
      console.log(`  ${p.padEnd(24)} no hero--split`);
      continue;
    }
    // Hide the text so we sample the background it sits on, not the glyphs.
    await page.evaluate(() => {
      const hero = document.querySelector(".hero--split");
      hero
        .querySelectorAll("h1, .lede, .eyebrow, .hero__meta, .hero__cta, p")
        .forEach((e) => (e.style.visibility = "hidden"));
    });
    const buf = await page.screenshot({
      clip: { x: 0, y: 0, width: vp.w, height: Math.min(vp.h, 800) },
    });
    const png = PNG.sync.read(buf);
    let worst = Infinity,
      worstPx = null;
    for (const b of info.boxes) {
      const x0 = Math.max(0, Math.floor(b.x)),
        x1 = Math.min(png.width - 1, Math.ceil(b.x + b.w));
      const y0 = Math.max(0, Math.floor(b.y)),
        y1 = Math.min(png.height - 1, Math.ceil(b.y + b.h));
      for (let y = y0; y <= y1; y += 2) {
        for (let x = x0; x <= x1; x += 2) {
          const i = (png.width * y + x) << 2;
          const px = [png.data[i], png.data[i + 1], png.data[i + 2]];
          const r = ratio(info.fg, px);
          if (r < worst) {
            worst = r;
            worstPx = px;
          }
        }
      }
    }
    const ok = worst >= 4.5;
    if (!ok) fails++;
    console.log(
      `  ${p.padEnd(24)} worst ${worst.toFixed(2)}:1  bg rgb(${worstPx?.join(",")})  ${ok ? "PASS" : "FAIL"}`,
    );
    await page.reload();
  }
  await page.close();
}
await browser.close();
server.close();
console.log(
  fails
    ? `\n${fails} FAILING — text over photo below 4.5:1`
    : "\nEvery hero passes 4.5:1 at its worst pixel.",
);
process.exit(fails ? 1 : 0);
