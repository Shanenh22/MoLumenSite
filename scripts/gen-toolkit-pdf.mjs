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
 * The PDF is generated from the real page rather than a separate template, so
 * the download and the web version cannot drift apart — the failure mode where
 * someone edits the page and the PDF keeps saying something else. A print
 * stylesheet in global.css strips the site chrome, the signup block and the
 * navigation, leaving the guide itself.
 *
 * Run:  npm run toolkit:pdf     (after npm run build)
 */
import http from 'node:http';
import { createReadStream, statSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { chromiumPath } from './lib/chromium-path.mjs';

const { chromium } = await import('playwright');

const PORT = 4413;
const OUT = 'public/downloads/birth-time-toolkit.pdf';
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let f = join('dist', decodeURIComponent(req.url.split('?')[0]));
  try {
    if (statSync(f).isDirectory()) f = join(f, 'index.html');
  } catch {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, { 'Content-Type': MIME[extname(f)] || 'application/octet-stream' });
  createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

mkdirSync('public/downloads', { recursive: true });

const browser = await chromium.launch({ executablePath: chromiumPath() });
const page = await browser.newPage();
await page.goto(`http://localhost:${PORT}/birth-time-toolkit/worksheets/`, { waitUntil: 'load' });
// The print stylesheet is what makes this readable; emulate it explicitly
// rather than trusting Chromium's default, which differs between versions.
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: OUT,
  format: 'Letter',
  printBackground: true,
  margin: { top: '18mm', bottom: '18mm', left: '18mm', right: '18mm' },
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font-size:8pt;color:#6b6b6b;padding:0 18mm;' +
    'display:flex;justify-content:space-between;font-family:Georgia,serif;">' +
    '<span>The Birth Time Toolkit &mdash; Mo Lumen Astrology &mdash; molumen.com</span>' +
    '<span class="pageNumber"></span></div>',
});
await browser.close();
server.close();
console.log(`Wrote ${OUT}`);
