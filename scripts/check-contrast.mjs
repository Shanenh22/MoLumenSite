/**
 * Computes real contrast ratios for the hero chips as they actually render,
 * by reading the resolved colours out of the browser and compositing any
 * translucent background over its parent. axe reports a pass/fail; this
 * reports the number, which is what you need when tuning a colour.
 */
import http from "node:http";
import { chromiumPath } from "./lib/chromium-path.mjs";
import { createReadStream, statSync } from "node:fs";
import { extname, join } from "node:path";

const { chromium } = await import("playwright");
const PORT = 4408;
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

const browser = await chromium.launch({
  executablePath: chromiumPath(),
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const TARGETS = [
  [
    "/readings/natal/",
    ".hero__meta li:not(.hero__meta--price)",
    "hero meta chip",
  ],
  ["/readings/natal/", ".hero__meta--price", "hero price chip"],
  ["/readings/natal/", ".hero .eyebrow", "hero eyebrow"],
  ["/readings/natal/", ".hero .lede", "hero lede"],
  ["/blog/what-is-a-transit/", ".hero__meta li", "blog meta chip"],
  ["/book/", ".choice__price", "booking price"],
  ["/book/", ".choice__tag", "booking duration chip"],
  ["/book/", "fieldset.booking-group > legend span", "booking group note"],
];

const results = [];
for (const [path, sel, label] of TARGETS) {
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: "load" });
  const r = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
    // Walk up compositing translucent backgrounds until fully opaque.
    let bg = [255, 255, 255, 1];
    let node = el;
    const stack = [];
    while (node) {
      const c = parse(getComputedStyle(node).backgroundColor);
      if (c.length) stack.push([c[0], c[1], c[2], c.length > 3 ? c[3] : 1]);
      node = node.parentElement;
    }
    for (let i = stack.length - 1; i >= 0; i--) {
      const [r2, g2, b2, a] = stack[i];
      bg = [
        r2 * a + bg[0] * (1 - a),
        g2 * a + bg[1] * (1 - a),
        b2 * a + bg[2] * (1 - a),
        1,
      ];
    }
    const fg = parse(getComputedStyle(el).color);
    return {
      fg: [fg[0], fg[1], fg[2]],
      bg: [bg[0], bg[1], bg[2]],
      size: getComputedStyle(el).fontSize,
      weight: getComputedStyle(el).fontWeight,
    };
  }, sel);
  if (!r) {
    results.push([label, null]);
    continue;
  }
  const lum = ([r0, g0, b0]) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r0) + 0.7152 * f(g0) + 0.0722 * f(b0);
  };
  const L1 = lum(r.fg),
    L2 = lum(r.bg);
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  const px = parseFloat(r.size);
  const large = px >= 24 || (px >= 18.66 && Number(r.weight) >= 700);
  const need = large ? 3 : 4.5;
  results.push([label, ratio, need, px, large]);
}
await browser.close();
server.close();

let fail = 0;
console.log(`${"element".padEnd(28)} ratio   needs   size`);
for (const [label, ratio, need, px, large] of results) {
  if (ratio == null) {
    console.log(`${label.padEnd(28)} NOT FOUND`);
    continue;
  }
  const ok = ratio >= need;
  if (!ok) fail++;
  console.log(
    `${label.padEnd(28)} ${ratio.toFixed(2)}:1  ${need}:1   ${px}px${large ? " (large)" : ""}  ${ok ? "PASS" : "FAIL"}`,
  );
}
console.log(
  fail ? `\n${fail} FAILING` : "\nAll measured pairings meet WCAG AA.",
);
process.exit(fail ? 1 : 0);
