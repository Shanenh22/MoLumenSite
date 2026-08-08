import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const json = (p) => JSON.parse(readFileSync(p, "utf8"));

function unique(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    const value = item?.[key];
    if (!value) continue;
    if (seen.has(value)) err(`${label}: duplicate ${key} "${value}"`);
    seen.add(value);
  }
}

/**
 * Minimal frontmatter reader.
 *
 * The `\r` normalisation is load-bearing, not defensive tidying. In JavaScript
 * `.` matches any character EXCEPT a line terminator, and `\r` is a line
 * terminator — so on a CRLF checkout `(.*)$` stopped before the trailing `\r`,
 * `$` could not match with one left over, and every single line failed to
 * parse. `frontmatter()` returned `{}` for every file.
 *
 * This repository sets `core.autocrlf=true` and ships no `.gitattributes`, so
 * that is the state of every Windows working copy — including the owner's.
 * The effect was that `npm run test:content` reported 45 errors locally (all
 * 15 sky events, three each: missing sourceNote, missing lastVerified, invalid
 * start date) while the identical commit passed cleanly in CI on Linux.
 *
 * A quality gate that cries wolf on the maintainer's own machine is worse than
 * no gate, because the next real failure gets waved through with the rest. It
 * also silently disabled the `draft` skip below, since `fm.draft` was never
 * populated either.
 */
