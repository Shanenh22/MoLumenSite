/**
 * The rising-sign display preference.
 *
 * TWO ASSERTIONS HERE MATTER MORE THAN THE REST.
 *
 * **No sign ever reaches analytics.** `mlTrack` sanitises anything resembling
 * an email, a date or a time, and it would not catch "virgo" — a short,
 * non-numeric string that passes straight through. So the rule that the sign is
 * never reported is held at the call site, and the only thing that can keep it
 * held is a test that drives every path and inspects every payload.
 *
 * **All twelve cards stay in the served HTML.** The preference reorders; it
 * never hides, removes or gates. If that ever stops being true the page starts
 * showing a crawler something different from a reader, and the whole reason
 * this could be done without SEO risk goes away.
 */
import http from "node:http";
import { chromiumPath } from "./lib/chromium-path.mjs";
import { createReadStream, statSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";

const { chromium } = await import("playwright");
const PORT = 4414;
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
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

const ZODIAC = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];
const KEY = "ml-rising-v1";
const base = `http://localhost:${PORT}`;
const HOROSCOPES = `${base}/horoscopes/`;

/** A published lunation page, found rather than hard-coded so it cannot rot. */
const lunationSlug = readdirSync("src/content/sky-events")
  .filter((f) => /new-moon|full-moon/.test(f))
  .map((f) => f.replace(/\.mdx?$/, ""))
  .sort()
  .reverse()[0];
/** A retrograde, which must render no guidance block at all. */
const retrogradeSlug = readdirSync("src/content/sky-events")
  .filter((f) => /retrograde/.test(f))
  .map((f) => f.replace(/\.mdx?$/, ""))
  .sort()
  .reverse()[0];
const EVENT = `${base}/current-sky/events/${lunationSlug}/`;
const RETROGRADE = `${base}/current-sky/events/${retrogradeSlug}/`;

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

const browser = await chromium.launch({ executablePath: chromiumPath() });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
// Google's tag is blocked so nothing leaves the machine; `gtag` is still
// defined by BaseLayout's inline bootstrap, which is all mlTrack needs to fire
// into dataLayer, where these assertions read it from.
await ctx.route("**://www.googletagmanager.com/**", (r) => r.abort());
const page = await ctx.newPage();
const consoleErrors = [];
page.on("pageerror", (e) => consoleErrors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error" && !/ERR_FAILED|googletagmanager/.test(m.text()))
    consoleErrors.push(m.text());
});

const signOrder = () =>
  page.$$eval("[data-rising-grid]", (grids) =>
    grids.map((g) =>
      [...g.querySelectorAll("[data-sign]")].map((c) => c.dataset.sign),
    ),
  );
const stored = () => page.evaluate((k) => localStorage.getItem(k), KEY);
const tracked = () =>
  page.evaluate(() =>
    (window.dataLayer || [])
      .map((a) => Array.from(a))
      .filter((a) => a[0] === "event")
      .map((a) => ({ name: a[1], params: a[2] ?? {} })),
  );

console.log("\nDefault state");
await page.goto(EVENT, { waitUntil: "load" });
let order = await signOrder();
ok(
  "the guidance grid renders all twelve signs",
  order.every((g) => g.length === 12),
);
ok(
  "with no preference the order is zodiacal",
  order.every((g) => g.join() === ZODIAC.join()),
  order[0]?.join(),
);
ok("nothing is stored before a choice is made", (await stored()) === null);
ok(
  "no card is marked as the reader's",
  (await page.$$(".is-yours")).length === 0,
);

console.log("\nSelect");
await page.click('[data-rising="virgo"]');
order = await signOrder();
ok(
  "the chosen sign moves to first position",
  order.every((g) => g[0] === "virgo"),
);
ok(
  "all twelve are still present after reordering",
  order.every((g) => g.length === 12 && new Set(g).size === 12),
);
ok(
  "the other eleven keep zodiacal order behind it",
  order.every(
    (g) => g.slice(1).join() === ZODIAC.filter((s) => s !== "virgo").join(),
  ),
  order[0]?.slice(1).join(),
);
ok("the choice is stored", (await stored()) === "virgo");
ok(
  "the chosen chip reports its pressed state",
  await page.evaluate(
    () =>
      document
        .querySelector('[data-rising="virgo"]')
        .getAttribute("aria-pressed") === "true" &&
      [...document.querySelectorAll("[data-rising]")].filter(
        (b) => b.getAttribute("aria-pressed") === "true",
      ).length === 1,
  ),
);
ok(
  "the card is marked by text, not only by colour",
  await page.evaluate(() => {
    const card = document.querySelector(".is-yours");
    const badge = card?.querySelector("[data-yours-badge]");
    return !!badge && !badge.hidden && /yours/i.test(badge.textContent);
  }),
);
ok(
  "the change is announced politely, not assertively",
  await page.evaluate(() => {
    const live = document.querySelector("[data-rising-status]");
    return (
      live?.getAttribute("aria-live") === "polite" &&
      /virgo/i.test(live.textContent ?? "")
    );
  }),
  await page.textContent("[data-rising-status]"),
);
ok(
  "the announcement says the other signs are still there",
  /still listed/i.test((await page.textContent("[data-rising-status]")) ?? ""),
);

