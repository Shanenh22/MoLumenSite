/**
 * Walks the Reading Finder to a recommendation, follows "Book this reading",
 * and asserts the booking page actually pre-selects the recommended reading.
 *
 * Every path the finder can produce is tested, because the slug it emits is a
 * SERVICE slug while the booking radios are keyed by Cal.com EVENT — those two
 * vocabularies drifted apart when multi-price readings became separate rows.
 */
import http from "node:http";
import { chromiumPath } from "./lib/chromium-path.mjs";
import { createReadStream, statSync } from "node:fs";
import { extname, join } from "node:path";

const { chromium } = await import("playwright");
const PORT = 4410;
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
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

/** Every primary the finder's recommend() can return, and what should end up selected. */
const CASES = [
  ["natal", "natal-90"],
  ["relationship", "relationship"],
  ["solar-return", "solar-return"],
  ["life-changes", "life-changes"],
  ["monthly-transits", "monthly-transits"],
  ["quick-check-in", "quick-check-in"],
  ["want-more-clarity", "clarity-3mo"],
  // Also emitted by the CTAs on the service pages themselves.
  ["natal-90", "natal-90"],
  ["natal-60", "natal-60"],
  ["clarity", "clarity"],
  ["clarity-3mo", "clarity-3mo"],
];

const browser = await chromium.launch({
  executablePath: chromiumPath(),
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let fails = 0;

console.log("Handoff from Reading Finder to /book/");
for (const [slug, expected] of CASES) {
  await page.goto(`http://localhost:${PORT}/book/?service=${slug}`, {
    waitUntil: "load",
  });
  await page.waitForTimeout(1400); // let the smooth scroll settle
  const r = await page.evaluate(() => {
    const checked = document.querySelector(
      'input[name="booking-service"]:checked',
    );
    const label = checked?.closest("label");
    const box = label?.getBoundingClientRect();
    return {
      value: checked?.value ?? null,
      inView: box ? box.top >= 0 && box.bottom <= window.innerHeight : false,
      recommended: !!label?.classList.contains("is-recommended"),
      scrollY: window.scrollY,
    };
  });
  // Being selected is not enough — if the card is off-screen the visitor sees
  // a booking page and concludes the recommendation was ignored. That was the
  // reported symptom, so visibility is asserted, not just noted.
  const ok = r.value === expected && r.inView && r.recommended;
  if (!ok) fails++;
  console.log(
    `  ?service=${slug.padEnd(18)} selected=${String(r.value).padEnd(16)} inView=${String(r.inView).padEnd(5)} marked=${String(r.recommended).padEnd(5)} ${ok ? "PASS" : "FAIL"}`,
  );
}

await browser.close();
server.close();
console.log(
  fails
    ? `\n${fails} FAILING`
    : "\nEvery finder recommendation pre-selects correctly.",
);
process.exit(fails ? 1 : 0);
