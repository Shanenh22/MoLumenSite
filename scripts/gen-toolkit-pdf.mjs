/**
 * Renders the Birth Time Toolkit worksheets to public/downloads/birth-time-toolkit.pdf.
 *
 * Manual, like `npm run og:generate`, and deliberately not part of `build`.
 * Playwright is a `--no-save` audit dependency here so the deploy stays lean;
 * wiring this into the build would either add a heavy dependency to
 * package.json or make the build fail on any machine that had not run
 * `npm run audit:install`. Neither is worth it for a file that changes when the
 * copy changes, which is rarely.
 *
 * The PDF is generated from the real worksheet page rather than a separate
 * template, so the download and the web version cannot drift apart. The shared
 * print stylesheet removes site chrome; the injected PDF stylesheet below is
 * intentionally generator-only and controls Letter-size pagination, writing
 * space, tables and worksheet blocks without changing the browser presentation.
 *
 * Run:  npm run toolkit:pdf     (after npm run build)
 */
import { mkdirSync } from 'node:fs';
import { chromiumPath } from './lib/chromium-path.mjs';
import { startDistServer } from './lib/dist-server.mjs';

const { chromium } = await import('playwright');

const PORT = 4413;
const OUT = 'public/downloads/birth-time-toolkit.pdf';

const PDF_CSS = `
  @page {
    size: Letter;
  }

  html,
  body {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  body {
    font-size: 10.5pt !important;
    line-height: 1.42 !important;
  }

  .toolkit > .container {
    max-width: none !important;
    width: 100% !important;
    margin: 0 !important;
  }

  .toolkit .eyebrow {
    margin-top: 0.55in;
    margin-bottom: 0.18in;
    border: 1px solid #8a8a8a;
    background: none !important;
    color: #333 !important;
  }

  .toolkit h1 {
    font-size: 27pt !important;
    line-height: 1.08 !important;
    margin: 0 0 0.22in !important;
  }

  .toolkit .lede {
    max-width: 39em !important;
    font-size: 13pt !important;
    line-height: 1.45 !important;
    margin-bottom: 0.24in !important;
  }

  .toolkit > .container > .lede + p {
    max-width: 42em;
    font-size: 10.5pt;
  }

  /* The opening material is the cover. Each numbered worksheet begins cleanly
     on a new sheet instead of being stranded below the previous section. */
  .toolkit h2 {
    break-before: page;
    page-break-before: always;
    break-after: avoid;
    page-break-after: avoid;
    font-size: 17pt !important;
    margin: 0 0 0.14in !important;
  }

  .toolkit h2::before {
    display: none !important;
  }

  .toolkit h2 + p {
    margin-top: 0 !important;
  }

  .rule-print {
    display: none !important;
  }

  /* URL expansion is useful when somebody prints an article, but it makes a
     worksheet look like a browser printout. The footer already identifies the
     site, so keep links readable without appending raw paths. */
  .toolkit .prose a[href^='/']::after,
  .toolkit a[href^='/']::after {
    content: none !important;
  }

  .toolkit a {
    color: #000 !important;
    text-decoration-thickness: 0.6pt;
  }

  .ws {
    margin-top: 0.18in !important;
  }

  .ws-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.16in 0.28in !important;
    margin: 0.12in 0 0.18in !important;
  }

  .ws-grid > div,
  .ws-block,
  .ws-check li,
  .ws-table tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .ws-label {
    display: block !important;
    font-size: 8.5pt !important;
    font-weight: 700 !important;
    letter-spacing: 0.01em;
    margin-bottom: 0.035in !important;
  }

  .ws-line {
    display: block !important;
    min-height: 0.28in !important;
    border-bottom: 0.75pt solid #7b7b7b !important;
    margin-bottom: 0.04in !important;
  }

  .ws-line--tall {
    min-height: 0.52in !important;
  }

  .ws-note {
    font-size: 9pt !important;
    line-height: 1.4 !important;
    margin: 0.08in 0 0 !important;
  }

  .ws-check {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 0 0.2in !important;
  }

  .ws-check li {
    display: block !important;
    position: relative !important;
    padding-left: 0.25in !important;
    margin-bottom: 0.09in !important;
  }

  .ws-check li::before {
    content: '' !important;
    position: absolute !important;
    left: 0 !important;
    top: 0.035in !important;
    width: 0.13in !important;
    height: 0.13in !important;
    border: 0.75pt solid #777 !important;
    border-radius: 1px !important;
    box-sizing: border-box !important;
  }

  .ws-block {
    border: 0.75pt solid #b0b0b0 !important;
    border-radius: 0 !important;
    padding: 0.16in !important;
    margin: 0 0 0.2in !important;
    background: #fff !important;
  }

  .ws-table {
    width: 100% !important;
    table-layout: fixed !important;
    border-collapse: collapse !important;
    margin: 0.14in 0 0.18in !important;
    font-size: 9pt !important;
  }

  .ws-table th,
  .ws-table td {
    border: 0.75pt solid #9c9c9c !important;
    padding: 0.07in !important;
    vertical-align: top !important;
  }

  .ws-table th {
    font-size: 8.5pt !important;
    line-height: 1.25 !important;
    background: #f3f3f3 !important;
  }

  .ws-table tbody td {
    height: 0.42in !important;
  }

  .ws-scale {
    display: grid !important;
    grid-template-columns: 1.45in 1fr !important;
    column-gap: 0.2in !important;
    row-gap: 0.09in !important;
    margin: 0.16in 0 0.22in !important;
  }

  .ws-scale dt {
    font-weight: 700 !important;
    break-after: avoid;
    page-break-after: avoid;
  }

  .ws-scale dd {
    margin: 0 !important;
    break-before: avoid;
    page-break-before: avoid;
  }

  .toolkit__close {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-top: 0.22in !important;
    padding-top: 0.16in !important;
    border-top: 0.75pt solid #999;
  }

  .print-only {
    display: block !important;
    font-size: 8.5pt !important;
    color: #555 !important;
    margin-top: 0.18in !important;
  }

  .no-print {
    display: none !important;
  }
`;

