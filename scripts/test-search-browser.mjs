import { chromiumPath } from './lib/chromium-path.mjs';
import { startDistServer } from './lib/dist-server.mjs';

const { chromium } = await import('playwright');
const PORT = 4418;
const server = await startDistServer(PORT);
const browser = await chromium.launch({ executablePath: chromiumPath() });
const URL = `http://localhost:${PORT}/search/`;
let failures = 0;
const ok = (condition, label, detail = '') => {
  console.log(`  ${condition ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  if (!condition) failures += 1;
};

try {
  console.log('\nSite search — mobile');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  mobile.on('pageerror', (error) => errors.push(error.message));
  await mobile.goto(URL, { waitUntil: 'load' });

  const layout = await mobile.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    inputHeight: document.querySelector('#site-search')?.getBoundingClientRect().height ?? 0,
    buttonHeight: document.querySelector('.search-form button')?.getBoundingClientRect().height ?? 0,
    searchVisibleInMenu: !!document.querySelector('.mobile-nav__search[href="/search/"]'),
  }));
  ok(layout.overflow <= 1, '390px viewport has no horizontal overflow', `${layout.overflow}px`);
  ok(layout.inputHeight >= 44 && layout.buttonHeight >= 44, 'search controls are touch sized');
  ok(layout.searchVisibleInMenu, 'mobile navigation exposes Search as a utility');

  await mobile.evaluate(() => {
    window.__searchEvents = [];
    window.mlTrack = (name, params) => window.__searchEvents.push({ name, params });
  });
  await mobile.fill('#site-search', 'birth time');
  await mobile.click('.search-form button');
  await mobile.waitForSelector('.search-result');
  const mobileResults = await mobile.$$eval('.search-result', (cards) => cards.slice(0, 5).map((card) => ({
    title: card.querySelector('h2')?.textContent?.trim(),
    meta: card.querySelector('.search-result__meta')?.textContent?.trim(),
    href: card.querySelector('a')?.getAttribute('href'),
  })));
  ok(mobileResults.some((item) => item.href === '/birth-time/'), 'birth time query returns the canonical guide in the first five');
  ok(!mobileResults.some((item) => item.href === '/birth-time-toolkit/worksheets/'), 'noindex browser worksheets do not leak into results');
  const events = await mobile.evaluate(() => window.__searchEvents);
  ok(events.some((event) => event.name === 'site_search_used'), 'search usage can be measured');
  ok(!JSON.stringify(events).includes('birth time'), 'raw search text is not passed to analytics');
  ok(errors.length === 0, 'mobile search throws no first-party script errors', errors[0] ?? '');

  console.log('\nSite search — desktop and dated Current Sky results');
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(`${URL}?q=Mercury%20retrograde`, { waitUntil: 'load' });
  await desktop.waitForSelector('.search-result');
  const desktopResults = await desktop.$$eval('.search-result', (cards) => cards.slice(0, 10).map((card) => ({
    title: card.querySelector('h2')?.textContent?.trim(),
    meta: card.querySelector('.search-result__meta')?.textContent?.trim(),
  })));
  ok(desktopResults.some((item) => /Current Sky/.test(item.meta || '')), 'Mercury retrograde returns Current Sky material');
  ok(desktopResults.filter((item) => /Current Sky/.test(item.meta || '')).every((item) => /\d{4}/.test(item.meta || '')), 'dated Current Sky results show a year');
  const desktopLayout = await desktop.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    headerSearch: !!document.querySelector('.header-search[href="/search/"]'),
  }));
  ok(desktopLayout.overflow <= 1, 'desktop search has no horizontal overflow', `${desktopLayout.overflow}px`);
  ok(desktopLayout.headerSearch, 'desktop header exposes Search without adding a fifth content pillar');
} finally {
  await browser.close();
  server.close();
}

if (failures) {
  console.error(`\n${failures} search browser check(s) failed.`);
  process.exit(1);
}
console.log('\nSearch browser checks passed.');
