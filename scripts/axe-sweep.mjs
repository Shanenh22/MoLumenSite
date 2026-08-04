/**
 * Accessibility sweep: runs axe-core (WCAG 2.2 A/AA rulesets) against a
 * representative page sample at both mobile and desktop widths.
 * Usage: node axe-sweep.mjs   (expects `npx http-server dist` style server on :4321)
 */
/**
 * lighthouse / playwright / chrome-launcher are deliberately NOT in
 * package.json. They are ~150MB of install that the Cloudflare build does not
 * need, and having lighthouse there broke the deploy. Install on demand:
 *   npm run audit:install
 */
async function requireTool(name) {
  try {
    return await import(name);
  } catch {
    console.error(
      `\n[audit] "${name}" is not installed.\n` +
        `        Audit tools are kept out of package.json so the deploy stays lean.\n` +
        `        Run:  npm run audit:install\n`,
    );
    process.exit(1);
  }
}
const { chromium } = await requireTool("playwright");
import { readFileSync } from "node:fs";
import { chromiumPath } from "./lib/chromium-path.mjs";
import http from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join } from "node:path";

const AXE = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const PORT = 4399;
const ROOT = "dist";

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".json": "application/json",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let file = join(ROOT, p);
  try {
    if (statSync(file).isDirectory()) file = join(file, "index.html");
  } catch {
    try {
      statSync(file + ".html");
      file = file + ".html";
    } catch {
      res.writeHead(404);
      return res.end("not found");
    }
  }
  res.writeHead(200, {
    "Content-Type": MIME[extname(file)] || "application/octet-stream",
  });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const PAGES = [
  "/",
  "/readings/",
  "/readings/natal/",
  "/book/",
  "/explore/",
  "/explore/signs/aries/",
  "/explore/planets/saturn/",
  "/explore/houses/first-house/",
  "/explore/dignities/",
  "/start-here/",
  "/blog/",
  "/current-sky/",
  "/tools/explore-your-chart/",
  "/reading-finder/",
  "/about/",
  "/contact/",
  "/videos/",
  "/frequently-asked-questions/",
  "/explore/glossary/",
  "/404",
];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch({
  executablePath: chromiumPath(),
});
let total = 0;
const rows = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
  });
  const page = await ctx.newPage();
  for (const path of PAGES) {
    let resp;
    try {
      resp = await page.goto(`http://localhost:${PORT}${path}`, {
        waitUntil: "load",
      });
    } catch (e) {
      rows.push([vp.name, path, "LOAD FAIL", e.message.slice(0, 60)]);
      continue;
    }
    if (!resp || resp.status() >= 400) {
      rows.push([vp.name, path, `HTTP ${resp?.status()}`, ""]);
      continue;
    }
    await page.addScriptTag({ content: AXE });
    const result = await page.evaluate(async () => {
      const r = await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: [
            "wcag2a",
            "wcag2aa",
            "wcag21a",
            "wcag21aa",
            "wcag22aa",
            "best-practice",
          ],
        },
      });
      return r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        n: v.nodes.length,
        sample: v.nodes[0]?.target?.join(" ") ?? "",
      }));
    });
    total += result.length;
    if (result.length) {
      for (const v of result)
        rows.push([
          vp.name,
          path,
          `${v.id} (${v.impact}) x${v.n}`,
          v.sample.slice(0, 70),
        ]);
    }
  }
  await ctx.close();
}
await browser.close();
server.close();

if (rows.length === 0) {
  console.log(
    `axe: 0 violations across ${PAGES.length} pages x ${VIEWPORTS.length} viewports (WCAG 2.2 A/AA + best-practice)`,
  );
} else {
  console.log("VIEWPORT | PAGE | VIOLATION | NODE");
  for (const r of rows) console.log(r.join(" | "));
  console.log(`\nTotal violation types: ${total}`);
}
