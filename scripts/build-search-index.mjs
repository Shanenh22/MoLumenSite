import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = new URL('../dist/', import.meta.url);
const DIST_PATH = fileURLToPath(DIST);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function decode(value = '') {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function text(value = '') {
  return decode(
    value
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function meta(html, name) {
  const pattern = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["'][^>]*>`, 'i');
  const reverse = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["'][^>]*>`, 'i');
  return decode((html.match(pattern) ?? html.match(reverse))?.[1] ?? '');
}

function contentBetween(html, tag) {
  return html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1] ?? '';
}

function allTagText(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi'))]
    .map((m) => text(m[1]))
    .filter(Boolean)
    .join(' · ');
}

function groupFor(urlPath) {
  if (urlPath === '/start-here/' || urlPath.startsWith('/explore/') || urlPath.startsWith('/tools/')) return 'Learn';
  if (urlPath.startsWith('/current-sky/') || urlPath === '/horoscopes/') return 'Current Sky';
  if (urlPath.startsWith('/blog/')) return 'Blog';
  if (urlPath.startsWith('/readings/') || ['/readings/','/reading-finder/','/book/','/how-readings-work/','/prepare-for-your-reading/','/frequently-asked-questions/'].includes(urlPath)) return 'Readings';
  if (['/privacy/','/terms/','/disclaimer/','/booking-policy/','/accessibility/'].includes(urlPath)) return 'Help & policies';
  if (urlPath.startsWith('/birth-time') || urlPath === '/resources/') return 'Resources';
  if (['/about/','/approach/','/credentials/','/testimonials/','/contact/','/newsletter/'].includes(urlPath)) return 'From Mo';
  return 'Site';
}

function dateFor(mainText, urlPath) {
  if (!urlPath.startsWith('/current-sky/events/')) return undefined;
  const match = mainText.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+20\d{2}\b/);
  return match?.[0];
}

const files = await walk(DIST_PATH);
const records = [];
for (const file of files) {
  const html = await fs.readFile(file, 'utf8');
  const robots = meta(html, 'robots').toLowerCase();
  if (robots.includes('noindex')) continue;

  const relative = path.relative(DIST_PATH, file).replaceAll(path.sep, '/');
  const urlPath = relative === 'index.html' ? '/' : `/${relative.replace(/index\.html$/, '')}`;
  if (urlPath === '/search/' || urlPath === '/404/') continue;

  const mainHtml = contentBetween(html, 'main');
  const mainText = text(mainHtml);
  const rawTitle = text(contentBetween(html, 'title'));
  const title = rawTitle.replace(/\s*\|\s*(Mo Lumen Astrology|Mo Lumen).*$/i, '').trim() || allTagText(mainHtml, 'h1');
  const h1 = allTagText(mainHtml, 'h1');
  const headings = [allTagText(mainHtml, 'h2'), allTagText(mainHtml, 'h3')].filter(Boolean).join(' · ');
  const description = meta(html, 'description');
  if (!title || !mainText) continue;

  records.push({
    title,
    path: urlPath,
    group: groupFor(urlPath),
    description,
    h1,
    headings: headings.slice(0, 2500),
    body: mainText.slice(0, 8000),
    ...(dateFor(mainText, urlPath) ? { date: dateFor(mainText, urlPath) } : {}),
  });
}

records.sort((a, b) => a.path.localeCompare(b.path));
await fs.writeFile(new URL('../dist/search-index.json', import.meta.url), JSON.stringify(records));
console.log(`Search index: ${records.length} indexable pages`);
