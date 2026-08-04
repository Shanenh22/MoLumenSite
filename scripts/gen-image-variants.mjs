/**
 * Narrow copies of the full-bleed band images, so a phone stops downloading a
 * 1536px file to paint a 390px-wide band.
 *
 * Every hero and every interlude is a single <img> stretched across 100vw. Until
 * now each one shipped exactly one file at its full authored width — the ocean
 * set is 1536x1024, the older scene art 1200x800 — regardless of the screen
 * asking for it. `/explore/transits/` was the worst case at 161KB for a hero a
 * phone renders about a quarter of a megapixel of.
 *
 * This writes `<name>-<width>.webp` beside each source, matching the naming
 * already used by the hand-made portrait variants in public/images
 * (mo-home-420.webp and friends). Those portraits are deliberately NOT
 * regenerated here: they are a different crop problem, they already have
 * variants, and they are the one part of the image set that depicts a real
 * person.
 *
 * The registry in src/config/images.ts is the source of truth for what to
 * process, so a new band image picks this up automatically. Run it after adding
 * one:
 *
 *     npm run images:variants
 *
 * Idempotent — a variant newer than its source is left alone. Pass --force to
 * rebuild everything.
 *
 * IMPORTANT: downscaling resamples the pixels the hero scrim sits on, so the
 * worst-case pixel behind heading text can move. Run `npm run check:hero-contrast`
 * afterwards. That is not a formality; it is the whole reason that script exists.
 */
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import {
  VARIANT_WIDTHS,
  celestial,
  ocean,
  scenes,
} from "../src/config/images.ts";

const DIR = "public/images";
/**
 * 640 covers a 1x phone and a 2x phone at ~320px; 960 covers the common 2x
 * phone; 1280 covers 3x phones and 1x laptops. The untouched original stays in
 * the srcset as the widest candidate, so large and HiDPI desktops are unaffected.
 *
 * Imported rather than restated: if this list and the one the srcset is built
 * from ever disagreed, the markup would point at files nothing had written.
 */
const WIDTHS = VARIANT_WIDTHS;
const QUALITY = 78;
const force = process.argv.includes("--force");

/** Band images only: every hero, interlude and SeaBreak draws from these. */
const sources = [
  ...Object.values(scenes),
  ...Object.values(ocean),
  ...Object.values(celestial),
];

const kb = (n) => `${Math.round(n / 1024)}KB`;
let written = 0,
  skipped = 0,
  bytesBefore = 0,
  bytesAfter = 0;

for (const image of sources) {
  const name = image.src.replace("/images/", "").replace(/\.webp$/, "");
  const src = join(DIR, `${name}.webp`);
  let srcStat;
  try {
    srcStat = statSync(src);
  } catch {
    console.log(`  ${name.padEnd(32)} MISSING — registered but not on disk`);
    continue;
  }

  for (const w of WIDTHS) {
    if (w >= image.width) continue; // never upscale
    const out = join(DIR, `${name}-${w}.webp`);
    if (!force) {
      try {
        if (statSync(out).mtimeMs >= srcStat.mtimeMs) {
          skipped++;
          continue;
        }
      } catch {
        /* not built yet */
      }
    }
    await sharp(src)
      .resize({ width: w })
      .webp({ quality: QUALITY })
      .toFile(out);
    const after = statSync(out).size;
    bytesBefore += srcStat.size;
    bytesAfter += after;
    written++;
    console.log(
      `  ${`${name}-${w}`.padEnd(36)} ${kb(after).padStart(6)}  (source ${kb(srcStat.size)})`,
    );
  }
}

console.log(
  `\n${written} variant(s) written, ${skipped} already current.` +
    (written
      ? ` Largest-to-smallest saving on the new files: ${kb(bytesBefore)} → ${kb(bytesAfter)}.`
      : ""),
);

/** Anything named like a variant but no longer backed by a source is dead weight. */
const known = new Set(
  sources.flatMap((i) => {
    const n = i.src.replace("/images/", "").replace(/\.webp$/, "");
    return WIDTHS.filter((w) => w < i.width).map((w) => `${n}-${w}.webp`);
  }),
);
const variantName = new RegExp(`-(${WIDTHS.join("|")})\\.webp$`);
const orphans = readdirSync(DIR).filter(
  (f) => variantName.test(f) && !known.has(f),
);
if (orphans.length)
  console.log(
    `Orphaned variants (source de-registered?): ${orphans.join(", ")}`,
  );
