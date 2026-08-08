# How to Write and Publish a New Article

This is Mo's day-to-day article workflow. **Pages CMS is the normal publishing interface.** You do not need to edit code, YAML, JSON, Astro files, or use Git commands.

## The one rule to remember

> Keep **Draft ON** while you are writing. Turn **Draft OFF** only when you are ready for the article to appear on the website.

## 1. Open the article editor

1. Open Pages CMS and sign in with GitHub.
2. Open the **MoLumenSite** repository.
3. Make sure the selected branch is **main**.
4. Choose **Write & Publish → Blog posts**.
5. Click **New**.

## 2. Fill in the article information

- **Title** — Use the real reader-facing headline. Keep it clear, specific, and natural.
- **Summary / search description** — Write one or two sentences explaining what the article helps the reader understand. This is also used for search and sharing.
- **Publish date** — Use the date you intend the article to be published.
- **Updated date** — Leave blank for a new article. Use it later only for a meaningful revision.
- **Category** — Use a consistent subject category that describes the article.
- **Tags** — Add a few useful topic labels. Do not add every possible keyword.
- **Featured** — Turn this on only when you intentionally want the article emphasized by the site.
- **Draft — hide from the website** — Leave this ON while writing and reviewing.

## 3. Write the article

Write or paste the article into the **Article** rich-text editor.

A strong MoLumen article should:

- start with the reader's real question, experience, or situation rather than a generic introduction;
- use descriptive headings when the article is long enough to need them;
- keep paragraphs comfortable to read on a phone;
- sound warm, grounded, intelligent, and human;
- avoid hype, fear-based astrology, and certainty the astrology cannot support;
- verify factual, historical, astronomical, medical, legal, financial, or other checkable claims with reliable sources;
- link naturally to relevant MoLumen pages when those links help the reader;
- end with a sensible next step when one is relevant, such as another article, a useful resource, the Reading Finder, or an appropriate reading.

Do not force keywords, internal links, or sales language merely for SEO.

## 4. Add images only when they help

Use the **Content images** media area in Pages CMS.

An article does not need an image simply to have one. Add an image when it improves understanding, context, or atmosphere.

## 5. Save without publishing

You can save as often as you want while **Draft remains ON**.

Saving in Pages CMS creates a GitHub commit automatically. You do not need to use GitHub yourself.

## 6. Run the quality check

Before publishing, use **Run site quality check** in Pages CMS.

The check validates the content structure, Astro/type checks, the production build, and internal links.

If it passes, the article is technically healthy. If it fails and the message is not obvious, ask Claude to diagnose it rather than changing code yourself.

## 7. Review staging

Review the article on:

`https://molumen.shanenh.workers.dev/`

Check:

- headline and summary;
- headings and paragraph spacing;
- images;
- internal/external links;
- mobile readability;
- the final call to action or next step.

## 8. Publish

1. Open the article again in Pages CMS.
2. Confirm the title, summary, publish date, category, tags, article text, links, and images.
3. Turn **Draft OFF**.
4. Save.

The website handles the article route, author/schema framework, breadcrumbs, sitemap inclusion, and publishing infrastructure automatically.

## When to ask Claude for help

Use Claude when:

- you have notes or a rough draft and want help shaping the article in Mo's voice;
- the article needs research, fact-checking, or source verification;
- you want stronger SEO/AEO/GEO structure without making the writing mechanical;
- you are unsure which internal pages should be linked;
- you want a deeper metadata, related-content, or CTA review;
- the Pages CMS quality check or site build fails;
- you need a new kind of page or layout the normal article editor does not support.

A useful request is:

> Use the MoLumen Editor and Publisher skills. Help me turn the following notes/draft into a finished MoLumen article. Preserve my voice, verify factual claims that need verification, suggest natural internal links and a useful next step, and return the article ready for me to paste into Pages CMS. Do not change the website code.

## What not to edit yourself for a normal article

Do not edit:

- layout code or CSS;
- Astro components;
- content schemas;
- raw YAML or JSON;
- analytics;
- booking or payment integrations;
- navigation;
- legal pages.

Ask Claude for those changes.

## Five-minute publishing checklist

- [ ] The article has one clear purpose for the reader.
- [ ] The title says what the article is actually about.
- [ ] The summary accurately describes the article.
- [ ] Claims that need verification have been checked.
- [ ] Headings and paragraphs are easy to scan on mobile.
- [ ] Internal links are useful and natural.
- [ ] The ending gives the reader a sensible next step when relevant.
- [ ] The quality check passes.
- [ ] The staging version looks right.
- [ ] Draft is turned OFF only after the final review.

**Simple workflow:** New Article → Draft ON → Write → Save → Quality Check → Review Staging → Draft OFF → Save
