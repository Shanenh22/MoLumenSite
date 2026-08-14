import { chromiumPath } from "./lib/chromium-path.mjs";
import { startDistServer } from "./lib/dist-server.mjs";

const { chromium } = await import("playwright");
const PORT = 4416;
const server = await startDistServer(PORT);
const browser = await chromium.launch({ executablePath: chromiumPath() });
const URL = `http://localhost:${PORT}/tools/explore-your-chart/`;

let failures = 0;
const ok = (condition, label, detail = "") => {
  console.log(`  ${condition ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!condition) failures += 1;
};

const firstPartyErrors = (page) => {
  const errors = [];
  const thirdParty = /convertkit|googletagmanager|google-analytics|cal\.com|youtube|ytimg/i;
  const relevant = (text) =>
    !thirdParty.test(text) && !/net::ERR_|ERR_BLOCKED_BY_RESPONSE|ERR_FAILED/.test(text);
  page.on("pageerror", (error) => {
    const detail = `${error.message}\n${error.stack ?? ""}`;
    if (relevant(detail)) errors.push(error.message);
  });
  page.on("console", (message) => {
    if (message.type() === "error" && relevant(message.text())) errors.push(message.text());
  });
  return errors;
};

console.log("\nChart explorer — mobile guided flow");
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
const mobileErrors = firstPartyErrors(mobile);
await mobile.goto(URL, { waitUntil: "load" });

const mobileLayout = await mobile.evaluate(() => {
  const guide = document.querySelector(".explorer-guide")?.getBoundingClientRect();
  const wheel = document.querySelector(".wheel-visual")?.getBoundingClientRect();
  const activeButtons = [...document.querySelectorAll('#planet-choices .choice-grid button')];
  return {
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    guideTop: guide?.top ?? null,
    wheelTop: wheel?.top ?? null,
    formulaCount: document.querySelectorAll(".chart-formula__item").length,
    activeButtonHeights: activeButtons.map((button) => button.getBoundingClientRect().height),
    planetVisible: !document.querySelector("#planet-choices")?.hidden,
    signHidden: !!document.querySelector("#sign-choices")?.hidden,
    houseHidden: !!document.querySelector("#house-choices")?.hidden,
  };
});

ok(mobileLayout.overflow <= 1, "390px viewport has no horizontal overflow", `${mobileLayout.overflow}px`);
ok(
  mobileLayout.guideTop !== null && mobileLayout.wheelTop !== null && mobileLayout.guideTop < mobileLayout.wheelTop,
  "guided lesson appears before the wheel on mobile",
);
ok(mobileLayout.formulaCount === 4, "four teaching layers are visible");
ok(
  mobileLayout.activeButtonHeights.length === 10 && mobileLayout.activeButtonHeights.every((height) => height >= 48),
  "planet choices provide thumb-sized targets",
  mobileLayout.activeButtonHeights.map((height) => Math.round(height)).join(", "),
);
ok(
  mobileLayout.planetVisible && mobileLayout.signHidden && mobileLayout.houseHidden,
  "guided lesson opens with one category at a time",
);

await mobile.click('#planet-choices [data-kind="planets"][data-key="mars"]');
ok((await mobile.textContent('[data-selected="planets"]'))?.trim() === "Mars", "Mars updates the progress summary");
ok((await mobile.textContent('[data-result-name]'))?.trim() === "Mars", "Mars explanation appears beside the lesson");
ok(!(await mobile.$eval('[data-result-detail]', (el) => el.hidden)), "core idea and Mo's lens are revealed");
ok((await mobile.getAttribute('[data-result-link]', "href")) === "/explore/planets/mars/", "result links to the full Mars reference page");

await mobile.click("[data-next-step]");
ok(!(await mobile.$eval("#sign-choices", (el) => el.hidden)), "Next advances to signs");
await mobile.click('#sign-choices [data-kind="signs"][data-key="taurus"]');
ok((await mobile.textContent('[data-selected="signs"]'))?.trim() === "Taurus", "Taurus updates the progress summary");

await mobile.click("[data-next-step]");
ok(!(await mobile.$eval("#house-choices", (el) => el.hidden)), "Next advances to houses");
await mobile.click('#house-choices [data-kind="houses"][data-key="tenth-house"]');
ok((await mobile.textContent('[data-selected="houses"]'))?.trim() === "Tenth House", "Tenth House updates the progress summary");
ok(!(await mobile.$eval("[data-synthesis]", (el) => el.hidden)), "three selections reveal the synthesis lesson");

const synthesis = (await mobile.textContent("[data-synthesis]")) ?? "";
ok(/Mars/.test(synthesis) && /Taurus/.test(synthesis) && /Tenth House/.test(synthesis), "synthesis preserves all three selected layers");
const mobilePressed = await mobile.evaluate(() => ({
  mars: document.querySelector('#planet-choices [data-key="mars"]')?.getAttribute("aria-pressed"),
  taurus: document.querySelector('#sign-choices [data-key="taurus"]')?.getAttribute("aria-pressed"),
  tenth: document.querySelector('#house-choices [data-key="tenth-house"]')?.getAttribute("aria-pressed"),
}));
ok(Object.values(mobilePressed).every((value) => value === "true"), "each layer keeps its own selected state");
ok(mobileErrors.length === 0, "mobile flow throws no first-party script errors", mobileErrors[0] ?? "");

console.log("\nChart explorer — desktop wheel and keyboard");
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const desktopErrors = firstPartyErrors(desktop);
await desktop.goto(URL, { waitUntil: "load" });

const desktopLayout = await desktop.evaluate(() => {
  const guide = document.querySelector(".explorer-guide")?.getBoundingClientRect();
  const wheel = document.querySelector(".wheel-visual")?.getBoundingClientRect();
  return {
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    guideLeft: guide?.left ?? null,
    wheelLeft: wheel?.left ?? null,
    guideTop: guide?.top ?? null,
    wheelTop: wheel?.top ?? null,
    wheelWidth: document.querySelector(".chart-wheel")?.getBoundingClientRect().width ?? 0,
  };
});
ok(desktopLayout.overflow <= 1, "desktop viewport has no horizontal overflow", `${desktopLayout.overflow}px`);
ok(
  desktopLayout.wheelLeft !== null && desktopLayout.guideLeft !== null && desktopLayout.wheelLeft < desktopLayout.guideLeft,
  "desktop places the chart wheel left of the guided lesson",
);
ok(
  desktopLayout.wheelTop !== null && desktopLayout.guideTop !== null && Math.abs(desktopLayout.wheelTop - desktopLayout.guideTop) < 120,
  "desktop presents wheel and lesson as one workspace",
);
ok(desktopLayout.wheelWidth >= 400, "desktop wheel remains large enough to read", `${Math.round(desktopLayout.wheelWidth)}px`);

const houseGeometry = await desktop.evaluate(() => {
  const labels = [...document.querySelectorAll('.chart-wheel text[data-house-number]')].map((label) => {
    const number = Number(label.getAttribute('data-house-number'));
    const x = Number(label.getAttribute('x'));
    const y = Number(label.getAttribute('y'));
    const angle = (Math.atan2(-(y - 300), x - 300) * 180 / Math.PI + 360) % 360;
    return { number, x, y, angle };
  }).sort((a, b) => a.number - b.number);
  const steps = labels.map((label, index) => {
    const next = labels[(index + 1) % labels.length];
    return (next.angle - label.angle + 360) % 360;
  });
  return { labels, steps };
});
const firstHouse = houseGeometry.labels.find((label) => label.number === 1);
const twelfthHouse = houseGeometry.labels.find((label) => label.number === 12);
ok(
  houseGeometry.labels.length === 12,
  "wheel renders all 12 numbered house labels",
  `${houseGeometry.labels.length} labels`,
);
ok(
  firstHouse && firstHouse.x < 300 && firstHouse.y > 300,
  "1st house begins below the left-hand Ascendant side of the wheel",
  firstHouse ? `x=${Math.round(firstHouse.x)}, y=${Math.round(firstHouse.y)}` : "missing",
);
ok(
  twelfthHouse && twelfthHouse.x < 300 && twelfthHouse.y < 300,
  "12th house sits above the left-hand Ascendant side of the wheel",
  twelfthHouse ? `x=${Math.round(twelfthHouse.x)}, y=${Math.round(twelfthHouse.y)}` : "missing",
);
ok(
  houseGeometry.steps.length === 12 && houseGeometry.steps.every((step) => Math.abs(step - 30) < 0.2),
  "house numbers proceed counter-clockwise in 30-degree order",
  houseGeometry.steps.map((step) => step.toFixed(1)).join(", "),
);

await desktop.click('.chart-wheel [data-kind="signs"][data-key="taurus"]');
ok((await desktop.textContent('[data-selected="signs"]'))?.trim() === "Taurus", "wheel selection synchronizes with the guided lesson");
ok(
  (await desktop.getAttribute('#sign-choices [data-key="taurus"]', "aria-pressed")) === "true",
  "matching sign button reflects a wheel selection",
);

await desktop.focus('.chart-wheel [data-kind="houses"][data-key="tenth-house"]');
await desktop.keyboard.press("Enter");
ok((await desktop.textContent('[data-selected="houses"]'))?.trim() === "Tenth House", "wheel house can be selected from the keyboard");

await desktop.focus("#planet-tab");
await desktop.keyboard.press("ArrowRight");
ok((await desktop.getAttribute("#sign-tab", "aria-selected")) === "true", "tablist supports arrow-key navigation");
await desktop.keyboard.press("End");
ok((await desktop.getAttribute("#house-tab", "aria-selected")) === "true", "tablist supports End navigation");
ok(desktopErrors.length === 0, "desktop flow throws no first-party script errors", desktopErrors[0] ?? "");

await browser.close();
server.close();
console.log(failures ? `\n${failures} chart explorer checks failed.` : "\nChart explorer mobile and desktop checks passed.");
process.exit(failures ? 1 : 0);
