/**
 * Guards the booking vocabulary against drift, in two directions.
 *
 * 1. SOURCE — no hand-written `/book/?service=` links.
 *
 *    Every booking URL must come from `src/config/booking.ts`. The site has now
 *    been bitten three separate times by a link that was correct when written
 *    and wrong later: the hero and closing CTA on a multi-price reading pointing
 *    at different prices, the Reading Finder resolving a service slug to a
 *    discounted rate, and three `?service=natal-90` strings that silently meant
 *    "whatever the newcomer reading is" while naming one specific event.
 *
 *    Review does not catch this class — each individual link looks right.
 *
 * 2. BUILD OUTPUT — every emitted `?service=` value is a real Cal.com event.
 *
 *    A typo, a renamed event, or a service slug that leaked into a link where an
 *    event key belonged all produce a booking page that silently falls back
 *    instead of 404ing, which is why the link checker cannot see them.
 *
 *    Service slugs ARE permitted here, because /book/ maps them through
 *    `serviceToEvent` and `test:booking` asserts every one of those mappings.
 *    What is not permitted is a value that is neither.
 *
 * Runs without a browser, so it belongs in verify:core rather than
 * verify:interactive.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";

const errors = [];
const err = (m) => errors.push(m);

/** CRLF-safe read. See the note in content-integrity.mjs about `.` and `\r`. */
const read = (p) => readFileSync(p, "utf8").replace(/\r\n?/g, "\n");

function walk(dir, test, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, test, out);
    else if (test(full)) out.push(full);
  }
  return out;
}

// ---------------------------------------------------------------- the vocabulary
const serviceDir = "src/content/services";
const services = readdirSync(serviceDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(read(join(serviceDir, f))));

const eventKeys = new Set();
const serviceSlugs = new Set();
for (const s of services) {
  serviceSlugs.add(s.slug);
  if (s.bookingEventId) eventKeys.add(s.bookingEventId);
  for (const o of s.options ?? [])
    if (o.bookingEventId) eventKeys.add(o.bookingEventId);
}

// ---------------------------------------------------------------- 1. source
/**
 * `src/config/booking.ts` is the only file allowed to spell the URL out.
 * `/book/` itself is allowed to read the query string it receives.
 */
const SOURCE_ALLOWED = new Set([
  join("src", "config", "booking.ts"),
  join("src", "pages", "book.astro"),
]);

const sourceFiles = walk("src", (f) =>
  [".astro", ".ts", ".tsx", ".js", ".mjs"].includes(extname(f)),
);

for (const file of sourceFiles) {
  const rel = relative(process.cwd(), file);
  if (SOURCE_ALLOWED.has(rel)) continue;
  const text = read(file);
  text.split("\n").forEach((line, i) => {
    // Comments describe the historical bugs by name; they are documentation,
    // not links. Only real occurrences matter.
    const code = line.replace(/^\s*(\*|\/\/).*/, "");
    if (!/\/book\/\?service=/.test(code)) return;
    err(
      `${rel}:${i + 1} hand-written booking link — use bookingActions(), ` +
        `finalCtaAction() or defaultBookingHref() from src/config/booking.ts\n` +
        `      ${line.trim().slice(0, 100)}`,
    );
  });
}

// ---------------------------------------------------------------- 2. built output
let built = 0;
const emitted = new Map(); // value -> Set(pages)
try {
  const pages = walk("dist", (f) => f.endsWith(".html"));
  for (const page of pages) {
    built++;
    const url = "/" + relative("dist", page).split(sep).join("/");
    for (const m of read(page).matchAll(/\/book\/\?service=([^"'&\s>]+)/g)) {
      const value = decodeURIComponent(m[1]);
      if (!emitted.has(value)) emitted.set(value, new Set());
      emitted.get(value).add(url);
    }
  }
} catch {
  err("dist/ not found — run `npm run build` before this check");
}

for (const [value, pages] of emitted) {
  if (eventKeys.has(value) || serviceSlugs.has(value)) continue;
  err(
    `built output links to ?service=${value}, which is neither a Cal.com event ` +
      `nor a service slug (first seen on ${[...pages][0]})`,
  );
}

/**
 * The default must be a real event. `book.astro` already throws at build time
 * if it is not, but that only fires when the page is built; this states the
 * same invariant where the rest of the vocabulary is checked.
 */
const cfg = read("src/config/booking.ts");
const defaultEvent = cfg.match(/DEFAULT_BOOKING_EVENT\s*=\s*"([^"]+)"/)?.[1];
if (!defaultEvent) err("DEFAULT_BOOKING_EVENT not found in src/config/booking.ts");
else if (!eventKeys.has(defaultEvent))
  err(`DEFAULT_BOOKING_EVENT "${defaultEvent}" is not a Cal.com event key`);

console.log(
  `Booking links: ${sourceFiles.length} source file(s), ${built} built page(s), ` +
    `${emitted.size} distinct ?service= value(s).`,
);
if (emitted.size)
  console.log(`  values: ${[...emitted.keys()].sort().join(", ")}`);

if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("All booking links come from src/config/booking.ts.");
