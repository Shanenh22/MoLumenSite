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

if (failures.length) {
  console.error('[publishing-contracts] FAILED');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('[publishing-contracts] OK — RSS label and live-content templates are synchronized');
