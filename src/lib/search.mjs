const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'for', 'from', 'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on',
  'or', 'the', 'to', 'what', 'with', 'you', 'your',
]);

export function normalizeSearchText(value = '') {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function stem(token) {
  if (token.length > 5 && token.endsWith('ies')) return `${token.slice(0, -3)}y`;
  if (token.length > 5 && token.endsWith('es')) return token.slice(0, -2);
  if (token.length > 4 && token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1);
  return token;
}

function queryTokens(query) {
  const raw = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  const useful = raw.filter((token) => !STOPWORDS.has(token));
  return [...new Set((useful.length ? useful : raw).map(stem))];
}

function tokenSet(text) {
  return new Set(normalizeSearchText(text).split(/\s+/).filter(Boolean).map(stem));
}

function containsToken(tokens, token) {
  if (tokens.has(token)) return true;
  for (const candidate of tokens) {
    if (token.length >= 5 && candidate.startsWith(token)) return true;
  }
  return false;
}

export function searchDocuments(documents, rawQuery, limit = 20) {
  const phrase = normalizeSearchText(rawQuery);
  const tokens = queryTokens(rawQuery);
  if (!phrase || tokens.length === 0) return [];

  const results = [];
  for (const doc of documents) {
    const title = normalizeSearchText(doc.title);
    const description = normalizeSearchText(doc.description);
    const headings = normalizeSearchText(doc.headings);
    const body = normalizeSearchText(doc.body);
    const category = normalizeSearchText(doc.category);

    const fields = {
      title: tokenSet(title),
      description: tokenSet(description),
      headings: tokenSet(headings),
      body: tokenSet(body),
      category: tokenSet(category),
    };

    let score = 0;
    if (title === phrase) score += 220;
    else if (title.startsWith(`${phrase} `) || title.endsWith(` ${phrase}`)) score += 150;
    else if (title.includes(phrase)) score += 120;
    if (headings.includes(phrase)) score += 70;
    if (description.includes(phrase)) score += 45;
    if (body.includes(phrase)) score += 16;
    if (category.includes(phrase)) score += 10;

    let matchedTokens = 0;
    for (const token of tokens) {
      let matched = false;
      if (containsToken(fields.title, token)) { score += 30; matched = true; }
      if (containsToken(fields.headings, token)) { score += 14; matched = true; }
      if (containsToken(fields.description, token)) { score += 9; matched = true; }
      if (containsToken(fields.body, token)) { score += 3; matched = true; }
      if (containsToken(fields.category, token)) { score += 5; matched = true; }
      if (matched) matchedTokens += 1;
    }

    // A result must cover the whole meaningful query. This intentionally rejects
    // noisy pages that happen to mention just one word from a multi-word search.
    if (matchedTokens !== tokens.length) continue;
    score += tokens.length * 12;

    // Prefer canonical educational/service pages over generic hubs when the
    // textual evidence is otherwise effectively tied.
    score += Number(doc.priority || 0);
    results.push({ ...doc, score });
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