const server = await startDistServer(PORT);

mkdirSync('public/downloads', { recursive: true });

const browser = await chromium.launch({ executablePath: chromiumPath() });
const page = await browser.newPage();
await page.goto(`http://localhost:${PORT}/birth-time-toolkit/worksheets/`, { waitUntil: 'load' });
await page.emulateMedia({ media: 'print' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: PDF_CSS });

// A checklist item that becomes unusually tall is a strong signal that its text
// has collapsed into a narrow anonymous grid column. That failure can still
// produce a syntactically valid PDF, so stop before writing a broken artifact.
const brokenChecklist = await page.$$eval('.ws-check li', (items) =>
  items
    .map((item, index) => {
      const rect = item.getBoundingClientRect();
      return { index: index + 1, width: rect.width, height: rect.height };
    })
    .filter((item) => item.width < 300 || item.height > 180),
);
if (brokenChecklist.length) {
  throw new Error(`Toolkit checklist layout collapsed: ${JSON.stringify(brokenChecklist)}`);
}

await page.pdf({
  path: OUT,
  format: 'Letter',
  preferCSSPageSize: true,
  printBackground: true,
  margin: { top: '15mm', bottom: '17mm', left: '16mm', right: '16mm' },
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font-size:8pt;color:#6b6b6b;padding:0 16mm;' +
    'display:flex;justify-content:space-between;font-family:Georgia,serif;">' +
    '<span>The Birth Time Toolkit &mdash; Mo Lumen Astrology &mdash; molumen.com</span>' +
    '<span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>',
});
await browser.close();
server.close();
console.log(`Wrote ${OUT}`);
