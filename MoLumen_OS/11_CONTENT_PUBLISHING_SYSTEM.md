# Content Publishing System

## Goal
Mo should be able to add and update ordinary content without touching layout code, CSS, schema code, Astro components, raw JSON, or Git commands.

**Pages CMS is the primary day-to-day publishing interface.** GitHub remains the source of truth; Claude Publisher is the publishing/quality layer and Claude Editor handles substantial research/prose work.

## Mo's starting guides
For normal day-to-day work, Mo should use:
- `docs/pages-cms-for-mo.md` — Pages CMS editing
- `docs/how-to-write-and-publish-articles.md` — article workflow

The rest of this file is technical operating guidance.

## Pages CMS scope
Use Pages CMS for routine work on:
- blog posts
- Current Sky
- videos
- existing reading/service copy
- FAQs
- glossary
- testimonials

The `/explore/` reference library is currently code-managed. Do not add a Pages CMS editor for it until the real pages are migrated into a content collection in the same change.

The repository-root `.pages.yml` controls editor fields and guardrails.

## Skill routing
- `molumen-editor` — substantial astrology research, authoring, and prose revision.
- `molumen-publisher` — CMS/schema/frontmatter, metadata, internal links, migrations, publication QA, and unusual content structures.
- `molumen-developer` — layout, components, navigation, accessibility, performance, SEO/schema implementation, and site-owned interactive behavior.
- `molumen-integrations` — Kit, Cal.com/Stripe, GA4, YouTube, search verification, Pages CMS integration configuration, and other vendor-facing work.
- `/molumen-release-manager` — deliberately invoked release/staging/production readiness only.

## Draft workflow
Blog posts, Current Sky entries, and videos support a `draft` flag.
1. Create/edit in Pages CMS.
2. Leave **Draft ON** while working.
3. Save freely; drafts stay out of generated public pages.
4. Run the Pages CMS quality action when useful.
5. Review staging.
6. Turn Draft OFF and save when ready to publish.

## Supported publishing types
- blog
- video
- Current Sky
- horoscope/lunation (Claude-assisted until a dedicated live collection exists)
- FAQ
- glossary
- testimonials
- lead magnet (Claude-assisted when custom layout/download generation is required)
- existing services/readings

Reference/educational pages are supported according to their actual current storage model; do not assume `/explore/` is CMS-editable.

## Publishing concerns where applicable
- metadata/canonical
- author and truthful dates
- schema
- breadcrumbs
- related content/internal links
- newsletter/reading CTA
- Open Graph
- sitemap inclusion
- draft exclusion
- media accessibility

## Protected content
Do not expose high-risk technical/legal fields merely for convenience. Pages CMS intentionally does not provide routine editing for:
- booking event IDs/integration internals
- analytics
- schema architecture
- legal pages
- credentials embedded in trust/layout pages
- navigation/layout code
- homepage/About structural copy tightly coupled to conversion and verified claims
- Birth Time worksheet structure/PDF generation

These changes require the relevant Claude skill and tests.

## Media
Pages CMS provides content images under `public/images/uploads/` and downloads under `public/downloads/`.

## Source of truth
The live content schema in `src/content.config.ts`, actual content files, and `.pages.yml` are authoritative. Templates/workflows must match them. If documentation diverges, fix the documentation rather than teaching Mo to work around the live system.

## Maintenance rule
If adding an ordinary blog post, Current Sky item, FAQ, glossary entry, or video requires editing an Astro component, improve the publishing architecture rather than normalizing manual page coding.
