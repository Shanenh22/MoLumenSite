/**
 * Contrast for text sitting ON a photograph.
 *
 * scripts/check-contrast.mjs composites CSS background colours, which cannot
 * see through an <img>. This screenshots the hero, samples every pixel in the
 * band actually occupied by the h1 and lede, and computes the WORST-CASE ratio
 * against the rendered text colour — so a bright patch of sky behind one word
 * cannot hide behind an average.
 */
import { chromiumPath } from "./lib/chromium-path.mjs";
import { startDistServer } from "./lib/dist-server.mjs";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";

const { chromium } = await import("playwright");
const PORT = 4409;
// Manifest-backed, so a request is a lookup rather than a filesystem path
// built from `req.url`. See scripts/lib/dist-server.mjs.
const server = await startDistServer(PORT);

/**
 * Text-over-photo blocks. Each is sampled independently.
 *
 * `.seabreak--rest` is deliberately absent: nothing sits on it, so there is no
 * ratio to measure. `.seabreak--quote` carries a line and is very much included.
 */
const BLOCK_SELECTOR =
  ".hero--split, .hero--home, .interlude, .seabreak--quote";

/**
 * Which pages to check — discovered from the built output, not listed here.
 *
 * This list used to be hand-maintained, and it was wrong: it named ten pages at
 * a time when nineteen more had text over a photograph, so the check passed
 * while pages it had never heard of went unmeasured. Then the ocean work added
 * bands to fifteen more and the list had to be edited again. A contrast check
 * whose coverage depends on somebody remembering to append a path is a check
 * that silently shrinks.
 *
 * So: scan dist for the block classes and measure whatever is actually there.
 * Adding a band to a new page now puts it in this run automatically, and the
 * count is printed so a sudden drop in coverage is visible rather than silent.
 */