console.log("\nPersist");
await page.goto(EVENT, { waitUntil: "load" });
ok(
  "the preference survives a reload",
  (await signOrder()).every((g) => g[0] === "virgo"),
);
await page.goto(HOROSCOPES, { waitUntil: "load" });
const horoscopeOrder = await signOrder();
ok(
  "the preference applies on /horoscopes/ too",
  horoscopeOrder.length > 0 && horoscopeOrder.every((g) => g[0] === "virgo"),
  `${horoscopeOrder.length} grids`,
);
ok(
  "one control drives every lunation block on the page",
  (await page.$$("[data-rising-picker]")).length === 1 &&
    horoscopeOrder.length > 1,
  `${(await page.$$("[data-rising-picker]")).length} pickers, ${horoscopeOrder.length} grids`,
);

console.log("\nChange");
await page.click('[data-rising="aries"]');
order = await signOrder();
ok(
  "the new sign leads",
  order.every((g) => g[0] === "aries"),
);
ok(
  "the previous sign returns to its own zodiacal position",
  order.every((g) => g.indexOf("virgo") === ZODIAC.indexOf("virgo")),
  `virgo at ${order[0]?.indexOf("virgo")}, expected ${ZODIAC.indexOf("virgo")}`,
);
ok(
  "only one card is marked",
  (await page.$$(".is-yours")).length === horoscopeOrder.length,
);
ok("the stored value is replaced, not appended", (await stored()) === "aries");

console.log("\nClear");
await page.click("[data-rising-clear]");
ok(
  "clearing restores zodiacal order",
  (await signOrder()).every((g) => g.join() === ZODIAC.join()),
);
ok("clearing removes the key entirely", (await stored()) === null);
ok("no card stays marked", (await page.$$(".is-yours")).length === 0);
ok(
  "no chip stays pressed",
  await page.evaluate(() =>
    [...document.querySelectorAll("[data-rising]")].every(
      (b) => b.getAttribute("aria-pressed") === "false",
    ),
  ),
);

console.log("\nInvalid stored values");
for (const junk of ["ophiuchus", "", "VIRGO", "1", '{"sign":"virgo"}']) {
  await page.evaluate(([k, v]) => localStorage.setItem(k, v), [KEY, junk]);
  await page.goto(EVENT, { waitUntil: "load" });
  const o = await signOrder();
  const cleared = (await stored()) === null;
  ok(
    `a stored value of ${JSON.stringify(junk)} is ignored and cleared`,
    o.every((g) => g.join() === ZODIAC.join()) && cleared,
    `order ok: ${o[0]?.join() === ZODIAC.join()}, cleared: ${cleared}`,
  );
}

console.log("\nStorage unavailable");
const denied = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
await denied.route("**://www.googletagmanager.com/**", (r) => r.abort());
await denied.addInitScript(() => {
  /**
   * Private-browsing behaviour: the API is present and every call throws.
   *
   * Replacing `window.localStorage` itself was tried first and does not work —
   * the property has only a getter, so the assignment throws and the stub never
   * takes effect, leaving storage perfectly functional while the test appears
   * to be exercising the failure path. Patching the prototype is what actually
   * denies it.
   */
  const boom = () => {
    throw new DOMException("denied", "SecurityError");
  };
  Storage.prototype.getItem = boom;
  Storage.prototype.setItem = boom;
  Storage.prototype.removeItem = boom;
});
const deniedPage = await denied.newPage();
const deniedErrors = [];
/**
 * Third-party frames are excluded, and one of them is worth naming.
 *
 * Kit's embed script (f.convertkit.com/ckjs/ck.5.js) responds to storage being
 * unavailable by attempting `window.localStorage = …`, which throws because the
 * property has only a getter. That is Kit's behaviour in any storage-denied
 * browser, it predates this work, and there is nothing in this repository that
 * can fix it. What this assertion is for is that *our* scripts degrade quietly,
 * so it filters on the originating file rather than swallowing everything.
 */
const isOurs = (text) =>
  !/convertkit|googletagmanager|cal\.com|ytimg|youtube/.test(text);
