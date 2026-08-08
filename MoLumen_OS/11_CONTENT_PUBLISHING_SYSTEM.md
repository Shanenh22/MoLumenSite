# Content Publishing System

## Policy
Pages CMS is Mo's normal day-to-day publishing interface for supported content. GitHub remains the source of truth; Claude Publisher is the research/structure/quality layer when assistance is needed.

Mo-facing instructions live in:
- `docs/pages-cms-for-mo.md`
- `docs/how-to-write-and-publish-articles.md`

## Sources of truth
- `src/content.config.ts` — live content schemas.
- `.pages.yml` — fields/content surfaces exposed in Pages CMS.
- `src/content/` — collection content.
- `MoLumen_OS/templates/` and `workflows/` — on-demand publishing aids; they must follow the live schema/CMS rather than override it.

## Routine CMS scope
Pages CMS supports configured routine content such as blog posts, Current Sky, videos, FAQs, glossary, testimonials, and approved editable reading/service copy. A content area is not CMS-editable merely because documentation says it is; the collection/config must exist.

Draft-capable content stays unpublished while its `draft` flag is enabled. Review staging/quality checks before publishing when appropriate.

## Protected/code-managed scope
Do not expose high-risk or tightly coupled fields merely for convenience. Keep booking/integration internals, analytics, schema architecture, legal controls, navigation/layout code, tightly coupled verified homepage/About structure, and Birth Time worksheet/PDF generation under code/developer review.

The `/explore/` reference library remains code-managed unless a deliberate content-backed migration is implemented and tested.

## Skill ownership
- `molumen-editor` — substantive research/prose/voice.
- `molumen-publisher` — content structure, frontmatter/fields, metadata, internal links, CMS compatibility, migrations, and publication QA.
- `molumen-developer` — components/layout/schema architecture/performance/site-owned behavior.
- `molumen-integrations` — vendor/account integration code/configuration.

## Maintenance rule
If routine supported content requires editing an Astro component, improve the publishing architecture rather than normalizing manual page coding. When schema/file structure changes, update `src/content.config.ts` and `.pages.yml` together and run relevant content/build/link checks.
