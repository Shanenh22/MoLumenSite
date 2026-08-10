from pathlib import Path
import json


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    if old not in text:
        raise SystemExit(f"Expected text not found in {path}: {old!r}")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")


replace_once(
    "src/layouts/BaseLayout.astro",
    'title={`${site.name}: Current Sky & Articles`}',
    'title={`${site.name}: Articles`}',
)

Path("MoLumen_OS/templates/video-template.md").write_text(
    '''# Video Item Template

<!--
This is a publishing scaffold for one item inside `src/content/videos/videos.json`.
It mirrors the live Astro schema and Pages CMS fields; Videos are stored as a JSON
list, not as standalone Markdown files. Mo normally creates/edits them in Pages CMS.
Optional `thumbnail` and `durationSeconds` fields should be added only when the real
metadata is known.
-->

```json
{
  "id": "",
  "platform": "youtube",
  "externalId": "",
  "title": "",
  "description": "",
  "category": "astrology-basics",
  "publishedDate": "YYYY-MM-DD",
  "featured": false,
  "transcriptStatus": "none",
  "related": [],
  "draft": true
}
```

## Publisher checklist
- [ ] `id` is unique, lowercase, and hyphenated
- [ ] `platform` is `youtube` or `instagram`
- [ ] `externalId` is the real YouTube video ID or Instagram URL
- [ ] Title, description, publication date, and category match the published video
- [ ] Category is one of `current-sky`, `astrology-basics`, `relationships`, or `personal-purpose`
- [ ] Optional thumbnail/duration are real rather than inferred
- [ ] Transcript status describes what actually exists
- [ ] Related paths are valid and useful
- [ ] Privacy-conscious click-to-load facade remains intact
- [ ] Draft stays true until metadata, links, and playback are reviewed
- [ ] Relevant content/build/link checks pass
''',
    encoding="utf-8",
)

Path("MoLumen_OS/templates/faq-template.md").write_text(
    '''# FAQ Item Template

<!--
This is a publishing scaffold for one item inside `src/content/faqs/faqs.json`.
It mirrors the live Astro schema and Pages CMS fields. FAQs are JSON list items,
not standalone Markdown pages. Answer naturally; do not create FAQs only for schema.
-->

```json
{
  "id": "",
  "question": "",
  "answer": "",
  "scope": "global",
  "order": 0
}
```

## Publisher checklist
- [ ] `id` is unique, lowercase, and hyphenated
- [ ] Question reflects a real visitor question
- [ ] Answer is accurate, plain-language, and does not invent policy or business facts
- [ ] `scope` is `global` or an existing service slug
- [ ] Display order is intentional
- [ ] FAQ schema is emitted only from genuinely visible FAQ content
''',
    encoding="utf-8",
)

Path("MoLumen_OS/templates/glossary-template.md").write_text(
    '''# Glossary Item Template

<!--
This is a publishing scaffold for one item inside `src/content/glossary/terms.json`.
It mirrors the live Astro schema and Pages CMS fields. Glossary entries are JSON
list items, not standalone Markdown pages. Add `learnLink` only when a real deeper
page exists.
-->

```json
{
  "id": "",
  "term": "",
  "definition": "",
  "related": []
}
```

## Publisher checklist
- [ ] `id` is unique, lowercase, and hyphenated
- [ ] Definition is compact, clear, and educational
- [ ] Specialized language is explained without flattening nuance
- [ ] Related IDs exist
- [ ] Optional `learnLink` points to a real deeper page
''',
    encoding="utf-8",
)

lead = Path("MoLumen_OS/templates/lead-magnet-template.md")
lead_text = lead.read_text(encoding="utf-8")
lead_note = '''<!--
Planning scaffold only. There is no live lead-magnet content collection or Pages CMS editor.
Do not treat the fields below as a runtime schema; add a real collection/CMS contract only when
an owner-approved lead magnet beyond the Birth Time Toolkit is implemented.
-->

'''
if not lead_text.startswith("<!--\nPlanning scaffold only."):
    lead.write_text(lead_note + lead_text, encoding="utf-8")

replace_once(
    "MoLumen_OS/11_CONTENT_PUBLISHING_SYSTEM.md",
    "- `MoLumen_OS/templates/` and `workflows/` — on-demand publishing aids; they must follow the live schema/CMS and canonical editorial guide rather than override them.\n",
    "- `MoLumen_OS/templates/` and `workflows/` — on-demand publishing aids; they must follow the live schema/CMS and canonical editorial guide rather than override them.\n\nTemplates tied to a configured content type must mirror the live schema/CMS field names. Templates for content types that do not yet exist must say explicitly that they are planning scaffolds rather than runtime schemas.\n",
)

replace_once(
    ".claude/skills/molumen-publisher/SKILL.md",
    "The live schema/CMS is the source of truth. Do not reintroduce obsolete fields from old templates. For videos, use real YouTube metadata and the privacy-conscious click-to-load facade; never invent IDs or dates.\n",
    "The live schema/CMS is the source of truth. Do not reintroduce obsolete fields from old templates. When an OS template represents a configured content type, keep its field names aligned with the live schema/CMS; mark templates for unimplemented content types as planning-only. For videos, use real YouTube metadata and the privacy-conscious click-to-load facade; never invent IDs or dates.\n",
)

contract = '''import fs from 'node:fs';

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
'''
Path("scripts/check-publishing-contracts.mjs").write_text(contract, encoding="utf-8")

pkg_path = Path("package.json")
pkg = json.loads(pkg_path.read_text(encoding="utf-8"))
scripts = pkg["scripts"]
scripts["check:publishing-contracts"] = "node scripts/check-publishing-contracts.mjs"
core = scripts["verify:core"]
if "check:publishing-contracts" not in core:
    scripts["verify:core"] = core.replace(
        "npm run check:agent-docs && ",
        "npm run check:agent-docs && npm run check:publishing-contracts && ",
        1,
    )
pkg_path.write_text(json.dumps(pkg, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

print("Applied final RSS/template/CMS/Claude/OS synchronization.")