function frontmatter(file) {
  const raw = readFileSync(file, "utf8").replace(/\r\n?/g, "\n");
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const out = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim().replace(/^['"]|['"]$/g, "");
    out[m[1]] = v;
  }
  return out;
}

const serviceDir = "src/content/services";
const services = readdirSync(serviceDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => json(join(serviceDir, f)));
unique(services, "slug", "services");
for (const s of services) {
  if (
    s.available &&
    !s.bookingEventId &&
    !(s.options || []).some((o) => o.bookingEventId)
  )
    warn(`service ${s.slug}: available but no booking event ID`);
  if (s.priceConfirmed && s.price == null && !(s.options || []).length)
    err(`service ${s.slug}: priceConfirmed but no price/options`);
}

const videos = json("src/content/videos/videos.json");
unique(videos, "id", "videos");
for (const v of videos) {
  if (v.draft) continue;
  if (
    v.platform === "youtube" &&
    !/^[A-Za-z0-9_-]{6,20}$/.test(v.externalId || "")
  )
    err(`video ${v.id}: malformed YouTube ID`);
  if (!v.title || !v.description)
    err(`video ${v.id}: published item missing title/description`);
}

for (const [path, key, label] of [
  ["src/content/testimonials/testimonials.json", "id", "testimonials"],
  ["src/content/faqs/faqs.json", "id", "faqs"],
  ["src/content/glossary/terms.json", "id", "glossary"],
]) {
  const items = json(path);
  unique(items, key, label);
  if (label === "testimonials")
    for (const t of items)
      if (t.approved && !String(t.permissionNote || "").trim())
        err(`testimonial ${t.id}: approved without permissionNote`);
}

const skyDir = "src/content/sky-events";
let furthestFuture = null;
let futureCount = 0;
const today = new Date();
today.setHours(0, 0, 0, 0);

/**
 * Must match the `eventType` enum in src/content.config.ts and the `select`
 * values in .pages.yml. Checked here as well as in Zod because the calendar at
 * /current-sky/calendar/ derives its filter buttons and its colour coding from
 * whatever types are present in the content. An unrecognised type would not
 * crash the build — it would render an event into a filter group nobody can
 * select, which is the kind of failure that ships.
 */
const EVENT_TYPES = new Set([
  "lunation",
  "eclipse",
  "retrograde",
  "ingress",
  "aspect",
  "other",
]);

for (const file of readdirSync(skyDir).filter((f) => /\.mdx?$/.test(f))) {
  const fm = frontmatter(join(skyDir, file));
  if (fm.draft === "true") continue;
  if (!fm.sourceNote)
    err(`sky event ${file}: published item missing sourceNote`);
  if (!fm.lastVerified)
    err(`sky event ${file}: published item missing lastVerified`);
  if (!EVENT_TYPES.has(fm.eventType))
    err(
      `sky event ${file}: eventType "${fm.eventType ?? "(missing)"}" is not one of ` +
        `${[...EVENT_TYPES].join(", ")} — the calendar filters and colour coding are derived from it`,
    );
  if (!fm.start || Number.isNaN(Date.parse(fm.start))) {
    err(`sky event ${file}: invalid/missing start date`);
    continue;
  }
  const start = new Date(fm.start);
  /**
   * An `end` before its `start` is a typo that produces a silently wrong
   * calendar: the span reads as negative and the event's date range prints
   * backwards. Cheap to catch here, invisible everywhere else.
   */
  if (fm.end) {
    if (Number.isNaN(Date.parse(fm.end)))
      err(`sky event ${file}: invalid end date "${fm.end}"`);
    else if (new Date(fm.end) < start)
      err(`sky event ${file}: end (${fm.end}) is before start (${fm.start})`);
  }
  if (start >= today) {
    futureCount += 1;
    if (!furthestFuture || start > furthestFuture) furthestFuture = start;
  }
}

/**
 * Current Sky horizon.
 *
 * The dated, sourced sky calendar is the one asset on this site that no
 * comparable astrologer publishes, and it has a hard expiry date: when the
 * last event passes, the Current Sky timeline, the homepage's three upcoming
 * events and every rising-sign horoscope go empty at once — while the homepage
 * still promises coverage "through the end of the year". An asset that lapses
 * silently converts the strongest proof of rigour into the most visible
 * evidence of neglect.
 *
 * Fails under 90 days so a lapse cannot reach production. Warns under the
 * 12-month maintenance target so routine work has a standing nudge long before
 * it becomes urgent. Deliberately part of this validator rather than a separate
 * script — it runs in CI, in the Pages CMS quality check and in npm
 * run test:content, which is everywhere it needs to be.
 */
const HORIZON_FAIL_DAYS = 90;
const HORIZON_TARGET_DAYS = 365;
const DAY_MS = 86400000;
if (!furthestFuture) {
  err(
    "Current Sky horizon: no future events are published. The timeline, homepage " +
      "upcoming list and rising-sign horoscopes are all empty.",
  );
} else {
  const daysLeft = Math.round((furthestFuture - today) / DAY_MS);
  const last = furthestFuture.toISOString().slice(0, 10);
  if (daysLeft < HORIZON_FAIL_DAYS) {
    err(
      `Current Sky horizon: only ${daysLeft} day(s) of future coverage remain ` +
        `(last event ${last}, ${futureCount} upcoming). Minimum is ${HORIZON_FAIL_DAYS}; ` +
        `target is ${HORIZON_TARGET_DAYS}. Research and publish the next window.`,
    );
  } else if (daysLeft < HORIZON_TARGET_DAYS) {
    warn(
      `Current Sky horizon: ${daysLeft} day(s) of future coverage ` +
        `(last event ${last}, ${futureCount} upcoming). Above the ${HORIZON_FAIL_DAYS}-day ` +
        `minimum but below the ${HORIZON_TARGET_DAYS}-day target.`,
    );
  } else {
    console.log(
      `Current Sky horizon: ${daysLeft} days of future coverage ` +
        `(last event ${last}, ${futureCount} upcoming).`,
    );
  }
}

/**
 * Birth Time Confidence results point into the toolkit worksheets by anchor.
 *
 * Those anchors are the only link on the site that depends on an `id` inside
 * another page's markup, and nothing else would notice if one were renamed:
 * `internal-link-check.mjs` resolves paths, not fragments, so
 * `/birth-time-toolkit/worksheets/#record-search` keeps passing after the
 * heading it points at is gone. The result would be five buttons that dump the
 * reader at the top of a thirteen-page document — a dead link that looks alive.
 *
 * Both sides are read from source rather than from the build, so this fails
 * before a broken pairing can be deployed.
 */
{
  const lib = readFileSync("src/lib/birth-time-confidence.ts", "utf8").replace(
    /\r\n?/g,
    "\n",
  );
  const worksheets = readFileSync(
    "src/pages/birth-time-toolkit/worksheets.astro",
    "utf8",
  ).replace(/\r\n?/g, "\n");
  const present = new Set(
    [...worksheets.matchAll(/<h2 id="([^"]+)"/g)].map((m) => m[1]),
  );
  const referenced = [...lib.matchAll(/anchor:\s*['"]([^'"]+)['"]/g)].map(
    (m) => m[1],
  );
  if (referenced.length === 0)
    err(
      "birth-time-confidence: no worksheet anchors found — did the result shape change?",
    );
  for (const anchor of new Set(referenced))
    if (!present.has(anchor))
      err(
        `birth-time-confidence: result links to #${anchor}, which is not a heading id in ` +
          `worksheets.astro (present: ${[...present].join(", ") || "none"})`,
      );

  /**
   * No invented precision. The five labels are qualitative on purpose, and a
   * percentage would be exactly the false authority the rest of the site
   * refuses. Cheap to assert, and it makes the rule a build failure rather than
   * something a reviewer has to notice.
   */
  // Comments are stripped first. The file's own header explains why "87%
  // confident" would be wrong, and an unstripped check flagged that sentence —
  // a guard that cannot survive its own documentation gets deleted rather than
  // fixed by whoever hits it next.
  const libCode = lib
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  if (/\d\s*%/.test(libCode))
    err(
      "birth-time-confidence: result copy contains a percentage — the scale is qualitative",
    );
}

const forbidden = [
  "PUBLIC_MAILERLITE_FORM_ID",
  "assets.mailerlite.com/jsonp",
  "mailto:${site.email}?subject=",
];
for (const path of [
  "src/components/NewsletterForm.astro",
  "src/config/site.ts",
  ".env.example",
  "README.md",
]) {
  const text = readFileSync(path, "utf8");
  for (const token of forbidden)
    if (text.includes(token))
      err(`${path}: obsolete newsletter token ${token}`);
}

console.log(
  `Content integrity: ${errors.length} error(s), ${warnings.length} warning(s)`,
);
for (const m of warnings) console.warn(`WARN: ${m}`);
for (const m of errors) console.error(`ERROR: ${m}`);
if (errors.length) process.exit(1);
