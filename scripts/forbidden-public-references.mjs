import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const roots = ['src', 'public'];
const textExtensions = new Set([
  '.astro', '.md', '.mdx', '.json', '.ts', '.tsx', '.js', '.mjs', '.html', '.xml', '.txt', '.yml', '.yaml'
]);
const forbidden = /\bAlan[\s_-]+Oken\b|\bOken\b/gi;
const hits = [];

function walk(path) {
  if (!existsSync(path)) return;
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) walk(join(path, entry));
    return;
  }
  if (!textExtensions.has(extname(path).toLowerCase())) return;
  const text = readFileSync(path, 'utf8');
  const matches = [...text.matchAll(forbidden)];
  if (!matches.length) return;
  for (const match of matches) {
    const line = text.slice(0, match.index).split(/\r?\n/).length;
    hits.push(`${path}:${line}`);
  }
}

for (const root of roots) walk(root);

if (hits.length) {
  console.error('Forbidden public reference found:');
  for (const hit of hits) console.error(`  ${hit}`);
  process.exit(1);
}

console.log('Forbidden public references: 0');
