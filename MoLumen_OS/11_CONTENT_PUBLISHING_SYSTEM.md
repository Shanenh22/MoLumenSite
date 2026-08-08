# Content Publishing System

## Goal

Mo should be able to add and update ordinary content without touching layout code, CSS, schema code, Astro components, raw JSON, or Git commands.

**Pages CMS is the primary day-to-day publishing interface.** GitHub remains the source of truth, and Claude Publisher remains the editorial/quality layer.

## Mo's two starting guides

For normal day-to-day work, Mo should start with these instead of reading the technical OS:

- `docs/pages-cms-for-mo.md` — how to update the site through Pages CMS
- `docs/how-to-write-and-publish-articles.md` — step-by-step article workflow

The remainder of this file is operating guidance for Claude/developers.

## Division of responsibility

### Pages CMS — Mo's normal interface

Use Pages CMS for routine work on:

- blog posts
- Current Sky
- videos
- existing reading/service copy
- existing astrology reference pages
- FAQs
- glossary
- testimonials

The repository-root `.pages.yml` controls the editor fields and guardrails.

### Claude Publisher — research, review and unusual work

Use the `molumen-publisher` skill when:

- Mo wants help drafting or polishing content
- a batch of Current Sky events needs research
- a content item needs an unusual structure
- metadata/internal links need a deeper review
- the build or CMS workflow fails
- a new content type is needed
- site-wide content maintenance is requested

Claude should preserve Pages CMS compatibility when changing content schemas.

### Claude Developer — technical changes

Use the developer skill for layout, components, navigation, analytics, booking, integrations, schema architecture, performance and other code-level work.

## Draft workflow

Blog posts, Current Sky entries and videos support a `draft` flag.

1. Create/edit the content in Pages CMS.
2. Leave **Draft ON** while working.
3. Save freely; draft items stay out of generated public pages.
4. Run the Pages CMS **Run site quality check** action when useful.
5. Review the staging site.
6. Turn Draft OFF and save when the item is ready to appear on the website.

## Supported publishing types

- blog
- video
- Current Sky
- horoscope/lunation (Claude-assisted until a dedicated live collection is added)
- reference/educational page
- FAQ
- glossary
- testimonials
- lead magnet (Claude-assisted where the format requires custom layout/download generation)
- existing services/readings

## Automation should cover where applicable

- metadata
- canonical URL
- author
- dates
- schema
- breadcrumbs
- related content
- newsletter CTA
- reading CTA
- Open Graph
- internal-link hooks
- sitemap inclusion
- draft exclusion

## Protected content

Do not expose high-risk technical or legal fields merely for convenience. Pages CMS intentionally does not provide routine editing for:

- booking event IDs and integration internals
- analytics
- schema architecture
- legal pages
- credentials embedded in trust/layout pages
- site navigation/layout code
- homepage/About structural copy that is tightly coupled to conversion and verified claims
- Birth Time worksheet structure/PDF generation

Those changes should go through Claude Code/developer review and tests.

## Media

Pages CMS provides:

- content images under `public/images/uploads/`
- PDF/download files under `public/downloads/`

The repository remains portable; content is not locked into a CMS database.

## Source-of-truth rule for schemas

The live content schema in `src/content.config.ts` and the live Pages CMS configuration in `.pages.yml` are authoritative. Templates and workflows must match them. If they diverge, update the documentation/template rather than teaching Mo to work around the CMS.

## Maintenance rule

If adding an ordinary blog post, Current Sky item, FAQ, glossary entry or video requires editing an Astro component, improve the publishing architecture rather than normalizing manual page coding.
