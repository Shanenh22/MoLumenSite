# Add an Article

1. Create `src/content/articles/my-article-slug.md`:
```markdown
---
title: "Your Title"
description: "One-sentence summary for search results and cards (under 160 chars)."
publishDate: 2026-09-01
category: "Understanding Readings"
tags: ["readings"]
---

Body in Markdown…
```
2. The article appears at `/articles/my-article-slug/`, on the articles index, and in the RSS feed.
3. Use `draft: true` in frontmatter to keep it unpublished while writing.
4. Update later? Add `updatedDate: 2026-10-01` — it shows on the page and in metadata.
