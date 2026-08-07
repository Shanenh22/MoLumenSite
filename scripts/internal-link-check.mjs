import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const origin = 'https://molumen.com';
const htmlFiles = [];
const failures = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (name.endsWith('.html')) htmlFiles.push(full);
  }
}

function routeFor(file) {
  const rel = path.relative(root, file).replaceAll(path.sep, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

function existsFor(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }
  const clean = decoded.replace(/^\/+/, '');
  const candidates = [];
  if (!clean) candidates.push(path.join(root, 'index.html'));
  else {
    candidates.push(path.join(root, clean));
    candidates.push(path.join(root, clean, 'index.html'));
    candidates.push(path.join(root, `${clean}.html`));
  }
  return candidates.some((candidate) => fs.existsSync(candidate));
}

function checkReference(raw, sourceRoute, sourceFile) {
  if (!raw || raw.startsWith('#')) return;
  if (/^(mailto:|tel:|sms:|data:|javascript:)/i.test(raw)) return;

  let target;
  try {
    target = new URL(raw, new URL(sourceRoute, origin));
  } catch {
    failures.push(`${sourceRoute}: malformed URL ${JSON.stringify(raw)}`);
    return;
  }

  if (target.origin !== origin) return;
  if (!existsFor(target.pathname)) {
    failures.push(`${sourceRoute}: ${raw} -> missing ${target.pathname} (${path.relative(root, sourceFile)})`);
  }
}

walk(root);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeFor(file);
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    checkReference(match[1], route, file);
  }
}

const unique = [...new Set(failures)].sort();
console.log(`Internal link check: ${htmlFiles.length} HTML files, ${unique.length} failure(s)`);
for (const failure of unique) console.error(`ERROR: ${failure}`);
if (unique.length) process.exit(1);
