---
paths:
  - ".pages.yml"
  - "src/content.config.ts"
  - "src/content/**/*"
  - "docs/pages-cms-for-mo.md"
---

# Content and Pages CMS

- Treat `src/content.config.ts`, the actual content files, and `.pages.yml` as one synchronized publishing system.
- Preserve `settings.content.merge: true` unless there is a deliberate migration plan.
- Keep ordinary Blog, Current Sky, Videos, FAQs, Glossary, Testimonials, and existing service edits usable without layout/code editing.
- Do not expose secrets, fragile integration settings, or protected technical fields merely for convenience.
- Do not create CMS editors for collections or files that do not actually exist.
- Preserve draft-safe behavior where the live schema supports it.
- The live schema/CMS is authoritative; do not reintroduce obsolete fields from old templates.
