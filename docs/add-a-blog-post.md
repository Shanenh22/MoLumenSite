# Add a Blog Post

Blog posts live in `src/content/blog/`, one Markdown file per post. The filename becomes the URL:
`my-post-slug.md` → `/blog/my-post-slug/`.

## Create a post

```markdown
---
title: "Your Title"
description: "One-sentence summary for search results and cards (under 160 characters)."
publishDate: 2026-09-01
category: "Understanding Readings"
tags: ["readings", "timing"]
heroImage: "chartDetail"
---

Body in Markdown. Use `##` for headings, `[text](/path/)` for links,
`**bold**` and `*italic*` for emphasis.
```

Only `title`, `description`, `publishDate`, and `category` are required.

## Field notes

- **category** — free text. Posts are grouped and filtered by it on `/blog/`, so reuse existing
  categories where they fit rather than inventing near-duplicates.
- **heroImage** — optional. Use any key from `scenes` in `src/config/images.ts` (for example
  `chartDetail`, `natal`, `duskMountains`, `newsletterLetters`). Omit it and a default is used.
  To add a new image, see docs/manage-images.md.
- **draft: true** — keeps a post unpublished while you write. It won't build, appear in listings,
  or show up in the RSS feed.
- **updatedDate** — add it when you revise a post; it displays on the page and in metadata.

## What happens automatically

The post appears at its URL, on `/blog/` (newest first), in the category filter, in the RSS feed
at `/rss.xml`, and in the sitemap. Related posts are suggested at the bottom of each post,
preferring the same category. BlogPosting structured data is generated for search engines.

## Where posts go vs. sky events

- **Blog** (`src/content/blog/`) — essays, guides, opinion, teaching. Not tied to a date in the sky.
- **Current Sky** (`src/content/sky-events/`) — dated lunations, eclipses, retrogrades, and
  ingresses. See docs/update-current-sky.md.

If a piece is a lunation letter, it belongs in Current Sky. Everything else belongs in the blog.
