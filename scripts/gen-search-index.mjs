import fs from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve('dist');
const BODY_LIMIT = 8000;

function decodeEntities(value = '') {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function textFromHtml(value = '') {
  return decodeEntities(
    value
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function matchOne(html, regex) {
  return regex.exec(html)?.[1] ?? '';
}

function routeFor(file) {
  const relative = path.relative(DIST, file).replaceAll(path.sep, '/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/\/index\.html$/, '')}/`;
}

function categoryFor(route) {
  if (route.startsWith('/current-sky/')) return 'Current Sky';
  if (route.startsWith('/blog/')) return 'Blog';
  if (route.startsWith('/readings/') || route === '/readings/' || route === '/reading-finder/' || route === '/book/' || route === '/how-readings-work/' || route === '/prepare-for-your-reading/' || route === '/frequently-asked-questions/') return 'Readings';
  if (route.startsWith('/explore/') || route === '/start-here/' || route.startsWith('/tools/') || route.startsWith('/birth-time') || route === '/resources/' || route === '/horoscopes/') return 'Learn';
  if (['/privacy/', '/terms/', '/disclaimer/', '/booking-policy/', '/accessibility/'].includes(route)) return 'Help & policies';
  return 'From Mo';
}

function priorityFor(route) {
  // Broad concept searches should lead with the durable reference page, not a
  // dated event or an adjacent essay that happens to repeat the same phrase.
  if (route.startsWith('/explore/') && route.split('/').filter(Boolean).length === 2) return 60;
  if (route === '/birth-time/' || route === '/birth-time-toolkit/' || route === '/reading-finder/') return 45;
  if (route.startsWith('/readings/') && route !== '/readings/') return 35;
  if (['/privacy/', '/terms/', '/disclaimer/', '/booking-policy/', '/accessibility/'].includes(route)) return 30;
  if (route === '/explore/' || route === '/readings/' || route === '/current-sky/' || route === '/blog/') return 5;
  return 0;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.name === 'index.html') files.push(full);
  }
  return files;
}

const documents = [];
for (const file of await walk(DIST)) {
  const route = routeFor(file);
  if (route === '/404/' || route === '/search/') continue;

  const html = await fs.readFile(file, 'utf8');
  if (/<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) || /<meta\s+content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html)) continue;

  const main = matchOne(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i) || html;
  const title = textFromHtml(matchOne(html, /<title>([\s\S]*?)<\/title>/i)).replace(/\s*\|\s*Mo Lumen(?: Astrology)?\s*$/i, '');
  const description = decodeEntities(matchOne(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || matchOne(html, /<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i));
  const headings = [...main.matchAll(/<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map((m) => textFromHtml(m[1])).join(' · ');
  const fullBody = textFromHtml(main);
  const body = fullBody.slice(0, BODY_LIMIT);
  const date = route.startsWith('/current-sky/events/')
    ? (fullBody.match(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}\b/)?.[0] ?? '')
    : '';

  if (!title || !description || !body) continue;
  documents.push({
    title,
    description,
    url: route,
    category: categoryFor(route),
    headings,
    body,
    date,
    priority: priorityFor(route),
  });
}

documents.sort((a, b) => a.url.localeCompare(b.url));
const output = JSON.stringify(documents);
await fs.writeFile(path.join(DIST, 'search-index.json'), output);
console.log(`Search index: ${documents.length} indexable pages, ${(Buffer.byteLength(output) / 1024).toFixed(0)} KiB raw`);
