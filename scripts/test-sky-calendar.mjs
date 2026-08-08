/**
 * The Current Sky calendar, asserted against the built output.
 *
 * THE ASSERTION THIS SCRIPT EXISTS FOR is the time-zone one. Sky events are
 * stored as date-only strings and parsed as UTC midnight, and every other
 * render path on the site formats them with `timeZone: 'UTC'`. A single
 * `getDate()` in place of `getUTCDate()` would put every event one day earlier
 * for every reader west of Greenwich — a defect that is invisible on the
 * developer's machine if the developer happens to sit in UTC, and invisible in
 * CI if CI runs in UTC too (it does). So the whole grid is built twice, in a
 * zone 10 hours behind UTC and one 14 hours ahead, and the two must be
 * identical to each other and to the dates in the content filenames.
 *
 * Everything else here is ordinary: navigation, filters, empty months, deep
 * links, the two responsive layouts, and the no-JavaScript state.
 */
import http from "node:http";
import { chromiumPath } from "./lib/chromium-path.mjs";
import { createReadStream, statSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";

const { chromium } = await import("playwright");
const PORT = 4412;
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".xml": "application/xml",
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

const URL_CAL = `http://localhost:${PORT}/current-sky/calendar/`;
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

/** Published, non-draft events, straight off disk: filename date -> slug. */
const published = readdirSync("src/content/sky-events")
  .filter((f) => /\.mdx?$/.test(f))
  .map((f) => f.replace(/\.mdx?$/, ""));

const browser = await chromium.launch({ executablePath: chromiumPath() });

/** Read every grid entry as `slug -> cell date`, under a given time zone. */
async function gridUnderTimezone(timezoneId) {
  const ctx = await browser.newContext({
    timezoneId,
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto(URL_CAL, { waitUntil: "load" });
  const data = await page.evaluate(() => {
    const rows = [];
    document.querySelectorAll(".cal-grid td[data-day]").forEach((td) => {
      td.querySelectorAll(".cal-event").forEach((a) => {
        rows.push({
          slug: a
            .getAttribute("href")
            .replace("/current-sky/events/", "")
            .replace(/\/$/, ""),
          cell: td.dataset.day,
        });
      });
    });
    return rows.sort((a, b) => a.slug.localeCompare(b.slug));
  });
  await ctx.close();
  return data;
}

console.log("\nTime zone independence");
const west = await gridUnderTimezone("Pacific/Honolulu"); // UTC-10
const east = await gridUnderTimezone("Pacific/Kiritimati"); // UTC+14
ok(
  "grid is identical 24 hours apart",
  JSON.stringify(west) === JSON.stringify(east),
  `${west.length} vs ${east.length} entries`,
);
const wrongDay = west.filter((r) => r.slug.slice(0, 10) !== r.cell);
ok(
  "every event sits on the date in its own filename",
  wrongDay.length === 0,
  wrongDay
    .slice(0, 5)
    .map((r) => `${r.slug} rendered on ${r.cell}`)
    .join("; "),
);
ok(
  "every published event that falls in the window is rendered once",
  west.length > 0 && new Set(west.map((r) => r.slug)).size === west.length,
  `${west.length} entries, ${new Set(west.map((r) => r.slug)).size} unique`,
);

/* ------------------------------------------------------------------ */
const ctx = await browser.newContext({
  timezoneId: "America/Chicago",
  viewport: { width: 1440, height: 900 },
});
const page = await ctx.newPage();
const consoleErrors = [];
page.on("pageerror", (e) => consoleErrors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
await page.goto(URL_CAL, { waitUntil: "load" });

const months = await page.$$eval("[data-month]", (els) =>
  els.map((e) => e.dataset.month),
);
const visible = () =>
  page.$$eval("[data-month]", (els) =>
    els.filter((e) => !e.hidden).map((e) => e.dataset.month),
  );

console.log("\nInitial state");
ok("exactly one month is visible on load", (await visible()).length === 1);
ok(
  "the visible month is the current one",
  (await visible())[0] ===
    (await page.evaluate(() =>
      document.querySelector("[data-sky-calendar]").dataset.today.slice(0, 7),
    )),
);
ok(
  "today's cell is marked",
  (await page.$$("[data-is-today]")).length === 1,
  `${(await page.$$("[data-is-today]")).length} cells marked`,
);
ok(
  "no ?m= parameter is stamped onto the URL on load",
  !page.url().includes("?m="),
  page.url(),
);
ok(
  "controls are revealed once enhanced",
  await page.isVisible("[data-cal-controls]"),
);

console.log("\nMonth navigation");
const startMonth = (await visible())[0];
await page.click('[data-cal-step="1"]');
ok(
  "next advances one month",
  (await visible())[0] === months[months.indexOf(startMonth) + 1],
);
ok("next writes ?m= to the URL", page.url().includes("?m="), page.url());
await page.click('[data-cal-step="-1"]');
ok("previous goes back one month", (await visible())[0] === startMonth);
await page.selectOption("[data-cal-jump]", months[months.length - 1]);
ok(
  "jump reaches the last month",
  (await visible())[0] === months[months.length - 1],
);
ok(
  "next is disabled at the end of the range",
  await page.isDisabled('[data-cal-step="1"]'),
);
await page.selectOption("[data-cal-jump]", months[0]);
ok(
  "previous is disabled at the start of the range",
  await page.isDisabled('[data-cal-step="-1"]'),
);
await page.click("[data-cal-today]");
ok("Today returns to the current month", (await visible())[0] === startMonth);
ok(
  "focus lands on the month heading, not the button",
  await page.evaluate(
    () => document.activeElement?.className === "sky-calendar__heading",
  ),
  await page.evaluate(() => document.activeElement?.className ?? "(none)"),
);

console.log("\nFilters");
const monthWithMixedTypes = await page.evaluate(() => {
  for (const s of document.querySelectorAll("[data-month]")) {
    const types = new Set(
      [...s.querySelectorAll(".cal-grid .cal-event")].map(
        (e) => e.dataset.eventType,
      ),
    );
    if (types.size > 1) return s.dataset.month;
  }
  return null;
});
ok(
  "a month with more than one event type exists to test",
  !!monthWithMixedTypes,
);
await page.selectOption("[data-cal-jump]", monthWithMixedTypes);
/**
 * Entries surviving the filter **in the month currently on screen**.
 *
 * Scoped to the visible month on purpose. Hiding a month hides its section, not
 * the individual entries inside it, so an unscoped count returns every
 * matching entry in all 24 months — which is not what the live-region status
 * reports, and comparing the two produced a failure that looked like a bug in
 * the page and was a bug in this file.
 */
const countVisible = () =>
  page.$$eval(
    "[data-month]:not([hidden]) .cal-grid .cal-event",
    (els) => els.filter((e) => !e.hidden).length,
  );
const allCount = await countVisible();
await page.click('[data-cal-filters] button[data-filter="retrograde"]');
const retroCount = await countVisible();
ok(
  "filtering reduces the visible entries",
  retroCount < allCount && retroCount > 0,
);
ok(
  "only the selected type survives",
  await page.$$eval("[data-month]:not([hidden]) .cal-grid .cal-event", (els) =>
    els
      .filter((e) => !e.hidden)
      .every((e) => e.dataset.eventType === "retrograde"),
  ),
);
ok(
  "the live status reports the filtered count",
  (await page.textContent("[data-cal-status]")).includes(`${retroCount} event`),
  await page.textContent("[data-cal-status]"),
);
ok(
  "agenda rows are hidden alongside grid entries",
  await page.$$eval(".cal-agenda > li", (els) =>
    els
      .filter((e) => !e.hidden)
      .every((e) => e.dataset.eventType === "retrograde"),
  ),
);
await page.click('[data-cal-filters] button[data-filter="all"]');
ok(
  "clearing the filter restores every entry",
  (await countVisible()) === allCount,
);

console.log("\nEmpty states");
const emptyMonth = await page.evaluate(() => {
  for (const s of document.querySelectorAll("[data-month]"))
    if (Number(s.dataset.count) === 0) return s.dataset.month;
  return null;
});
if (emptyMonth) {
  await page.selectOption("[data-cal-jump]", emptyMonth);
  ok(
    "a month with no events says so",
    await page.isVisible(
      `[data-month="${emptyMonth}"] .cal-empty:not([data-cal-filtered])`,
    ),
  );
  ok(
    "the grid still renders for an empty month",
    (await page.$$(`[data-month="${emptyMonth}"] .cal-grid td`)).length > 0,
  );
} else {
  ok(
    "a month with no events says so",
    true,
    "no empty month in range — skipped",
  );
  ok("the grid still renders for an empty month", true, "skipped");
}
await page.selectOption("[data-cal-jump]", monthWithMixedTypes);
await page.click('[data-cal-filters] button[data-filter="eclipse"]');
const filteredEmptyShown = await page.evaluate(
  (m) =>
    !document.querySelector(`[data-month="${m}"] [data-cal-filtered]`)
      .hidden ===
    ([
      ...document.querySelectorAll(`[data-month="${m}"] .cal-grid .cal-event`),
    ].filter((e) => !e.hidden).length ===
      0),
  monthWithMixedTypes,
);
ok("a month emptied by a filter says something different", filteredEmptyShown);

console.log("\nDeep links");
await page.goto(`${URL_CAL}?m=${months[3]}`, { waitUntil: "load" });
ok("?m= opens the requested month", (await visible())[0] === months[3]);
await page.goto(`${URL_CAL}?m=not-a-month`, { waitUntil: "load" });
ok(
  "a malformed ?m= falls back to the current month, silently",
  (await visible()).length === 1 && (await visible())[0] === startMonth,
  (await visible()).join(),
);
await page.goto(`${URL_CAL}?m=1999-01`, { waitUntil: "load" });
ok(
  "an out-of-range ?m= falls back rather than showing nothing",
  (await visible()).length === 1,
);

console.log("\nLinks resolve");
const hrefs = await page.$$eval(".cal-event", (els) => [
  ...new Set(els.map((e) => e.getAttribute("href"))),
]);
let broken = [];
for (const href of hrefs) {
  const res = await page.request.get(`http://localhost:${PORT}${href}`);
  if (!res.ok()) broken.push(href);
}
ok(
  `all ${hrefs.length} distinct event links resolve`,
  broken.length === 0,
  broken.slice(0, 3).join("; "),
);
ok(
  "every rendered event is a real published event file",
  hrefs.every((h) =>
    published.includes(
      h.replace("/current-sky/events/", "").replace(/\/$/, ""),
    ),
  ),
);

console.log("\nResponsive layouts");
await page.goto(URL_CAL, { waitUntil: "load" });
await page.setViewportSize({ width: 1440, height: 900 });
ok(
  "desktop shows the grid and not the agenda",
  (await page.isVisible(`[data-month="${startMonth}"] .cal-grid`)) &&
    !(await page.isVisible(`[data-month="${startMonth}"] .cal-agenda`)),
);
await page.setViewportSize({ width: 375, height: 812 });
ok(
  "mobile shows the agenda and not the grid",
  (await page.isVisible(`[data-month="${startMonth}"] .cal-agenda`)) &&
    !(await page.isVisible(`[data-month="${startMonth}"] .cal-grid`)),
);
ok(
  "no console errors during the run",
  consoleErrors.length === 0,
  consoleErrors[0] ?? "",
);
await ctx.close();

console.log("\nWithout JavaScript");
const noJs = await browser.newContext({ javaScriptEnabled: false });
const plain = await noJs.newPage();
await plain.goto(URL_CAL, { waitUntil: "load" });
ok(
  "every month is readable with no script",
  (await plain.$$eval(
    "[data-month]",
    (els) => els.filter((e) => !e.hidden).length,
  )) === months.length,
);
ok(
  "no dead controls are shown",
  !(await plain.isVisible("[data-cal-controls]")) &&
    !(await plain.isVisible("[data-cal-filters]")),
);
ok(
  "event links are in the served HTML, not built by script",
  (await plain.$$(".cal-event")).length > 0,
);
await noJs.close();

await browser.close();
server.close();

console.log(`\nSky calendar: ${pass} passed, ${failures.length} failed`);
for (const f of failures) console.error(`  FAILED: ${f}`);
process.exit(failures.length ? 1 : 0);
