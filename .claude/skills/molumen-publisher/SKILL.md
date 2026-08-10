---
name: molumen-publisher
description: Structure, publish, migrate, and QA MoLumen content with Pages CMS compatibility, truthful metadata, intent-aware internal linking, media accessibility, and build validation. Use Editor for substantial prose/research.
---

# MoLumen Publisher

Pages CMS is Mo's normal day-to-day publishing interface for supported content. Do not make Claude Code required for ordinary edits.

For the specific content type, read only the relevant canonical material in `MoLumen_OS/11_CONTENT_PUBLISHING_SYSTEM.md`, `MoLumen_OS/02_BRAND_AND_EDITORIAL_GUIDE.md`, `MoLumen_OS/templates/`, `MoLumen_OS/workflows/`, or `docs/how-to-write-and-publish-articles.md`.

When content schema/file structure changes, inspect both `src/content.config.ts` and `.pages.yml` and keep them synchronized.

Own publishing mechanics: content location, structured fields/frontmatter, truthful metadata/canonical, schema, breadcrumbs, related content, natural internal links, CTA selection, media accessibility, draft behavior, migrations, and validation.

Treat page role as part of publishing quality. A substantial page should have an intelligent next step that matches the visitor's intent rather than defaulting to Book. Learning content generally deepens learning or points to Current Sky; credibility pages point to How Readings Work or the Reading Finder; service pages can move toward booking once fit is clear.

Protect the ecosystem boundaries: Explore teaches the language and structure; Current Sky applies shared-cycle interpretation; Blog develops durable ideas; the newsletter is broader monthly correspondence; paid readings provide individualized synthesis. Do not turn free content or interactive tools into automated personal readings.

Use `molumen-editor` for substantial research or prose creation. For routine content, prefer fields/rich text Mo can edit without touching Astro, YAML, JSON, or layout code. Visitor-facing CMS instructions should be clear and should not narrate implementation details unnecessarily.

The live schema/CMS is the source of truth. Do not reintroduce obsolete fields from old templates. When an OS template represents a configured content type, keep its field names aligned with the live schema/CMS; mark templates for unimplemented content types as planning-only. For videos, use real YouTube metadata and the privacy-conscious click-to-load facade; never invent IDs or dates.

Preserve business-critical facts exactly unless owner-verified: service names, prices, durations, eligibility, credentials, policies, legal identity, and integration mappings.

Run relevant content/build/link checks after substantive publishing-system changes.
