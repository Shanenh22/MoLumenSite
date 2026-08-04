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
  executablePath: "/opt/pw-browsers/chromium",
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

await browser.close();
server.close();

console.log(fail.length ? `\n${fail.length} FAILED` : "\nAll checks passed.");
process.exit(fail.length ? 1 : 0);
