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

/**
 * Drive the finder itself, end to end, in the browser.
 *
 * The handoff cases above start at /book/ with a query string, so they prove
 * the mapping and nothing about whether the finder still produces those
 * slugs. These walk the real five questions.
 */
const ok = (cond, label) => {
  console.log(`  ${cond ? "PASS" : "FAIL"}  ${label}`);
  if (!cond) fails++;
};

/** [name, label] answers per step, then what the result should offer. */
const WALKS = [
  {
    name: "new client, 60 minutes",
    answers: { focus: "crossroads", who: "new", depth: "focused", birthtime: "yes", when: "soon" },
    expectBook: "/book/?service=natal-60",
    expectNurture: false,
  },
  {
    name: "new client, 90 minutes",
    answers: { focus: "patterns", who: "new", depth: "full", birthtime: "yes", when: "soon" },
    expectBook: "/book/?service=natal-90",
    expectNurture: false,
  },
  {
    name: "new client, unsure of length",
    answers: { focus: "season", who: "new", depth: "unsure", birthtime: "no", when: "months" },
    expectBook: "/book/?service=natal-90",
    expectNurture: false,
  },
  {
    name: "relationship",
    answers: { focus: "relationship", who: "new", depth: "full", birthtime: "yes", when: "soon" },
    expectBook: "/book/?service=relationship",
    expectNurture: false,
  },
  {
    name: "returning — deeper",
    answers: { focus: "patterns", who: "established", "est-need": "deeper", birthtime: "yes", when: "soon" },
    expectBook: "/book/?service=want-more-clarity",
    expectNurture: false,
  },
  {
    name: "returning — year ahead",
    answers: { focus: "crossroads", who: "established", "est-need": "year", birthtime: "yes", when: "soon" },
    expectBook: "/book/?service=solar-return",
    expectNurture: false,
  },
  {
    name: "returning — navigating change",
    answers: { focus: "season", who: "established", "est-need": "change", birthtime: "yes", when: "soon" },
    expectBook: "/book/?service=life-changes",
    expectNurture: false,
  },
  {
    name: "returning — monthly",
    answers: { focus: "curious", who: "established", "est-need": "monthly", birthtime: "yes", when: "soon" },
    expectBook: "/book/?service=monthly-transits",
    expectNurture: false,
  },
  {
    name: "returning — one topic",
    answers: { focus: "curious", who: "established", "est-need": "one-topic", birthtime: "yes", when: "soon" },
    expectBook: "/book/?service=quick-check-in",
    expectNurture: false,
  },
  {
    name: "still exploring — nurture path",
    answers: { focus: "curious", who: "new", depth: "unsure", birthtime: "approx", when: "exploring" },
    expectBook: "/book/?service=natal-90",
    expectNurture: true,
  },
];

console.log("\nWalking the finder itself");
for (const walk of WALKS) {
  await page.goto(`http://localhost:${PORT}/reading-finder/`, { waitUntil: "load" });
  const r = await page.evaluate((answers) => {
    const form = document.querySelector("[data-finder] form");
    const next = document.querySelector("[data-next]");
    // Follow whichever step is actually visible rather than assuming an
    // order, so a routing change surfaces as a failure here instead of a
    // silently skipped answer.
    for (let i = 0; i < 8; i++) {
      const step = [...document.querySelectorAll("[data-step]")].find((el) => !el.hidden);
      if (!step) break;
      const name = step.querySelector("input").name;
      const value = answers[name];
      if (value === undefined) break;
      const input = form.querySelector(`input[name="${name}"][value="${value}"]`);
      if (!input) return { error: `no option ${name}=${value}` };
      input.checked = true;
      next.click();
    }
    const result = document.querySelector("[data-result]");
    const nurture = document.querySelector("[data-finder-nurture]");
    return {
      resultShown: !result.hidden,
      exits: [...result.querySelectorAll(".finder__exits a")].map((a) => a.getAttribute("href")),
      nurtureVisible: nurture ? !nurture.hidden : null,
      events: (window.dataLayer || [])
        .filter((a) => a[0] === "event")
        .map((a) => [a[1], a[2]]),
    };
  }, walk.answers);

  if (r.error) {
    ok(false, `${walk.name}: ${r.error}`);
    continue;
  }
  const bookHref = (r.exits || []).find((h) => h && h.startsWith("/book/"));
  ok(
    r.resultShown && bookHref === walk.expectBook,
    `${walk.name} → ${walk.expectBook} (got ${bookHref})`,
  );
  ok(
    r.nurtureVisible === walk.expectNurture,
    `${walk.name}: newsletter nurture ${walk.expectNurture ? "shown" : "hidden"} (got ${r.nurtureVisible})`,
  );

  /* Step analytics. Five questions means five step events, each fired once —
     and the payload must never carry an answer, because two of the questions
     are about birth time and personal circumstance. */
  const steps = r.events.filter(([n]) => n === "reading_finder_step");
  ok(steps.length === 5, `${walk.name}: 5 reading_finder_step events (got ${steps.length})`);
  const answerValues = Object.values(walk.answers);
  const stepPayload = JSON.stringify(steps);
  ok(
    !answerValues.some((v) => stepPayload.includes(`"${v}"`) && !["focus", "who"].includes(v)),
    `${walk.name}: step events carry no answer values`,
  );
  ok(
    steps.every(([, p]) => Object.keys(p).every((k) => k === "step" || k === "number")),
    `${walk.name}: step events carry only step and number`,
  );
}

/** Going Back and forward again must not double-count a step. */
console.log("\nStep events are not re-fired by Back");
await page.goto(`http://localhost:${PORT}/reading-finder/`, { waitUntil: "load" });
const backCount = await page.evaluate(() => {
  const form = document.querySelector("[data-finder] form");
  const next = document.querySelector("[data-next]");
  const back = document.querySelector("[data-back]");
  form.querySelector('input[name="focus"][value="curious"]').checked = true;
  next.click();
  form.querySelector('input[name="who"][value="new"]').checked = true;
  next.click();
  back.click();
  next.click();
  back.click();
  next.click();
  return (window.dataLayer || []).filter((a) => a[0] === "event" && a[1] === "reading_finder_step")
    .length;
});
ok(backCount === 3, `three distinct steps reported after two Backs (got ${backCount})`);

await browser.close();
server.close();
console.log(
  fails
    ? `\n${fails} FAILING`
    : "\nEvery finder recommendation pre-selects correctly.",
);
process.exit(fails ? 1 : 0);
