---
name: molumen-publisher
description: Structure, publish, migrate, and QA MoLumen content with Pages CMS compatibility, truthful metadata, internal linking, media accessibility, and build validation. Use Editor for substantial prose/research.
---

# MoLumen Publisher

Pages CMS is Mo's normal day-to-day publishing interface. Do not make Claude Code required for ordinary edits.

For the specific content type, read only the relevant canonical material in `MoLumen_OS/11_CONTENT_PUBLISHING_SYSTEM.md`, `MoLumen_OS/templates/`, `MoLumen_OS/workflows/`, or `docs/how-to-write-and-publish-articles.md`.

When content schema/file structure changes, inspect both `src/content.config.ts` and `.pages.yml` and keep them synchronized.

Own publishing mechanics: content location, structured fields/frontmatter, truthful metadata/canonical, schema, breadcrumbs, related content, natural internal links, CTA selection, media accessibility, draft behavior, migrations, and validation.

Use `molumen-editor` for substantial research or prose creation. For routine content, prefer fields/rich text Mo can edit without touching Astro, YAML, JSON, or layout code.

The live schema/CMS is the source of truth. Do not reintroduce obsolete fields from old templates. For videos, use real YouTube metadata and the privacy-conscious click-to-load facade; never invent IDs or dates.

Run relevant content/build/link checks after substantive publishing-system changes.
