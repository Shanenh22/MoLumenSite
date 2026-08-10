---
paths:
  - ".pages.yml"
  - "src/content.config.ts"
  - "src/content/**/*"
  - "docs/pages-cms-for-mo.md"
---

# Content and Pages CMS

- Treat `src/content.config.ts`, the actual content files, `.pages.yml`, and `docs/pages-cms-for-mo.md` as one synchronized publishing system.
- Use `MoLumen_OS/02_BRAND_AND_EDITORIAL_GUIDE.md` as the canonical voice/page-role guidance when CMS-facing labels, descriptions, workflows, or public copy change materially.
- Preserve `settings.content.merge: true` unless there is a deliberate migration plan.
- Keep ordinary Blog, Current Sky, Videos, FAQs, Glossary, Testimonials, and existing service edits usable without layout/code editing.
- Keep the Explore reference library code-managed until a real content-backed migration is implemented and tested; do not restore an empty CMS editor.
- Do not expose secrets, fragile integration settings, booking mappings, legal/compliance controls, or protected technical fields merely for convenience.
- Preserve draft-safe behavior where the live schema supports it.
- Preserve owner-verified business facts: service names, prices, durations, eligibility, policies, credentials, and legal identity.
- The public brand is `Mo Lumen Astrology`; the confirmed legal name is `Mo Lumen Astrological Services`.
- The live schema/CMS is authoritative; do not reintroduce obsolete fields or stale editorial positioning from old templates.
- CMS convenience must not flatten content roles: Explore teaches, Current Sky interprets shared cycles, Blog develops ideas, newsletter is broader monthly correspondence, and paid readings provide individualized synthesis.
