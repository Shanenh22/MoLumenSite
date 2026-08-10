import fs from 'node:fs/promises';
import { searchDocuments } from '../src/lib/search.mjs';

const documents = JSON.parse(await fs.readFile('dist/search-index.json', 'utf8'));

function paths(query, limit = 10) {
  return searchDocuments(documents, query, limit).map((item) => item.url);
}

function expectTop(query, expected, top = 1) {
  const got = paths(query, Math.max(top, 10));
  if (!got.slice(0, top).includes(expected)) {
    throw new Error(`${JSON.stringify(query)} expected ${expected} in top ${top}; got ${got.slice(0, top).join(', ')}`);
  }
}

function expectIncluded(query, expected, top = 5) {
  const got = paths(query, top);
  if (!got.includes(expected)) {
    throw new Error(`${JSON.stringify(query)} expected ${expected} in top ${top}; got ${got.join(', ')}`);
  }
}

function expectExcluded(query, forbidden) {
  const got = paths(query, 30);
  if (got.includes(forbidden)) {
    throw new Error(`${JSON.stringify(query)} must not return ${forbidden}`);
  }
}

// Direct-reference queries: the canonical teaching page should win.
expectTop('Saturn return', '/explore/saturn-return/');
expectTop('house systems', '/explore/house-systems/');
expectTop('birth chart basics', '/explore/birth-chart-basics/');
expectTop('privacy', '/privacy/');

// Specific terms buried inside broader teaching pages still need to be findable.
expectIncluded('Yod', '/explore/chart-patterns/', 5);
expectIncluded('retrograde', '/explore/retrogrades/', 5);
expectIncluded('birth time', '/birth-time/', 5);
expectIncluded('birth time', '/birth-time-toolkit/', 8);
expectIncluded('relationship reading', '/readings/relationship/', 5);
expectIncluded('refund', '/booking-policy/', 8);

// Current-sky searches may have several dated matches, but they must remain searchable.
const mercury = searchDocuments(documents, 'Mercury retrograde', 20);
if (!mercury.some((item) => item.category === 'Current Sky')) {
  throw new Error('Mercury retrograde should return at least one dated Current Sky result');
}
if (mercury.some((item) => item.category === 'Current Sky' && !item.date)) {
  throw new Error('Current Sky event search results must carry an event date');
}

// Noindex/dormant/support routes should never leak into visitor search.
expectExcluded('worksheets', '/birth-time-toolkit/worksheets/');
expectExcluded('courses', '/courses/');
expectExcluded('guides', '/guides/');
expectExcluded('videos', '/videos/');

// Search itself is not useful as a search result.
expectExcluded('search', '/search/');

console.log(`Search relevance: passed against ${documents.length} indexable pages`);
for (const query of ['Saturn return', 'birth time', 'Yod', 'retrograde', 'relationship reading', 'refund', 'Mercury retrograde']) {
  const sample = searchDocuments(documents, query, 5)
    .map((item) => `${item.title} [${item.category}]`)
    .join(' | ');
  console.log(`${query}: ${sample}`);
}