deniedPage.on("pageerror", (e) => {
  const detail = `${e.message}\n${e.stack ?? ""}`;
  if (isOurs(detail)) deniedErrors.push(e.message);
});
deniedPage.on("console", (m) => {
  if (m.type() === "error" && !/ERR_FAILED/.test(m.text()) && isOurs(m.text()))
    deniedErrors.push(m.text());
});
await deniedPage.goto(EVENT, { waitUntil: "load" });
ok(
  "the storage denial is real, not a no-op stub",
  await deniedPage.evaluate(() => {
    try {
      localStorage.getItem("probe");
      return false;
    } catch {
      return true;
    }
  }),
);
await deniedPage.click('[data-rising="leo"]');
ok(
  "the picker still works for the visit when storage throws",
  await deniedPage.evaluate(
    () =>
      document.querySelector("[data-rising-grid] [data-sign]")?.dataset.sign ===
      "leo",
  ),
);
ok(
  "storage being denied throws nothing from our own scripts",
  deniedErrors.length === 0,
  deniedErrors[0] ?? "",
);
ok(
  "the preference is simply not remembered, rather than half-applied",
  await deniedPage.evaluate(() => {
    const state = document.querySelector("[data-rising-state]");
    return !state.hidden && /leo/i.test(state.textContent ?? "");
  }),
);
await denied.close();

console.log("\nKeyboard");
await page.goto(EVENT, { waitUntil: "load" });
await page.focus('[data-rising="libra"]');
await page.keyboard.press("Enter");
ok(
  "a chip can be operated with Enter",
  (await signOrder()).every((g) => g[0] === "libra"),
);
await page.focus('[data-rising="pisces"]');
await page.keyboard.press("Space");
ok(
  "a chip can be operated with Space",
  (await signOrder()).every((g) => g[0] === "pisces"),
);
ok(
  "focus is not stolen from the chip the reader pressed",
  await page.evaluate(
    () => document.activeElement?.getAttribute("data-rising") === "pisces",
  ),
  await page.evaluate(() => document.activeElement?.tagName ?? "none"),
);

console.log("\nAnalytics");
const events = await tracked();
const risingEvents = events.filter((e) => e.name.startsWith("rising_sign"));
ok(
  "selecting and changing report different events",
  risingEvents.some((e) => e.name === "rising_sign_selected") &&
    risingEvents.some((e) => e.name === "rising_sign_changed"),
  risingEvents.map((e) => e.name).join(),
);
const allValues = events.flatMap((e) =>
  Object.values(e.params ?? {}).map(String),
);
ok(
  "no payload anywhere contains a zodiac sign",
  allValues.every((v) => !ZODIAC.includes(v.toLowerCase())),
  allValues.filter((v) => ZODIAC.includes(v.toLowerCase())).join("; "),
);
ok(
  "no payload contains anything date- or time-shaped",
  allValues.every((v) => !/\d{4,}|\d{1,2}[:/-]\d{1,2}/.test(v)),
);
ok(
  "no console errors during the run",
  consoleErrors.length === 0,
  consoleErrors[0] ?? "",
);

console.log("\nContent without a lunation sign");
await page.goto(RETROGRADE, { waitUntil: "load" });
ok(
  `a retrograde renders no guidance block (${retrogradeSlug})`,
  (await page.$$("[data-rising-grid]")).length === 0 &&
    (await page.$$("[data-rising-picker]")).length === 0,
);

console.log("\nWithout JavaScript");
const noJs = await browser.newContext({ javaScriptEnabled: false });
const plain = await noJs.newPage();
await plain.goto(EVENT, { waitUntil: "load" });
const plainOrder = await plain.$$eval("[data-rising-grid]", (grids) =>
  grids.map((g) =>
    [...g.querySelectorAll("[data-sign]")].map((c) => c.dataset.sign),
  ),
);
ok(
  "all twelve cards are in the served HTML",
  plainOrder.length === 1 && plainOrder[0].join() === ZODIAC.join(),
);
ok(
  "nothing is hidden from a reader without script",
  (await plain.$$eval(
    "[data-sign]",
    (els) => els.filter((e) => e.hidden).length,
  )) === 0,
);
await plain.goto(HOROSCOPES, { waitUntil: "load" });
ok(
  "the /horoscopes/ module is real content, not script output",
  (await plain.$$("[data-rising-grid] [data-sign]")).length >= 12,
);
await noJs.close();

await ctx.close();
await browser.close();
server.close();

console.log(
  `\nRising sign preference: ${pass} passed, ${failures.length} failed`,
);
for (const f of failures) console.error(`  FAILED: ${f}`);
process.exit(failures.length ? 1 : 0);
