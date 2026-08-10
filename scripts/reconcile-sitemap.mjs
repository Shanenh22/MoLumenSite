import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function routeFor(file) {
  const relative = path.relative(dist, file).replaceAll(path.sep, '/');
  return relative === 'index.html' ? '/' : `/${relative.replace(/index\.html$/, '')}`;
}

const files = await walk(dist);
const noindex = new Set(['/404/']);
for (const file of files.filter((f) => f.endsWith('index.html'))) {
  const html = await fs.readFile(file, 'utf8');
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html) || /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html)) {
    noindex.add(routeFor(file));
  }
}

let removed = 0;
for (const file of files.filter((f) => /sitemap.*\.xml$/i.test(path.basename(f)))) {
  let xml = await fs.readFile(file, 'utf8');
  if (!xml.includes('<urlset')) continue;
  xml = xml.replace(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g, (block, loc) => {
    try {
      const route = new URL(loc).pathname;
      if (noindex.has(route)) {
        removed++;
        return '';
      }
    } catch {}
    return block;
  });
  await fs.writeFile(file, xml);
}

console.log(`Sitemap reconciliation: removed ${removed} noindex URL${removed === 1 ? '' : 's'}.`);
