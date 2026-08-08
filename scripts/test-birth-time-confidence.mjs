/**
 * The Birth Time Confidence check, asserted against the built output.
 *
 * The evaluation matrix is driven through the real UI rather than by importing
 * the module, for two reasons. The rules live in TypeScript that Node will not
 * import directly, and — more usefully — driving the actual radios proves the
 * page and the rules agree. A unit test of `evaluate()` would have passed while
 * the component fed it the wrong field names.
 *
 * All 125 answer combinations are exercised, because the rule order is the part
 * most likely to be got wrong by a later edit: conflict is tested BEFORE
 * precision, so that a reader holding two contradictory certificates is told
 * "conflicting" rather than "documented". That is Mo's position on
 * /birth-time/ — keep both rather than picking one — and a reordered rule set
 * would quietly contradict the page this tool sits underneath.
 */
import http from "node:http";
import { chromiumPath } from "./lib/chromium-path.mjs";
import { createReadStream, statSync } from "node:fs";
import { extname, join } from "node:path";

const { chromium } = await import("playwright");
const PORT = 4413;
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".pdf": "application/pdf",
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

const PAGE = `http://localhost:${PORT}/birth-time-toolkit/`;
let pass = 0;
const failures = [];
const ok = (name, cond, detail = "") => {
  if (cond) {
    pass += 1;
    console.log(`  ok  ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
    console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
};

const LABELS = [
  "documented",
  "strongly-remembered",
  "approximate",
  "conflicting",
  "unknown",
];

const browser = await chromium.launch({ executablePath: chromiumPath() });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await ctx.newPage();
const consoleErrors = [];
page.on("pageerror", (e) => consoleErrors.push(String(e)));
page.on("console", (m) => {
  // The blocked Google tag below is an intentional abort, not a page fault.
  if (m.type() === "error" && !/ERR_FAILED|googletagmanager/.test(m.text()))
    consoleErrors.push(m.text());
});

/**
 * Analytics is read out of the real `dataLayer`, not from a stub.
 *
 * Stubbing `window.mlTrack` from an init script was tried and does not work:
 * BaseLayout defines the real helper in an inline script that runs afterwards
 * and overwrites the stub, so every assertion passed vacuously against an empty
 * array. Reading dataLayer instead means the events go through the genuine
 * helper — including its sanitiser, which is the part that must not be bypassed
 * by a test claiming to check it.
 *
 * Google's own script is blocked so nothing leaves the machine; `gtag` is still
 * defined by the inline bootstrap, which is all mlTrack needs to fire.
 */
await ctx.route("**://www.googletagmanager.com/**", (r) => r.abort());
const trackedEvents = () =>
  page.evaluate(() =>
    (window.dataLayer || [])
      .map((a) => Array.from(a))
      .filter((a) => a[0] === "event")
      .map((a) => ({ name: a[1], params: a[2] ?? {} })),
  );
await page.goto(PAGE, { waitUntil: "load" });

console.log("\nThe tool does not hijack the page");
/**
 * The component's first render used to focus the first radio, and focusing an
 * element scrolls it into view — so landing on this page threw every visitor
 * past the hero and the contents list into the middle of a quiz they had not
 * started. `check:hero-contrast` caught it by reporting the h1 at 1.00:1,
 * because the heading was at y=-94 by the time the page settled. Asserted here
 * too, where the cause is legible rather than inferred from a contrast ratio.
 */
ok(
  "the page is still at the top after the tool initialises",
  (await page.evaluate(() => window.scrollY)) === 0,
  `scrollY ${await page.evaluate(() => window.scrollY)}`,
);
ok(
  "the hero heading is on screen on load",
  await page.evaluate(() => {
    const h1 = document.querySelector(".hero--split h1");
    return !!h1 && h1.getBoundingClientRect().top > 0;
  }),
);
ok(
  "nothing inside the tool has stolen focus",
  await page.evaluate(
    () =>
      !document
        .querySelector("[data-confidence]")
        ?.contains(document.activeElement),
  ),
);

console.log("\nEvery answer combination");
const matrix = await page.evaluate(() => {
  const root = document.querySelector("[data-confidence]");
  const values = (name) =>
    [...root.querySelectorAll(`input[name="${name}"]`)].map((i) => i.value);
  const next = root.querySelector("[data-next]");
  const restart = root.querySelector("[data-restart]");
  const step = () =>
    [...root.querySelectorAll("[data-step]")].find((s) => !s.hidden)?.dataset
      .step;
  const result = () =>
    [...root.querySelectorAll("[data-result]")].find((s) => !s.hidden)?.dataset
      .result;

  const rows = [];
  for (const source of values("source"))
    for (const precision of values("precision"))
      for (const agreement of values("agreement")) {
        const answers = { source, precision, agreement };
        restart.hidden = false;
        restart.click();
        let guard = 0;
        while (step() && guard++ < 6) {
          const id = step();
          root.querySelector(
            `input[name="${id}"][value="${answers[id]}"]`,
          ).checked = true;
          next.click();
          if (result()) break;
        }
        rows.push({ ...answers, result: result() ?? null });
      }
  return rows;
});

ok(
  `all ${matrix.length} combinations produce a result`,
  matrix.every((r) => r.result),
);
ok(
  "every result is one of the five published labels",
  matrix.every((r) => LABELS.includes(r.result)),
  [...new Set(matrix.map((r) => r.result))]
    .filter((r) => !LABELS.includes(r))
    .join(),
);
ok(
  "all five labels are reachable",
  LABELS.every((l) => matrix.some((r) => r.result === l)),
  LABELS.filter((l) => !matrix.some((r) => r.result === l)).join(),
);

const conflictAnswers = matrix.filter(
  (r) => r.agreement === "close" || r.agreement === "far",
);
ok(
  "a disagreement always outranks precision",
  conflictAnswers.every((r) => r.result === "conflicting"),
  conflictAnswers
    .filter((r) => r.result !== "conflicting")
    .slice(0, 3)
    .map((r) => `${r.source}/${r.precision}/${r.agreement} -> ${r.result}`)
    .join("; "),
);
ok(
  "conflicting is only ever produced by a disagreement",
  matrix
    .filter((r) => r.result === "conflicting")
    .every((r) => r.agreement === "close" || r.agreement === "far"),
);

const contradictions = matrix.filter(
  (r) =>
    (r.source === "unknown" || r.precision === "none") &&
    r.agreement !== "close" &&
    r.agreement !== "far",
);
ok(
  "a contradictory answer set resolves to Unknown, not to a confident label",
  contradictions.every((r) => r.result === "unknown"),
  contradictions
    .filter((r) => r.result !== "unknown")
    .slice(0, 3)
    .map((r) => `${r.source}/${r.precision} -> ${r.result}`)
    .join("; "),
);

ok(
  "Documented requires a document the reader has seen, at real precision",
  matrix
    .filter((r) => r.result === "documented")
    .every(
      (r) =>
        r.source === "document-seen" &&
        (r.precision === "minute" || r.precision === "quarter"),
    ),
);
ok(
  "a time passed on by someone who was not there never reads as documented or strongly remembered",
  matrix
    .filter((r) => r.source === "secondhand")
    .every((r) => ["approximate", "conflicting", "unknown"].includes(r.result)),
);

console.log("\nNo invented precision");
const resultText = await page.evaluate(() =>
  [...document.querySelectorAll("[data-result]")]
    .map((el) => el.textContent)
    .join(" "),
);
ok("no percentage appears in any result", !/\d\s*%/.test(resultText));
ok(
  "no result claims accuracy or certainty about the time itself",
  !/\b\d+\s*(percent|per cent)\b/i.test(resultText) &&
    !/\bguaranteed\b/i.test(resultText),
);
ok(
  "every result says a reading is still possible",
  await page.evaluate(() =>
    [...document.querySelectorAll("[data-result]")].every(
      (el) =>
        /Can you still book a reading\?/.test(el.textContent) &&
        /\bYes\b/.test(
          el.textContent
            .split("Can you still book a reading?")[1]
            ?.slice(0, 120) ?? "",
        ),
    ),
  ),
);
ok(
  "no result uses fear language about missing time",
  !/(impossible|useless|worthless|cannot be read|can't be read)/i.test(
    resultText,
  ),
  (resultText.match(/(impossible|useless|worthless)/i) || [])[0] ?? "",
);
ok(
  "only the Documented result leads with booking",
  await page.evaluate(() =>
    [...document.querySelectorAll("[data-result]")].every((el) => {
      const primary = el.querySelector(".finder__exits .btn--primary");
      const isDocumented = el.dataset.result === "documented";
      return isDocumented
        ? primary?.getAttribute("href")?.includes("/book/")
        : !primary?.getAttribute("href")?.includes("/book/");
    }),
  ),
);

console.log("\nNext steps resolve");
const links = await page.$$eval("[data-result] a[href]", (els) => [
  ...new Set(els.map((e) => e.getAttribute("href"))),
]);
const anchors = links.filter((h) => h.includes("#"));
const broken = [];
for (const href of links) {
  const res = await page.request.get(
    `http://localhost:${PORT}${href.split("#")[0]}`,
  );
  if (!res.ok()) broken.push(href);
}
ok(
  `all ${links.length} next-step links resolve`,
  broken.length === 0,
  broken.join("; "),
);

// The fragment is the part internal-link-check.mjs cannot see: it resolves
// paths, so a worksheet link keeps passing after the heading id it points at
// has been renamed. Checked here against the real built page.
const worksheetHtml = await (
  await page.request.get(
    `http://localhost:${PORT}/birth-time-toolkit/worksheets/`,
  )
).text();
const deadAnchors = anchors
  .map((h) => h.split("#")[1])
  .filter((id) => !worksheetHtml.includes(`id="${id}"`));
ok(
  `all ${anchors.length} worksheet anchors exist in the built page`,
  deadAnchors.length === 0,
  deadAnchors.join("; "),
);
ok(
  "every result points at a worksheet section",
  anchors.length >= 5,
  `${anchors.length}`,
);

console.log("\nReset and keyboard");
await page.goto(PAGE, { waitUntil: "load" });
await page.check('input[name="source"][value="present"]');
await page.click("[data-next]");
await page.check('input[name="precision"][value="hour"]');
await page.click("[data-next]");
await page.check('input[name="agreement"][value="single"]');
await page.click("[data-next]");
ok(
  "a result is shown",
  await page.isVisible('[data-result="strongly-remembered"]'),
);
ok(
  "focus moves to the result heading",
  await page.evaluate(() => document.activeElement?.tagName === "H3"),
  await page.evaluate(() => document.activeElement?.tagName ?? "none"),
);
// Scoped to the visible panel: there is one Start over button per result, and
// four of the five are inside hidden panels at any moment.
await page.click("[data-result]:not([hidden]) [data-restart-result]");
ok(
  "Start over returns to question one",
  await page.isVisible('[data-step="source"]'),
);
ok(
  "Start over clears every answer",
  await page.evaluate(
    () =>
      document.querySelectorAll("[data-confidence] input[type=radio]:checked")
        .length === 0,
  ),
);
ok(
  "the progress counter never changes its denominator",
  (await page.textContent("[data-progress]")).endsWith("of 3"),
  await page.textContent("[data-progress]"),
);
await page.click("[data-next]");
ok(
  "advancing without an answer asks rather than proceeding",
  (await page.textContent("[data-progress]")).includes("choose an answer") &&
    (await page.isVisible('[data-step="source"]')),
);

// Keyboard only, no mouse: the radios and the controls must be reachable and
// operable with Tab and Space alone.
await page.goto(PAGE, { waitUntil: "load" });
await page.focus('input[name="source"][value="document-seen"]');
await page.keyboard.press("Space");
await page.keyboard.press("Tab");
let guard = 0;
while (guard++ < 20) {
  const isNext = await page.evaluate(() =>
    document.activeElement?.hasAttribute("data-next"),
  );
  if (isNext) break;
  await page.keyboard.press("Tab");
}
await page.keyboard.press("Enter");
ok(
  "the flow advances by keyboard alone",
  await page.isVisible('[data-step="precision"]'),
);

console.log("\nAnalytics");
await page.goto(PAGE, { waitUntil: "load" });
await page.check('input[name="source"][value="document-seen"]');
await page.click("[data-next]");
await page.check('input[name="precision"][value="minute"]');
await page.click("[data-next]");
await page.check('input[name="agreement"][value="single"]');
await page.click("[data-next]");
const tracked = await trackedEvents();
ok(
  "the check reports a start and a completion",
  tracked.some((t) => t.name === "birthtime_check_start") &&
    tracked.some((t) => t.name === "birthtime_check_complete"),
  tracked.map((t) => t.name).join(),
);
ok(
  "the completion carries only the label",
  tracked
    .filter((t) => t.name === "birthtime_check_complete")
    .every(
      (t) =>
        LABELS.includes(t.params.result) && Object.keys(t.params).length === 1,
    ),
);
const payloadValues = tracked.flatMap((t) =>
  Object.values(t.params ?? {}).map(String),
);
ok(
  "no payload contains anything time-shaped or date-shaped",
  payloadValues.every((v) => !/\d{4,}|\d{1,2}[:/-]\d{1,2}/.test(v)),
  payloadValues.filter((v) => /\d{4,}|\d{1,2}[:/-]\d{1,2}/.test(v)).join("; "),
);
ok(
  "no answer combination is reported",
  !tracked.some((t) =>
    Object.values(t.params ?? {}).some((v) =>
      ["document-seen", "minute", "single", "present", "secondhand"].includes(
        String(v),
      ),
    ),
  ),
);

console.log("\nStorage and privacy");
const stored = await page.evaluate(() => ({
  local: Object.keys(localStorage),
  session: Object.keys(sessionStorage),
  search: location.search,
}));
ok(
  "the check writes nothing to browser storage",
  !stored.local.some((k) => k.includes("birth") || k.includes("confidence")) &&
    stored.session.length === 0,
  JSON.stringify(stored),
);
ok("no answers reach the URL", stored.search === "", stored.search);
ok(
  "the tool never asks for a date, time or place",
  await page.evaluate(
    () =>
      document.querySelectorAll(
        '[data-confidence] input:not([type="radio"]), [data-confidence] textarea, [data-confidence] select',
      ).length === 0,
  ),
);
ok(
  "no console errors during the run",
  consoleErrors.length === 0,
  consoleErrors[0] ?? "",
);

console.log("\nWithout JavaScript");
const noJs = await browser.newContext({ javaScriptEnabled: false });
const plain = await noJs.newPage();
await plain.goto(PAGE, { waitUntil: "load" });
ok(
  "all five results are in the served HTML, not built by script",
  (await plain.$$("[data-result]")).length === 5,
);
ok(
  "the no-script fallback points at the published scale",
  (await plain.content()).includes("#confidence-scale"),
);
await noJs.close();

await ctx.close();
await browser.close();
server.close();

console.log(
  `\nBirth Time Confidence: ${pass} passed, ${failures.length} failed`,
);
for (const f of failures) console.error(`  FAILED: ${f}`);
process.exit(failures.length ? 1 : 0);
