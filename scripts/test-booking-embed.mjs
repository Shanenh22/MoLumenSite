/**
 * Verifies the booking embed actually works, without reaching Cal.com.
 *
 * app.cal.com/embed/embed.js is intercepted and replaced with a stub that
 * drains Cal's queue exactly the way the real script does. That proves the
 * loader stub is correct — which is what broke the first time: embed.js does
 * not define window.Cal itself, so loading it directly left Cal undefined and
 * the "calendar could not load" path fired every time.
 *
 * Run: node scripts/test-booking-embed.mjs   (needs npm run audit:install)
 */
import http from "node:http";
import { chromiumPath } from "./lib/chromium-path.mjs";
import { createReadStream, statSync } from "node:fs";
import { extname, join } from "node:path";

async function requireTool(name) {
  try {
    return await import(name);
  } catch {
    console.error(
      `\n[test] "${name}" is not installed. Run: npm run audit:install\n`,
    );
    process.exit(1);
  }
}
const { chromium } = await requireTool("playwright");

const PORT = 4402;
const ROOT = "dist";
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
};
const server = http.createServer((req, res) => {
  let file = join(ROOT, decodeURIComponent(req.url.split("?")[0]));
  try {
    if (statSync(file).isDirectory()) file = join(file, "index.html");
  } catch {
    res.writeHead(404);
    return res.end("nope");
  }
  res.writeHead(200, {
    "Content-Type": MIME[extname(file)] || "application/octet-stream",
  });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch({
  executablePath: chromiumPath(),
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let embedRequested = false;
await page.route("**/embed/embed.js", async (route) => {
  embedRequested = true;
  // Stand in for Cal's real script: drain the queue the stub built.
  await route.fulfill({
    status: 200,
    contentType: "text/javascript",
    body: `
      (function () {
        window.__calCalls = [];
        var queued = (window.Cal && window.Cal.q) || [];
        function handler() { window.__calCalls.push(Array.from(arguments)); }
        handler.q = []; handler.ns = {}; handler.loaded = true;
        queued.forEach(function (args) { handler.apply(null, args); });
        window.Cal = handler;
        var mount = document.querySelector('#cal-mount');
        if (mount) { var f = document.createElement('div'); f.className='fake-cal'; f.textContent='calendar'; mount.appendChild(f); }
      })();
    `,
  });
});

const fail = [];
const ok = (cond, label) => {
  console.log(`  ${cond ? "PASS" : "FAIL"}  ${label}`);
  if (!cond) fail.push(label);
};

await page.goto(`http://localhost:${PORT}/book/`, { waitUntil: "load" });

console.log("\nBooking list");
const labels = await page.$$eval('input[name="booking-service"]', (els) =>
  els.map((e) => e.value),
);
ok(labels.length === 9, `9 bookable choices rendered (got ${labels.length})`);
ok(
  labels.includes("natal-60") && labels.includes("natal-90"),
  "natal 60 and 90 are separate rows",
);
ok(
  labels.includes("clarity") && labels.includes("clarity-3mo"),
  "both clarity tiers are separate rows",
);
ok(
  (await page.$$("[data-options-for]")).length === 0,
  "no secondary option picker remains",
);

/**
 * The default selection on a bare /book/.
 *
 * This is the state every visitor who clicks the persistent header CTA sees,
 * and until now nothing asserted it — the checks below deliberately set the
 * radio themselves first, so the page shipped for months opening on the $275
 * Relationship Consultation (a `featured` tie broken by collection order) with
 * this suite green at 18/18.
 */
console.log("\nDefault selection on a bare /book/");
const defaultChecked = await page.$eval(
  'input[name="booking-service"]:checked',
  (el) => el.value,
);
ok(
  defaultChecked === "natal-90",
  `bare /book/ selects natal-90 (got ${defaultChecked})`,
);
ok(
  (await page.$$('input[name="booking-service"]:checked')).length === 1,
  "exactly one reading is selected by default",
);

console.log("\nBefore interaction");
ok(!embedRequested, "Cal.com script not requested on page load");
ok(await page.isVisible("[data-load-embed]"), "load button visible");

console.log('\nAfter pressing "Show available times"');
await page.check('input[name="booking-service"][value="natal-90"]');
await page.click("[data-load-embed]");
await page.waitForTimeout(1200);
ok(embedRequested, "Cal.com script requested only after the click");
ok(
  await page.evaluate(() => typeof window.Cal === "function"),
  "window.Cal is defined",
);

const calls = await page.evaluate(() => window.__calCalls || []);
const names = calls.map((c) => c[0]);
ok(names.includes("init"), 'Cal("init") called');
ok(names.includes("inline"), 'Cal("inline") called');
ok(names.includes("ui"), 'Cal("ui") called');

const inline = calls.find((c) => c[0] === "inline");
ok(
  inline?.[1]?.calLink === "molumen/natal-90",
  `calLink is molumen/natal-90 (got ${inline?.[1]?.calLink})`,
);
ok(inline?.[1]?.elementOrSelector === "#cal-mount", "mounts into #cal-mount");

const failedMsg = await page.textContent("[data-cal-mount]");
ok(!/could not load/i.test(failedMsg || ""), 'no "could not load" message');
ok(
  (await page.$$(".fake-cal")).length === 1,
  "calendar rendered into the mount",
);

console.log("\nSwitching reading reloads the calendar");
await page.check('input[name="booking-service"][value="natal-60"]');
await page.waitForTimeout(800);
const calls2 = await page.evaluate(() => window.__calCalls || []);
const lastInline = [...calls2].reverse().find((c) => c[0] === "inline");
ok(
  lastInline?.[1]?.calLink === "molumen/natal-60",
  `switching to the 60-minute reading re-points at molumen/natal-60 (got ${lastInline?.[1]?.calLink})`,
);

console.log("\nFallback link tracks the selection");
const href = await page.getAttribute("[data-booking-fallback]", "href");
ok(
  href === "https://cal.com/molumen/natal-60",
  `fallback href is the 60-minute event (got ${href})`,
);

/**
 * Deep links still override the default.
 *
 * Every event key and every service slug the site emits, checked against the
 * radio that ends up selected. The default is natal-90, so a case that
 * "passes" by doing nothing would be invisible for natal-90 alone — which is
 * why the natal-60 case matters most here.
 */
console.log("\nDeep links override the default");
const DEEP_LINKS = [
  ["natal-60", "natal-60"],
  ["natal-90", "natal-90"],
  ["natal", "natal-90"],
  ["relationship", "relationship"],
  ["clarity", "clarity"],
  ["clarity-3mo", "clarity-3mo"],
  ["want-more-clarity", "clarity-3mo"],
  ["solar-return", "solar-return"],
  ["life-changes", "life-changes"],
  ["quick-check-in", "quick-check-in"],
  ["monthly-transits", "monthly-transits"],
];
for (const [query, expected] of DEEP_LINKS) {
  await page.goto(`http://localhost:${PORT}/book/?service=${query}`, {
    waitUntil: "load",
  });
  await page.waitForTimeout(120);
  const got = await page.$eval(
    'input[name="booking-service"]:checked',
    (el) => el.value,
  );
  ok(got === expected, `?service=${query} selects ${expected} (got ${got})`);
}

/**
 * Successful-booking measurement, without creating a real appointment.
 *
 * The stub replays Cal.com's documented embed callback shape: the component
 * registers `on: { action: "bookingSuccessfulV2", callback }` through the Cal
 * queue, and the stub invokes that callback with a payload carrying the fields
 * a real booking would — including personal data, deliberately, so the
 * assertion that none of it reaches dataLayer is testing something real.
 *
 * dataLayer is read rather than a stubbed mlTrack, because BaseLayout defines
 * the real helper in an inline script that overwrites any earlier stub — the
 * trap already recorded in docs/session-handoff.md.
 */
console.log("\nSuccessful booking is measured, and carries nothing personal");
await page.goto(`http://localhost:${PORT}/book/?service=natal-60`, {
  waitUntil: "load",
});
await page.click("[data-load-embed]");
await page.waitForTimeout(800);

const bookingEvents = await page.evaluate(() => {
  const on = (window.__calCalls || []).filter((c) => c[0] === "on");
  const handler = on.find(
    (c) => c[1]?.action === "bookingSuccessfulV2",
  )?.[1]?.callback;
  if (typeof handler !== "function") return { registered: false };
  handler({
    type: "bookingSuccessfulV2",
    namespace: "",
    data: {
      uid: "abc123XYZ",
      title: "Natal Chart Reading between Mo Lumen and Jane Doe",
      startTime: "2026-09-01T15:00:00.000Z",
      endTime: "2026-09-01T16:00:00.000Z",
      eventType: { slug: "natal-60" },
      attendees: [
        { name: "Jane Doe", email: "jane.doe@example.com", phone: "+15125550123" },
      ],
      responses: {
        notes: "Born 1988-04-12 at 3:42 in Austin TX",
        location: "Zoom",
      },
      paymentRequired: true,
    },
  });
  return {
    registered: true,
    events: (window.dataLayer || [])
      .filter((a) => a[0] === "event")
      .map((a) => [a[1], a[2]]),
  };
});

ok(bookingEvents.registered, "bookingSuccessfulV2 handler is registered with Cal");
const complete = (bookingEvents.events || []).filter(
  ([name]) => name === "booking_complete",
);
ok(complete.length === 1, `booking_complete fired exactly once (got ${complete.length})`);
ok(
  complete[0]?.[1]?.service === "natal-60",
  `booking_complete carries the event key (got ${complete[0]?.[1]?.service})`,
);

/* The payload above contains a name, an email, a phone number, a booking UID,
   an appointment time and a birth date/time/place in the notes. None of it may
   appear anywhere in any analytics event on the page. */
const serialised = JSON.stringify(bookingEvents.events || []);
const FORBIDDEN = [
  ["Jane Doe", "attendee name"],
  ["jane.doe@example.com", "attendee email"],
  ["5125550123", "attendee phone"],
  ["abc123XYZ", "booking uid"],
  ["2026-09-01", "appointment date"],
  ["1988-04-12", "birth date"],
  ["3:42", "birth time"],
  ["Austin", "birth place"],
];
for (const [needle, label] of FORBIDDEN) {
  ok(!serialised.includes(needle), `no ${label} in analytics`);
}
ok(
  Object.keys(complete[0]?.[1] ?? {}).every((k) => k === "service"),
  `booking_complete carries only "service" (got ${Object.keys(complete[0]?.[1] ?? {}).join(", ")})`,
);

/**
 * The phone booking page.
 *
 * Asserted here rather than eyeballed because the in-app browser's mobile
 * emulation applies its viewport AFTER the page's modules run, so a hand check
 * reports the collapse as broken on some loads and working on others. A real
 * Playwright viewport is set before navigation, which is the only way to know.
 *
 * Two things matter and they pull against each other: the follow-up group must
 * collapse so a first-time visitor sees three relevant choices instead of
 * nine, AND the default must survive that collapse — natal-90 lives in the
 * first group, so a change that moved it would hide the default selection
 * behind a toggle and leave the page looking like nothing was chosen.
 */
console.log("\nOn a phone (390x844)");
const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
await phone.goto(`http://localhost:${PORT}/book/`, { waitUntil: "load" });
await phone.waitForTimeout(300);
const mobile = await phone.evaluate(() => {
  const g2 = document.querySelector('[data-group-index="1"]');
  const btn = document.querySelector("[data-load-embed]");
  const checked = document.querySelector('input[name="booking-service"]:checked');
  return {
    checked: checked?.value,
    checkedVisible: checked?.closest("label")?.offsetParent !== null,
    collapsed: g2?.dataset.collapsed,
    toggle: document.querySelector(".booking-group__toggle")?.textContent ?? null,
    visible: [...document.querySelectorAll("label.choice--book")].filter(
      (l) => l.offsetParent !== null,
    ).length,
    calendarTop: Math.round(btn.getBoundingClientRect().top + window.scrollY),
  };
});
ok(mobile.checked === "natal-90", `default is still natal-90 on mobile (got ${mobile.checked})`);
ok(mobile.checkedVisible, "the default selection is not hidden inside the collapsed group");
ok(mobile.collapsed === "true", `follow-up group starts collapsed (got ${mobile.collapsed})`);
ok(mobile.visible === 3, `3 readings visible before expanding (got ${mobile.visible})`);
ok(
  /Show 6 follow-up readings/.test(mobile.toggle || ""),
  `toggle offers the 6 follow-ups (got ${mobile.toggle})`,
);
ok(
  mobile.calendarTop < 844 * 2,
  `"Show available times" within two screens (got ${mobile.calendarTop}px)`,
);

/* Expanding must reveal all nine and keep the default selected. */
await phone.click(".booking-group__toggle");
await phone.waitForTimeout(150);
const expanded = await phone.evaluate(() => ({
  visible: [...document.querySelectorAll("label.choice--book")].filter(
    (l) => l.offsetParent !== null,
  ).length,
  checked: document.querySelector('input[name="booking-service"]:checked')?.value,
  expanded: document.querySelector(".booking-group__toggle")?.getAttribute("aria-expanded"),
}));
ok(expanded.visible === 9, `expanding shows all nine (got ${expanded.visible})`);
ok(expanded.checked === "natal-90", "expanding does not change the selection");
ok(expanded.expanded === "true", "toggle reports aria-expanded=true");

/* A deep link into the collapsed group must force it open — otherwise the
   radio is display:none and the visitor sees no confirmation at all. */
await phone.goto(`http://localhost:${PORT}/book/?service=quick-check-in`, {
  waitUntil: "load",
});
await phone.waitForTimeout(300);
const deep = await phone.evaluate(() => {
  const checked = document.querySelector('input[name="booking-service"]:checked');
  return {
    value: checked?.value,
    visible: checked?.closest("label")?.offsetParent !== null,
    collapsed: document.querySelector('[data-group-index="1"]')?.dataset.collapsed ?? "unset",
  };
});
ok(deep.value === "quick-check-in", `deep link into the second group selects it (got ${deep.value})`);
ok(deep.visible, "a deep-linked follow-up is visible, not hidden by the collapse");
await phone.close();

await browser.close();
server.close();

console.log(fail.length ? `\n${fail.length} FAILED` : "\nAll checks passed.");
process.exit(fail.length ? 1 : 0);
