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

/**
 * This is the accessibility gate. There is no second one.
 *
 * A `test:a11y` script pointing at `pa11y-ci` sat in package.json for months
 * with `pa11y-ci` absent from devDependencies, so it could only ever fail at
 * the shell. It was removed rather than given a config: pa11y and axe wrap
 * overlapping rule sets, and a second a11y tool would have meant a new
 * dependency, two lists of pages to keep in step, and two places to look when
 * something failed.
 *
 * What this run covers that a stock axe pass does not: WCAG 2.2 target size
 * (2.5.8), which axe cannot evaluate because the criterion turns on whether a
 * link sits inside a sentence. Text over photographs is not covered here at
 * all — axe cannot sample a photograph — and lives in
 * `npm run check:hero-contrast`.
 */
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
  /**
   * The interactive surfaces. This list is hand-maintained, and
   * docs/session-handoff.md records three separate occasions where a check
   * silently shrank because somebody added a page and not a path. A new
   * interactive page belongs here in the same commit that creates it.
   */
  "/current-sky/calendar/",
  "/horoscopes/",
  "/current-sky/events/2026-08-12-leo-solar-eclipse/",
  "/birth-time/",
  "/birth-time-toolkit/",
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

    /**
     * Target size (WCAG 2.2 AA, SC 2.5.8) — axe cannot test this.
     *
     * It is not machine-detectable in general because the standard turns on
     * whether a link sits inside a sentence, which is a judgement about
     * content. So axe reports zero violations on a page with twenty 20px tap
     * targets, and this ran clean for months while 36 standalone links on the
     * homepage were under the minimum.
     *
     * The inline exception is approximated the only way it can be: a link is
     * treated as inline prose when its parent holds meaningfully more text than
     * the link itself. Card titles, footer nav items and standalone "read more"
     * links are not that, and they are what this catches.
     *
     * Mobile only. The criterion is about pointer targets, and the desktop
     * viewport here is driven by a mouse.
     */
    if (vp.name === "mobile") {
      const small = await page.evaluate(() => {
        const isInlineProse = (el) => {
          // Climb past purely presentational wrappers before judging. A link
          // written as <strong><a>Aspects</a></strong> mid-sentence has a
          // parent containing nothing but the link, so a naive parent check
          // calls it standalone and reports a failure that is not one.
          let p = el.parentElement;
          while (
            p &&
            /^(STRONG|EM|B|I|SPAN|SMALL)$/.test(p.tagName) &&
            p.textContent.trim() === el.textContent.trim()
          ) {
            p = p.parentElement;
          }
          if (!p) return false;
          return (
            p.textContent.trim().length > el.textContent.trim().length + 12
          );
        };
        const out = [];
        document.querySelectorAll("main a, footer a").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (isInlineProse(el)) return;
          if (r.height < 24 || r.width < 24) {
            out.push(
              `${(el.textContent || "").trim().slice(0, 30)} (${Math.round(r.width)}x${Math.round(r.height)})`,
            );
          }
        });
        return out;
      });
      if (small.length) {
        total += small.length;
        rows.push([
          vp.name,
          path,
          `target-size <24px (wcag22aa) x${small.length}`,
          small.slice(0, 2).join("; ").slice(0, 70),
        ]);
      }
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
