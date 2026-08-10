import fs from 'node:fs/promises';
import { searchRecords } from '../src/lib/site-search.mjs';

const records = JSON.parse(await fs.readFile(new URL('../dist/search-index.json', import.meta.url), 'utf8'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function paths(query, limit = 8) {
  return searchRecords(records, query, limit).map((r) => r.path);
}

const expectations = [
  ['saturn return', ['/explore/saturn-return/'], 1],
  ['birth time', ['/birth-time/', '/birth-time-toolkit/'], 3],
  ['retrograde', ['/explore/retrogrades/'], 2],
  ['houses', ['/explore/houses/'], 2],
  ['yod', ['/explore/chart-patterns/'], 4],
  ['privacy', ['/privacy/'], 2],
  ['refund', ['/booking-policy/'], 4],
  ['natal reading', ['/readings/natal/'], 3],
  ['relationship compatibility', ['/explore/relationships/', '/readings/relationship/'], 5],
  ['current sky', ['/current-sky/'], 2],
  ['eclipse', ['/explore/eclipses/'], 3],
  ['monthly transits', ['/readings/monthly-personal-transits/'], 4],
];

for (const [query, acceptable, maxRank] of expectations) {
  const result = paths(query, Math.max(8, maxRank));
  const rank = result.findIndex((p) => acceptable.includes(p));
  assert(rank >= 0 && rank < maxRank, `${query}: expected one of ${acceptable.join(', ')} in top ${maxRank}; got ${result.join(', ')}`);
  console.log(`✓ ${query}: ${result.slice(0, 4).join(' | ')}`);
}

const dated = searchRecords(records, 'mercury retrograde 2026', 8);
assert(dated.some((r) => r.group === 'Current Sky' && r.path.startsWith('/current-sky/events/')), 'mercury retrograde 2026: expected a dated Current Sky event in top 8');
assert(dated.filter((r) => r.group === 'Current Sky').every((r) => !r.path.startsWith('/current-sky/events/') || r.date), 'dated Current Sky search results must carry a visible date');
console.log(`✓ mercury retrograde 2026: ${dated.slice(0, 4).map((r) => `${r.path}${r.date ? ` (${r.date})` : ''}`).join(' | ')}`);

const noindexForbidden = ['/courses/', '/guides/', '/birth-time-toolkit/worksheets/'];
for (const forbidden of noindexForbidden) {
  assert(!records.some((r) => r.path === forbidden), `${forbidden} must not be present in search-index.json`);
}
assert(!records.some((r) => r.path === '/search/'), '/search/ must not index itself');
console.log(`✓ exclusions: noindex and search routes omitted`);

// Privacy: only enumerated analytics metadata is sent by the UI; raw query text must never appear in the tracking call.
const searchPage = await fs.readFile(new URL('../src/pages/search.astro', import.meta.url), 'utf8');
assert(searchPage.includes("mlTrack?.('site_search_used', { source: 'search-page' })"), 'search page should track usage with an enumerated source');
assert(!/mlTrack\?\.\([^\n]*query/i.test(searchPage), 'raw search query must not be sent to analytics');
console.log(`✓ privacy: raw query is not sent to analytics`);

console.log(`Search relevance regression suite passed across ${records.length} indexed pages.`);
