import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const json = (p) => JSON.parse(readFileSync(p, 'utf8'));

function unique(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    const value = item?.[key];
    if (!value) continue;
    if (seen.has(value)) err(`${label}: duplicate ${key} "${value}"`);
    seen.add(value);
  }
}

function frontmatter(file) {
  const raw = readFileSync(file, 'utf8');
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const out = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim().replace(/^['"]|['"]$/g, '');
    out[m[1]] = v;
  }
  return out;
}

const serviceDir = 'src/content/services';
const services = readdirSync(serviceDir).filter((f) => f.endsWith('.json')).map((f) => json(join(serviceDir, f)));
unique(services, 'slug', 'services');
for (const s of services) {
  if (s.available && !s.bookingEventId && !(s.options || []).some((o) => o.bookingEventId)) warn(`service ${s.slug}: available but no booking event ID`);
  if (s.priceConfirmed && s.price == null && !(s.options || []).length) err(`service ${s.slug}: priceConfirmed but no price/options`);
}

const videos = json('src/content/videos/videos.json');
unique(videos, 'id', 'videos');
for (const v of videos) {
  if (v.draft) continue;
  if (v.platform === 'youtube' && !/^[A-Za-z0-9_-]{6,20}$/.test(v.externalId || '')) err(`video ${v.id}: malformed YouTube ID`);
  if (!v.title || !v.description) err(`video ${v.id}: published item missing title/description`);
}

for (const [path, key, label] of [
  ['src/content/testimonials/testimonials.json', 'id', 'testimonials'],
  ['src/content/faqs/faqs.json', 'id', 'faqs'],
  ['src/content/glossary/terms.json', 'id', 'glossary'],
]) {
  const items = json(path);
  unique(items, key, label);
  if (label === 'testimonials') for (const t of items) if (t.approved && !String(t.permissionNote || '').trim()) err(`testimonial ${t.id}: approved without permissionNote`);
}

const skyDir = 'src/content/sky-events';
for (const file of readdirSync(skyDir).filter((f) => /\.mdx?$/.test(f))) {
  const fm = frontmatter(join(skyDir, file));
  if (fm.draft === 'true') continue;
  if (!fm.sourceNote) err(`sky event ${file}: published item missing sourceNote`);
  if (!fm.lastVerified) err(`sky event ${file}: published item missing lastVerified`);
  if (!fm.start || Number.isNaN(Date.parse(fm.start))) err(`sky event ${file}: invalid/missing start date`);
}

const forbidden = ['PUBLIC_MAILERLITE_FORM_ID', 'assets.mailerlite.com/jsonp', 'mailto:${site.email}?subject='];
for (const path of ['src/components/NewsletterForm.astro', 'src/config/site.ts', '.env.example', 'README.md']) {
  const text = readFileSync(path, 'utf8');
  for (const token of forbidden) if (text.includes(token)) err(`${path}: obsolete newsletter token ${token}`);
}

console.log(`Content integrity: ${errors.length} error(s), ${warnings.length} warning(s)`);
for (const m of warnings) console.warn(`WARN: ${m}`);
for (const m of errors) console.error(`ERROR: ${m}`);
if (errors.length) process.exit(1);
