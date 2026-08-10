# FAQ Item Template

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
