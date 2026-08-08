# Publish Blog

## Normal Mo workflow

Pages CMS is the default interface for routine article publishing.

1. Open **Write & Publish → Blog posts** in Pages CMS.
2. Create a new article and leave **Draft ON**.
3. Complete title, description, publish date, category, tags, and article body.
4. Write or paste the article in the rich-text editor.
5. Save freely while Draft remains ON.
6. Run **Run site quality check** before publishing.
7. Review the staging version for readability, links, images, and CTA.
8. Turn **Draft OFF** and save only when the article is ready to appear publicly.

## Claude Publisher responsibilities

When Claude is helping with an article:

1. Read `MoLumen_OS/templates/blog-post-template.md` and the editorial guide.
2. Preserve Mo's voice and reader intent.
3. Verify research-heavy factual claims with reliable sources.
4. Validate the article against the live blog schema and Pages CMS fields.
5. Add natural internal links and related content only when useful.
6. Confirm metadata, schema, canonical, breadcrumbs, sitemap behavior, and CTA are handled correctly by the existing publishing system.
7. Run relevant build/content/link checks.
8. Keep Pages CMS compatibility intact.

Do not require Mo to edit Astro, YAML, JSON, schema, or Git commands for an ordinary article.
