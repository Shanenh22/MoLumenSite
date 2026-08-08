/**
 * Tests `mlTrack`'s sanitiser directly — the one privacy control the whole
 * analytics model rests on.
 *
 * WHY THIS EXISTS SEPARATELY
 *
 * Three suites already touch analytics, and none of them would notice if the
 * sanitiser stopped sanitising:
 *
 *   - test:booking asserts `booking_complete` carries no personal data, but
 *     that call sends `{ service: 'natal-60' }` and never reads Cal's payload,
 *     so it passes whether or not `clean()` does anything.
 *   - test:rising asserts no rising sign reaches analytics — a sign is a word
 *     like "scorpio", which the sanitiser would not drop anyway. That test
 *     proves the call site behaves, not the filter.
 *   - test:birthtime is the same shape.
 *
 * So inverting a condition in `clean()`, or turning a `continue` into a
 * `break`, would leave the entire suite green while birth dates started
 * flowing to GA4. This feeds the real helper the exact values it exists to
 * stop, on the real page, through the real inline bootstrap.
 *
 * It reads `window.dataLayer` rather than stubbing `mlTrack`, for the reason
 * recorded in docs/history: BaseLayout defines the helper in an inline script
 * that overwrites any earlier stub, so a stubbed assertion measures nothing.
 */
import { chromiumPath } from "./lib/chromium-path.mjs";
import { startDistServer } from "./lib/dist-server.mjs";

const { chromium } = await import("playwright");
const PORT = 4413;
const server = await startDistServer(PORT);

const browser = await chromium.launch({ executablePath: chromiumPath() });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let fails = 0;
const ok = (cond, label) => {
  console.log(`  ${cond ? "PASS" : "FAIL"}  ${label}`);
  if (!cond) fails++;
};

await page.goto(`http://localhost:${PORT}/`, { waitUntil: "load" });

console.log("The helper exists and is the only entry point");
const shape = await page.evaluate(() => ({
  mlTrack: typeof window.mlTrack,
  gtag: typeof window.gtag,
  dataLayer: Array.isArray(window.dataLayer),
}));
ok(shape.mlTrack === "function", `window.mlTrack is a function (got ${shape.mlTrack})`);
ok(shape.gtag === "function", `window.gtag is defined by the bootstrap (got ${shape.gtag})`);
ok(shape.dataLayer, "window.dataLayer is an array");

/**
 * Every value here is something the site actually handles and must never
 * report: a client's email, a birth date in three common formats, a birth
 * time, a long identifier, and a free-text question.
 */
console.log("\nValues that must be dropped");
const result = await page.evaluate(() => {
  const before = (window.dataLayer || []).length;
  window.mlTrack("test_privacy", {
    // must be dropped
    email: "jane.doe@example.com",
    birth_date_iso: "1988-04-12",
    birth_date_slash: "12/04/1988",
    birth_date_words: "12 April 1988",
    birth_time: "3:42",
    birth_time_padded: "03:42",
    booking_uid: "bk1234567890",
    year: "1988",
    free_text: "I was born at 3:42 in Austin and want to know about my career",
    // must survive
    service: "natal-90",
    intent: "soon",
    step: "birthtime",
    count: 3,
    flag: true,
    // must be ignored: not a scalar
    nested: { a: 1 },
    // must survive, truncated
    long: "x".repeat(250),
  });
  const events = (window.dataLayer || [])
    .slice(before)
    .filter((a) => a[0] === "event" && a[1] === "test_privacy");
  return { params: events[0]?.[2] ?? null, fired: events.length };
});

ok(result.fired === 1, `the event fired once (got ${result.fired})`);
const p = result.params ?? {};

const MUST_DROP = [
  "email",
  "birth_date_iso",
  "birth_date_slash",
  "birth_date_words",
  "birth_time",
  "birth_time_padded",
  "booking_uid",
  "year",
  "free_text",
  "nested",
];
for (const key of MUST_DROP) {
  ok(!(key in p), `"${key}" was dropped`);
}

console.log("\nValues that must survive");
ok(p.service === "natal-90", `service survives (got ${p.service})`);
ok(p.intent === "soon", `intent survives (got ${p.intent})`);
ok(p.step === "birthtime", `step survives (got ${p.step})`);
ok(p.count === 3, `numbers survive (got ${p.count})`);
ok(p.flag === true, `booleans survive (got ${p.flag})`);
ok(
  typeof p.long === "string" && p.long.length === 100,
  `long strings are capped at 100 chars (got ${typeof p.long === "string" ? p.long.length : typeof p.long})`,
);

/* Nothing resembling the dropped inputs may appear anywhere in the payload,
   not merely under its own key — a future change that renamed or merged keys
   could smuggle a value through while every per-key assertion above passed. */
const serialised = JSON.stringify(p);
for (const needle of [
  "jane.doe@example.com",
  "1988",
  "3:42",
  "Austin",
  "bk1234567890",
]) {
  ok(!serialised.includes(needle), `"${needle}" appears nowhere in the payload`);
}

console.log("\nThe helper never breaks a page");
const survives = await page.evaluate(() => {
  const errors = [];
  window.addEventListener("error", (e) => errors.push(String(e.message)));
  try {
    window.mlTrack("test_edge");
    window.mlTrack("test_edge", null);
    window.mlTrack("test_edge", undefined);
    window.mlTrack("test_edge", { v: undefined });
    return { threw: false, errors };
  } catch (e) {
    return { threw: true, message: String(e), errors };
  }
});
ok(!survives.threw, `missing/!null params do not throw (${survives.message ?? "ok"})`);

/**
 * The delegated booking-CTA listener. It is defined once in BaseLayout and
 * covers every /book/ link on the site, so a regression here silently
 * un-instruments the entire funnel rather than one page.
 */
console.log("\nDelegated booking CTA click");
await page.goto(`http://localhost:${PORT}/readings/natal/`, { waitUntil: "load" });
const cta = await page.evaluate(() => {
  const before = (window.dataLayer || []).length;
  const link = document.querySelector('main a[href*="/book/?service="]');
  if (!link) return { error: "no booking link on /readings/natal/" };
  // Cancel the navigation; the delegated listener has already run by then.
  link.addEventListener("click", (e) => e.preventDefault(), { once: true });
  link.click();
  const events = (window.dataLayer || [])
    .slice(before)
    .filter((a) => a[0] === "event" && a[1] === "booking_cta_click");
  return { href: link.getAttribute("href"), events: events.map((a) => a[2]) };
});

if (cta.error) {
  ok(false, cta.error);
} else {
  ok(cta.events.length === 1, `booking_cta_click fired once (got ${cta.events.length})`);
  const params = cta.events[0] ?? {};
  ok(params.service === "natal-90", `carries the event key (got ${params.service})`);
  ok(params.from === "/readings/natal/", `carries the page path (got ${params.from})`);
  ok(
    Object.keys(params).every((k) => k === "service" || k === "from"),
    `carries only service and from (got ${Object.keys(params).join(", ")})`,
  );
}

await browser.close();
server.close();
console.log(
  fails ? `\n${fails} FAILING` : "\nAnalytics privacy: the sanitiser holds.",
);
process.exit(fails ? 1 : 0);
