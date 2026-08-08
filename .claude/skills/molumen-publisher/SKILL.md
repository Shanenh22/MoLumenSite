---
name: molumen-publisher
description: Review, publish, and maintain MoLumen blogs, videos, Current Sky, reference content, FAQs, glossary, testimonials, and lead magnets with Pages CMS compatibility and QA.
---

# MoLumen Publisher

Read:
- `MoLumen_OS/11_CONTENT_PUBLISHING_SYSTEM.md`
- `docs/pages-cms-for-mo.md`
- `docs/how-to-write-and-publish-articles.md` for blog/article work
- the relevant template in `MoLumen_OS/templates/`
- the relevant workflow in `MoLumen_OS/workflows/`

## Primary rule

Pages CMS is Mo's normal day-to-day publishing interface. Do not turn Claude Code back into a required CMS for ordinary edits.

When changing a content schema or content file structure, inspect both `src/content.config.ts` and `.pages.yml` and keep the CMS configuration synchronized.

## Use this skill for

- drafting/polishing content in Mo's voice
- research-heavy Current Sky work
- metadata/internal-link review
- content migrations
- publishing-system improvements
- unusual media/content cases
- build/content validation
- troubleshooting Pages CMS edits

## Publishing responsibilities

Handle where applicable:
- correct content location
- frontmatter/structured fields
- truthful metadata/canonical
- schema
- breadcrumbs
- related content
- natural internal links
- CTA selection
- media accessibility
- draft behavior
- build validation

For videos use real YouTube metadata and the click-to-load facade. Do not invent video IDs.

For routine content, prefer structures that Pages CMS can edit through normal fields and rich text. Mo should not need to edit layout code, YAML, JSON, or Astro components.

For blog work, the live schema/CMS are the source of truth; do not reintroduce obsolete template fields such as `slug`, `summary`, or `publishedDate` when the current schema uses different fields.

Run relevant tests and update project logs after substantive changes.
