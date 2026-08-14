import fs from 'node:fs';

const failures = [];
const read = (p) => fs.readFileSync(p, 'utf8');

function requireTokens(path, tokens) {
  const text = read(path);
  for (const token of tokens) {
    if (!text.includes(token)) failures.push(`${path}: missing contract token ${token}`);
  }
}

function forbidTokens(path, tokens) {
  const text = read(path);
  for (const token of tokens) {
    if (text.includes(token)) failures.push(`${path}: obsolete contract token ${token}`);
  }
}

requireTokens('MoLumen_OS/templates/video-template.md', [
  '"id"', '"platform"', '"externalId"', '"title"', '"description"',
  '"category"', '"publishedDate"', '"featured"', '"transcriptStatus"',
  '"related"', '"draft"',
]);
forbidTokens('MoLumen_OS/templates/video-template.md', [
  'youtubeUrl:', 'youtubeId:', 'topics:', 'relatedReading:', 'relatedArticles:',
]);

requireTokens('MoLumen_OS/templates/faq-template.md', [
  '"id"', '"question"', '"answer"', '"scope"', '"order"',
]);
forbidTokens('MoLumen_OS/templates/faq-template.md', [
  'answerSummary:', 'topics:', 'relatedReading:', 'draft:',
]);

requireTokens('MoLumen_OS/templates/glossary-template.md', [
  '"id"', '"term"', '"definition"', '"related"',
]);
forbidTokens('MoLumen_OS/templates/glossary-template.md', [
  'shortDefinition:', 'aliases:', 'relatedTerms:', 'draft:',
]);

const rss = read('src/pages/rss.xml.ts');
const layout = read('src/layouts/BaseLayout.astro');
const rssIsArticleOnly = rss.includes('getCollection("blog")') && !rss.includes('getCollection("skyEvents")');
if (rssIsArticleOnly && !layout.includes('title={`${site.name}: Articles`}')) {
  failures.push('BaseLayout RSS alternate title must describe the article-only feed');
}

// Launch/indexing contracts that must survive future refactors.
requireTokens('public/_headers', [
  'https://molumen.shanenh.workers.dev/*',
  'X-Robots-Tag: noindex',
]);
requireTokens('src/lib/sky-publishing.ts', [
  "2028: '2027-07-01'",
  'if (!data.ownerReview) return false;',
]);
requireTokens('.github/workflows/deploy.yml', ["cron: '15 11 1 7 *'"]);

// The legacy redirect inventory is documentation; public/_redirects is the
// deploy source of truth. Guard the known canonical targets against stale docs.
requireTokens('docs/research/url-inventory-redirect-map.md', [
  '/current-sky/events/2025-02-27-pisces-new-moon/',
  '/current-sky/events/2024-11-01-scorpio-new-moon/',
]);
forbidTokens('docs/research/url-inventory-redirect-map.md', [
  '/current-sky/events/new-moon-in-pisces-february-2025/',
  '/current-sky/events/new-moon-in-scorpio-november-2024/',
]);

if (failures.length) {
  console.error('[publishing-contracts] FAILED');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('[publishing-contracts] OK — repository publishing contracts are synchronized');