function discoverPages() {
  const found = [];
  /**
   * Must stay in step with BLOCK_SELECTOR above. They are separate because one
   * is a CSS selector and the other matches raw HTML, and they have already
   * drifted once: `.hero--home` was added to the selector and not to this
   * regex, so the homepage silently stayed out of the run while the printed
   * count looked unchanged. If you add a block class, add it in both places.
   */
  const classRe =
    /class="[^"]*\b(hero--split|hero--home|interlude|seabreak--quote)\b/;
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) {
        if (!classRe.test(readFileSync(full, "utf8"))) continue;
        const url =
          "/" +
          full
            .replace(/\\/g, "/")
            .replace(/^dist\//, "")
            .replace(/index\.html$/, "")
            .replace(/\.html$/, "");
        found.push(url);
      }
    }
  };
  walk("dist");
  return found.sort();
}
const PAGES = discoverPages();
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
  executablePath: chromiumPath(),
});
let fails = 0;
console.log(
  `Discovered ${PAGES.length} page(s) with text over a photograph.` +
    " A sharp fall in this number means coverage was lost, not that the site got safer.",
);
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
    /**
     * The label has to name the block that was actually measured.
     *
     * This used to be a single ternary that recognised `interlude` and called
     * everything else "hero". A `.seabreak--quote` therefore reported itself as
     * a hero, which is why `/explore/the-big-three/ (hero) no heading or lede`
     * read for months like a broken hero on a page whose hero was perfectly
     * fine — and nobody went looking for the sea break sitting below it.
     */
    const blocks = await page.evaluate(
      (sel) =>
        [...document.querySelectorAll(sel)].map((el) => {
          if (el.classList.contains("interlude")) return "interlude";
          if (el.classList.contains("seabreak--quote")) return "seabreak";
          return "hero";
        }),
      BLOCK_SELECTOR,
    );
    if (!blocks.length) {
      console.log(`  ${p.padEnd(30)} no text-over-photo block`);
      continue;
    }
    for (let bi = 0; bi < blocks.length; bi++) {
      // Fresh load per block: the previous pass hid text inline, and an
      // interlude sits below the fold so it has to be scrolled to before its
      // boxes mean anything in viewport coordinates.
      if (bi > 0) await page.reload();
      const info = await page.evaluate(
        ([sel, i]) => {
          const block = document.querySelectorAll(sel)[i];
          // global.css sets `scroll-behavior: smooth` on :root, so a plain
          // scrollIntoView animates and every rect measured on this tick is
          // still the pre-scroll one — which read as "not visible in viewport"
          // for every interlude band. Force instant scrolling first.
          document.documentElement.style.scrollBehavior = "auto";
          block.scrollIntoView({ block: "center", behavior: "instant" });
          /**
           * Sampled text. `.hero__tagline` and `.hero__reassure` are here
           * because they are real sentences sitting on a photograph, and both
           * were previously unmeasured — the tagline is gold on a dark scrim,
           * which is exactly the pairing most likely to fail quietly.
           */
          const els = [
            ...block.querySelectorAll(
              "h1, h2, .lede, .hero__tagline, .hero__reassure, .seabreak__line, .interlude__line",
            ),
          ];
          if (!els.length) return null;
          /**
           * Each element carries its OWN colour.
           *
           * This used to read `getComputedStyle(els[0]).color` once and measure
           * every box against it. That was fine while a block only ever held
           * ivory headings and a stone lede, and wrong the moment one line
           * differed — a gold tagline measured as though it were ivory reports a
           * ratio that belongs to no text on the page, in either direction.
           */
          const boxes = els.map((e) => {
            const b = e.getBoundingClientRect();
            const col = getComputedStyle(e)
              .color.match(/[\d.]+/g)
              .map(Number);
            return {
              x: b.x,
              y: b.y,
              w: b.width,
              h: b.height,
              fg: [col[0], col[1], col[2]],
              tag: e.className || e.tagName.toLowerCase(),
            };
          });
          /**
           * The site header is `position: sticky` with a near-ivory background,
           * so once the page scrolls it floats over the hero. Centring a block
           * taller than the viewport slides its heading underneath that header,
           * and the sampler then reads the header's cream pixels and reports a
           * heading at 1.13:1 that a visitor never sees obscured at all.
           * Return where the header ends so sampling can start below it.
           */
          const header = document.querySelector(".site-header");
          let headerBottom = 0;
          if (header) {
            const pos = getComputedStyle(header).position;
            if (pos === "sticky" || pos === "fixed")
              headerBottom = header.getBoundingClientRect().bottom;
          }
          /**
           * The same problem from the other end of the viewport.
           *
           * The cookie banner is `position: fixed` at the bottom, and a fresh
           * Playwright context has no stored consent, so it is on screen for
           * every page this script measures. Centring a block taller than the
           * viewport slides its lede underneath the banner, and the sampler
           * reads whatever is painted there instead of the photograph.
           *
           * Left unhandled this reported nine blog heroes and the homepage
           * tagline at 1.00–1.15:1 against backgrounds no visitor ever sees
           * behind that text — a false alarm loud enough to bury a real one.
           *
           * Excluding rather than hiding the banner is deliberate: a checker
           * that removes real overlays before measuring is measuring a page
           * nobody visits. Generalised to any fixed bottom overlay so the next
           * one does not need this comment written again.
           */
          let overlayTop = Infinity;
          document
            .querySelectorAll("[data-consent], [data-fixed-overlay]")
            .forEach((el) => {
              if (el.hidden) return;
              if (getComputedStyle(el).position !== "fixed") return;
              const r = el.getBoundingClientRect();
              if (r.height === 0) return;
              overlayTop = Math.min(overlayTop, r.top);
            });
          return { boxes, headerBottom, overlayTop };
        },
        [BLOCK_SELECTOR, bi],
      );
      const label = `${p} (${blocks[bi]})`;
      if (!info) {
        /**
         * A discovered block with no measurable text is a COVERAGE HOLE, not a
         * clean result, so it fails the run.
         *
         * It printed a note and continued for months. `.seabreak--quote`
         * carries its line in `.seabreak__line`, which was missing from the
         * element list above, so the one sea break on the site was silently
         * never measured — text on a photograph, which is the single thing
         * this script exists to check. The note scrolled past in a run that
         * ended "Every hero passes".
         *
         * If a block genuinely has no text, it does not belong in
         * BLOCK_SELECTOR; `.seabreak--rest` is excluded there for exactly that
         * reason. Anything still matching and yielding nothing is a bug in one
         * of the two lists, and should stop the build until someone reconciles
         * them.
         */
        console.log(
          `  ${label.padEnd(30)} FAIL — block discovered but no measurable text.` +
            ` Add its text element to the sampled selector, or remove the block` +
            ` class from BLOCK_SELECTOR.`,
        );
        fails++;
        continue;
      }
      /**
       * An interlude image is loading="lazy", so scrolling to it only STARTS
       * the fetch. Screenshotting on the next tick sampled a band with no
       * photograph in it and happily reported 15:1 — a check that passes
       * because it is measuring nothing is worse than no check. Wait for every
       * image in the block to be fetched and decoded before sampling.
       */
      await page.evaluate(
        async ([sel, i]) => {
          const imgs = [
            ...document.querySelectorAll(sel)[i].querySelectorAll("img"),
          ];
          await Promise.all(
            imgs.map(
              (im) =>
                new Promise((res) => {
                  const done = () =>
                    ("decode" in im ? im.decode() : Promise.resolve()).then(
                      res,
                      res,
                    );
                  if (im.complete) done();
                  else {
                    im.addEventListener("load", done, { once: true });
                    im.addEventListener("error", res, { once: true });
                  }
                }),
            ),
          );
        },
        [BLOCK_SELECTOR, bi],
      );
      await page.waitForTimeout(120);
      // Hide the text so we sample the background it sits on, not the glyphs.
      await page.evaluate(
        ([sel, i]) => {
          document
            .querySelectorAll(sel)
            [i].querySelectorAll(
              "h1, h2, p, .lede, .eyebrow, .hero__meta, .hero__cta, .btn",
            )
            .forEach((e) => (e.style.visibility = "hidden"));
        },
        [BLOCK_SELECTOR, bi],
      );
      /**
       * No `clip` here, deliberately.
       *
       * Playwright's clip is measured from the top-left of the PAGE, while
       * `getBoundingClientRect` is measured from the top-left of the VIEWPORT.
       * Those agree only while the page is unscrolled — which was true for every
       * block on the site except one, so the mismatch stayed hidden. The
       * homepage hero is taller than a phone viewport, so `scrollIntoView`
       * genuinely scrolls, and the sampler then compared post-scroll boxes
       * against a screenshot of the unscrolled top of the page. It reported the
       * h1 at 1.13:1 against a cream pixel that is nowhere near it.
       *
       * A default screenshot is the viewport, in viewport coordinates, which is
       * the same space the boxes are in.
       */
      const buf = await page.screenshot();
      const png = PNG.sync.read(buf);
      let worst = Infinity,
        worstPx = null,
        worstTag = "";
      for (const b of info.boxes) {
        const x0 = Math.max(0, Math.floor(b.x)),
          x1 = Math.min(png.width - 1, Math.ceil(b.x + b.w));
        const y0 = Math.max(
            0,
            Math.floor(b.y),
            Math.ceil(info.headerBottom ?? 0),
          ),
          y1 = Math.min(
            png.height - 1,
            Math.ceil(b.y + b.h),
            Math.floor(info.overlayTop ?? Infinity) - 1,
          );
        // Entirely behind the sticky header, or entirely under a fixed overlay.
        if (y1 < y0) continue;
        for (let y = y0; y <= y1; y += 2) {
          for (let x = x0; x <= x1; x += 2) {
            const i = (png.width * y + x) << 2;
            const px = [png.data[i], png.data[i + 1], png.data[i + 2]];
            const r = ratio(b.fg, px);
            if (r < worst) {
              worst = r;
              worstPx = px;
              worstTag = b.tag;
            }
          }
        }
      }
      if (worst === Infinity) {
        console.log(`  ${label.padEnd(30)} not visible in viewport`);
        continue;
      }
      const ok = worst >= 4.5;
      if (!ok) fails++;
      // Naming the offending element matters: "1.13:1 somewhere in this hero"
      // sends you hunting, "1.13:1 on .hero__reassure" sends you to the line.
      console.log(
        `  ${label.padEnd(30)} worst ${worst.toFixed(2)}:1  bg rgb(${worstPx?.join(",")})  ${ok ? "PASS" : `FAIL  <- ${worstTag}`}`,
      );
    }
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
