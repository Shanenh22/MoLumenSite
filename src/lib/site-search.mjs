const STOP = new Set(['a','an','and','are','as','at','be','by','do','for','from','how','i','in','is','it','my','of','on','or','the','to','what','when','where','which','with','your']);

export function normalize(value = '') {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function stem(token) {
  if (token.length > 4 && token.endsWith('ies')) return token.slice(0, -3) + 'y';
  if (token.length > 3 && token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1);
  return token;
}

export function queryTokens(query) {
  const raw = normalize(query).split(' ').filter(Boolean);
  const useful = raw.filter((t) => !STOP.has(t));
  return [...new Set((useful.length ? useful : raw).map(stem))];
}

function fieldTokens(value) {
  return new Set(normalize(value).split(' ').filter(Boolean).map(stem));
}

function containsAll(fieldSets, tokens) {
  const union = new Set();
  for (const set of fieldSets) for (const token of set) union.add(token);
  return tokens.every((token) => union.has(token));
}

const GROUP_PRIOR = {
  Learn: 8,
  Readings: 7,
  'Help & policies': 6,
  Resources: 5,
  'From Mo': 4,
  Blog: 3,
  'Current Sky': 1,
  Site: 0,
};

export function scoreRecord(record, query) {
  const phrase = normalize(query);
  const tokens = queryTokens(query);
  if (!phrase || !tokens.length) return 0;

  const title = normalize(record.title);
  const h1 = normalize(record.h1);
  const headings = normalize(record.headings);
  const description = normalize(record.description);
  const body = normalize(record.body);
  const path = normalize(record.path);
  const sets = [title, h1, headings, description, body, path].map(fieldTokens);

  // Precision first: every meaningful query term must occur somewhere on the page.
  if (!containsAll(sets, tokens)) return 0;

  let score = GROUP_PRIOR[record.group] ?? 0;
  if (title === phrase) score += 500;
  else if (title.startsWith(phrase + ' ')) score += 240;
  else if (title.includes(phrase)) score += 180;
  if (h1 === phrase) score += 360;
  else if (h1.includes(phrase)) score += 150;
  if (headings.includes(phrase)) score += 90;
  if (description.includes(phrase)) score += 70;
  if (body.includes(phrase)) score += 18;

  const weights = [55, 45, 24, 18, 2, 12];
  sets.forEach((set, index) => {
    for (const token of tokens) if (set.has(token)) score += weights[index];
  });

  // Specific queries containing a year should favor dated Current Sky material.
  if (/\b20\d{2}\b/.test(phrase) && record.group === 'Current Sky') score += 60;
  return score;
}

export function searchRecords(records, query, limit = 12) {
  return records
    .map((record) => ({ record, score: scoreRecord(record, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, limit)
    .map(({ record, score }) => ({ ...record, score }));
}
