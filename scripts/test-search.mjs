import fs from 'node:fs/promises';
import { searchDocuments } from '../src/lib/search.mjs';

const indexPath = 'dist/search-index.json';
const raw = await fs.readFile(indexPath, 'utf8');
const documents = JSON.parse(raw);
const failures = [];
const rawBytes = Buffer.byteLength(raw);
const MAX_RAW_BYTES = 1_500_000;

function paths(query, limit = 10) {
  return searchDocuments(documents, query, limit).map((item) => item.url);
}

function fail(message) {
  failures.push(message);
  console.error(`::error title=Search relevance::${message}`);
}

if (rawBytes > MAX_RAW_BYTES) {
  fail(`search index is ${(rawBytes / 1024).toFixed(0)} KiB raw; maximum is ${(MAX_RAW_BYTES / 1024).toFixed(0)} KiB`);
}

function expectTop(query, expected, top = 1) {
  const got = paths(query, Math.max(top, 10));
  if (!got.slice(0, top).includes(expected)) {
    fail(`${JSON.stringify(query)} expected ${expected} in top ${top}; got ${got.slice(0, top).join(', ') || '(none)'}`);
  }
}

function expectIncluded(query, expected, top = 5) {
  const got = paths(query, top);
  if (!got.includes(expected)) {
    fail(`${JSON.stringify(query)} expected ${expected} in top ${top}; got ${got.join(', ') || '(none)'}`);
  }
}

function expectExcluded(query, forbidden) {
  const got = paths(query, 30);
  if (got.includes(forbidden)) {
    fail(`${JSON.stringify(query)} must not return ${forbidden}`);
  }
}

// Broad concepts: durable reference pages should beat dated events or adjacent essays.
expectTop('Saturn return', '/explore/saturn-return/');
expectTop('house systems', '/explore/house-systems/');
expectTop('birth chart basics', '/explore/birth-chart-basics/');
expectTop('moon phases', '/explore/moon-phases/');
expectTop('eclipses', '/explore/eclipses/');
expectTop('aspects', '/explore/aspects/');
expectTop('privacy', '/privacy/');

// Specific terms and real visitor intent should route to useful, not merely matching, pages.
expectIncluded('Yod', '/explore/chart-patterns/', 5);
expectIncluded('retrograde', '/explore/retrogrades/', 5);
expectIncluded('birth time', '/birth-time/', 5);
expectIncluded('birth time', '/birth-time-toolkit/', 8);
expectIncluded('relationship astrology', '/explore/relationships/', 5);
expectIncluded('relationship reading', '/readings/relationship/', 5);
expectIncluded('cancellation', '/booking-policy/', 5);
expectIncluded('refund', '/booking-policy/', 8);
expectIncluded('recording', '/booking-policy/', 8);
expectIncluded('career purpose', '/explore/personal-purpose/', 8);

// Current-sky searches may have several dated matches. Event-detail results,
// unlike the Current Sky hub or annual overview, must always carry the date.
const mercury = searchDocuments(documents, 'Mercury retrograde', 20);
const mercuryEvents = mercury.filter((item) => item.url.startsWith('/current-sky/events/'));
if (mercuryEvents.length === 0) {
  fail('Mercury retrograde should return at least one dated Current Sky event');
}
if (mercuryEvents.some((item) => !item.date)) {
  fail('Current Sky event search results must carry an event date');
}

// Noindex/dormant/support routes should never leak into visitor search.
expectExcluded('worksheets', '/birth-time-toolkit/worksheets/');
expectExcluded('courses', '/courses/');
expectExcluded('guides', '/guides/');
expectExcluded('videos', '/videos/');
expectExcluded('search', '/search/');

const samples = [
  'Saturn return', 'house systems', 'birth chart basics', 'moon phases', 'eclipses', 'aspects',
  'birth time', 'Yod', 'retrograde', 'relationship astrology', 'relationship reading',
  'career purpose', 'cancellation', 'refund', 'recording', 'Mercury retrograde',
];
for (const query of samples) {
  const sample = searchDocuments(documents, query, 5)
    .map((item) => `${item.title} [${item.category}] ${item.url}`)
    .join(' | ');
  console.log(`${query}: ${sample || '(no results)'}`);
}

console.log(`Search index payload: ${(rawBytes / 1024).toFixed(0)} KiB raw for ${documents.length} pages`);
if (failures.length) {
  console.error(`Search relevance: ${failures.length} failure(s) against ${documents.length} indexable pages`);
  process.exit(1);
}
console.log(`Search relevance: passed against ${documents.length} indexable pages`);
