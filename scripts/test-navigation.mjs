import { chromiumPath } from './lib/chromium-path.mjs';
import { startDistServer } from './lib/dist-server.mjs';

const { chromium } = await import('playwright');
const PORT = 4420;
const server = await startDistServer(PORT);
const browser = await chromium.launch({ executablePath: chromiumPath() });
const URL = `http://localhost:${PORT}/`;
let failures = 0;
const ok = (condition, label, detail = '') => {
  console.log(`  ${condition ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  if (!condition) failures += 1;
};

const expected = {
  Readings: ['Reading Finder', 'All Readings', 'How Readings Work', 'FAQs'],
  'Explore Astrology': ['Start Here', 'Explore All Topics', 'How a Chart Works', 'Interactive Chart Guide', 'Glossary'],
  'Current Sky': ['Current Sky', 'Horoscopes', 'Sky Calendar'],
  'From Mo': ['About Mo', 'Blog', 'Newsletter', 'Contact Mo'],
};

const footerHeadings = ['Readings', 'Explore Astrology', 'Current Sky', 'From Mo'];

try {
  console.log('\nNavigation — breakpoint handoff');
  for (const width of [390, 981, 1023, 1024, 1100, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(URL, { waitUntil: 'load' });
    const state = await page.evaluate(() => {
      const shown = (selector) => {
        const el = document.querySelector(selector);
        return !!el && getComputedStyle(el).display !== 'none';
      };
      return {
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        desktopNav: shown('.nav-desktop'),
        mobileToggle: shown('[data-open-mobile-nav]'),
        headerSearch: shown('.header-search'),
        book: shown('.header-cta'),
      };
    });
    const desktop = width >= 1024;
    ok(state.overflow <= 1, `${width}px header has no horizontal overflow`, `${state.overflow}px`);
    ok(state.desktopNav === desktop, `${width}px uses the ${desktop ? 'desktop' : 'mobile'} navigation mode`);
    ok(state.mobileToggle === !desktop, `${width}px menu toggle visibility matches the breakpoint`);
    ok(state.book, `${width}px keeps booking directly reachable`);
    if (width <= 980) ok(!state.headerSearch, `${width}px keeps Search inside the mobile menu`);
    if (width >= 981) ok(state.headerSearch, `${width}px keeps Search directly reachable in the header`);
    await page.close();
  }

  console.log('\nNavigation — desktop taxonomy and keyboard behavior');
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(URL, { waitUntil: 'load' });
  const desktopGroups = await desktop.$$eval('.nav-desktop [data-nav-group]', (groups) =>
    groups.map((group) => ({
      label: group.querySelector(':scope > button')?.textContent?.replace(/\s+/g, ' ').trim(),
      children: [...group.querySelectorAll(':scope > .submenu > li > a')].map((a) => a.textContent?.trim()),
    }))
  );
  ok(desktopGroups.length === 4, 'desktop exposes exactly four content groups', `${desktopGroups.length}`);
  for (const [label, children] of Object.entries(expected)) {
    const group = desktopGroups.find((item) => item.label === label);
    ok(!!group, `desktop includes ${label}`);
    ok(JSON.stringify(group?.children) === JSON.stringify(children), `${label} exposes only its intended entry points`, JSON.stringify(group?.children ?? []));
  }
  const allDesktopText = JSON.stringify(desktopGroups);
  ok(!allDesktopText.includes('Prepare for Your Reading'), 'post-booking preparation is not promoted as a primary reading choice');
  ok(!allDesktopText.includes('Credentials'), 'credentials stay available contextually rather than in primary navigation');
  ok(allDesktopText.includes('Interactive Chart Guide'), 'interactive teaching tool is labeled without implying personal chart calculation');

  const readingsTrigger = desktop.locator('.nav-desktop [data-nav-group]').filter({ hasText: 'Readings' }).locator(':scope > button');
  await readingsTrigger.click();
  await desktop.keyboard.press('Tab');
  const focusedInsideMenu = await desktop.evaluate(() => document.activeElement?.closest('.submenu') !== null);
  ok(focusedInsideMenu, 'keyboard focus can enter an open desktop submenu');
  await desktop.keyboard.press('Escape');
  const escapeState = await desktop.evaluate(() => ({
    openCount: document.querySelectorAll('.nav-desktop [data-nav-group][data-open="true"]').length,
    focusedText: document.activeElement?.textContent?.replace(/\s+/g, ' ').trim(),
  }));
  ok(escapeState.openCount === 0, 'Escape closes the desktop dropdown');
  ok(escapeState.focusedText === 'Readings', 'Escape returns focus to the dropdown trigger', escapeState.focusedText ?? 'no focus');

  const desktopFooter = await desktop.$$eval('.footer-nav-desktop h3', (nodes) => nodes.map((node) => node.textContent?.trim()));
  ok(JSON.stringify(desktopFooter) === JSON.stringify(footerHeadings), 'desktop footer mirrors the four core concepts', JSON.stringify(desktopFooter));
  await desktop.close();

  console.log('\nNavigation — mobile taxonomy and accordion behavior');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(URL, { waitUntil: 'load' });
  await mobile.click('[data-open-mobile-nav]');
  const dialogOpen = await mobile.$eval('.mobile-nav', (dialog) => dialog.open);
  ok(dialogOpen, 'mobile navigation opens as a dialog');
  const mobileGroups = await mobile.$$eval('.mobile-group', (buttons) =>
    buttons.map((button) => button.textContent?.replace(/\s+/g, ' ').trim())
  );
  ok(JSON.stringify(mobileGroups) === JSON.stringify(Object.keys(expected)), 'mobile uses the same four-group taxonomy', JSON.stringify(mobileGroups));
  const searchAndBook = await mobile.evaluate(() => ({
    search: !!document.querySelector('.mobile-nav__search[href="/search/"]'),
    book: !!document.querySelector('.mobile-nav__book[href="/book/"]'),
  }));
  ok(searchAndBook.search, 'mobile menu keeps Search as a utility');
  ok(searchAndBook.book, 'mobile menu keeps Book a Reading as the primary action');

  const readingsMobile = mobile.locator('.mobile-group').filter({ hasText: 'Readings' });
  const exploreMobile = mobile.locator('.mobile-group').filter({ hasText: 'Explore Astrology' });
  await readingsMobile.click();
  const readingLinks = await mobile.$$eval('#mnav-0 a', (links) => links.map((a) => a.textContent?.trim()));
  ok(JSON.stringify(readingLinks) === JSON.stringify(expected.Readings), 'mobile Readings submenu matches desktop intent', JSON.stringify(readingLinks));
  await exploreMobile.click();
  const accordionState = await mobile.evaluate(() => ({
    expanded: [...document.querySelectorAll('.mobile-group')]
      .filter((button) => button.getAttribute('aria-expanded') === 'true')
      .map((button) => button.textContent?.replace(/\s+/g, ' ').trim()),
    readingsHidden: document.querySelector('#mnav-0')?.hidden,
    exploreHidden: document.querySelector('#mnav-1')?.hidden,
  }));
  ok(JSON.stringify(accordionState.expanded) === JSON.stringify(['Explore Astrology']), 'opening a mobile group closes the previous group', JSON.stringify(accordionState.expanded));
  ok(accordionState.readingsHidden === true && accordionState.exploreHidden === false, 'mobile accordion panels match aria-expanded state');

  const mobileFooter = await mobile.$$eval('.footer-nav-mobile summary', (nodes) => nodes.map((node) => node.textContent?.trim()));
  ok(JSON.stringify(mobileFooter) === JSON.stringify(footerHeadings), 'mobile footer mirrors the four core concepts', JSON.stringify(mobileFooter));
  await mobile.close();
} finally {
  await browser.close();
  server.close();
}

if (failures) {
  console.error(`\n${failures} navigation check(s) failed.`);
  process.exit(1);
}
console.log('\nNavigation checks passed.');
