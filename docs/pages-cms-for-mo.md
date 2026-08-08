# How Mo Updates the Website

Pages CMS is the normal editing interface for routine MoLumen content. You do not need to edit code, YAML, JSON, Astro files, or use Git commands.

## Start here

1. Open **Pages CMS** and sign in with GitHub.
2. Open the **MoLumenSite** repository.
3. Make sure the selected branch is **main**.
4. Choose the section you want from the left menu.

For a new article, use the dedicated guide:

**`docs/how-to-write-and-publish-articles.md`**

## The simplest rule

For **Blog posts, Current Sky, and Videos**:

> Keep **Draft ON** while you are working. Turn **Draft OFF** only when you want the item to appear on the website.

You can save a draft as many times as you want.

## Blog posts

Open **Write & Publish → Blog posts**.

Use the article guide above for the complete workflow. The site automatically handles the article page, author/schema framework, breadcrumbs, sitemap inclusion, and publishing infrastructure.

## Current Sky

1. Open **Write & Publish → Current Sky**.
2. Click **New**.
3. Add the event title, type, and verified date.
4. Record planets/sign when relevant.
5. Add the short summary and event write-up.
6. Record the astronomical/ephemeris source and **Last verified** date.
7. Keep **Draft ON** while researching or editing.
8. Save, run the quality check, review staging, then turn Draft OFF when ready.

Astronomical dates should be researched and cross-checked before publication. Claude can help research and draft Current Sky entries; Pages CMS is where Mo can review/edit the final content.

## Videos

1. Upload the finished video to YouTube first.
2. Open **Write & Publish → Videos**.
3. Add a new item.
4. Use a short unique internal ID such as `saturn-return-basics`.
5. Choose **YouTube**.
6. Paste the YouTube **video ID**, not the entire URL. Example: `https://youtu.be/ABC123` → `ABC123`.
7. Enter the real title, summary, category, and publication date.
8. Leave **Draft ON** while checking it; turn Draft OFF when ready.

If you upload a custom thumbnail, use the thumbnail field. If left blank, the site keeps the privacy-conscious click-to-load presentation and does not pull YouTube resources before interaction.

## Readings and services

Open **Site Content → Readings & services** and choose the existing reading.

Mo can update approved descriptions, who it is for, preparation, what is included, availability, and approved price display.

Do **not** change price or duration unless the real business offering has changed. Booking-event IDs and technical integration fields are intentionally hidden from the CMS.

## Astrology reference library

**The reference library is not in Pages CMS yet.** The pages under **Explore Astrology** — the signs, planets, houses, aspects and topic pages — are still built directly in code.

An editor for them was listed here previously and did not work: it opened an empty section. That has been removed rather than left looking broken.

To change one of those pages for now, send the wording to Shane. Everything else in this guide is genuinely editable.

## FAQs and glossary

Open **FAQs, Glossary & Trust**.

Use unique lowercase IDs with hyphens when adding items, for example `birth-time-unknown`.

Only publish FAQ answers that are known to be accurate. If an answer depends on a business policy Mo has not decided, do not invent it; ask Claude or Shane to flag it for owner review instead.

## Testimonials

A testimonial must be genuine and permissioned.

- Use the client's approved words; do not improve or rewrite the quote.
- Use only the attribution format the client approved.
- Record how/when permission was obtained in **Permission record**.
- Leave **Approved for public use** OFF until permission is documented.

The website filters out unapproved testimonials.

## Images and downloads

Pages CMS provides:

- **Content images** → `public/images/uploads/`
- **Downloads** → PDF files under `public/downloads/`

The Blog rich-text editor can insert uploaded content images.

## Birth Time guide and toolkit

The public article at `/birth-time/` and printable worksheets at `/birth-time-toolkit/worksheets/` are currently page templates rather than ordinary CMS articles. Their layout and PDF generation are connected, so ask Claude Code when their wording or structure needs to change.

If the worksheet wording changes, the PDF should be regenerated with `npm run toolkit:pdf`. Claude can handle this and verify the result.

## After every save

Saving in Pages CMS creates a GitHub commit. The repository rebuilds and deploys `main` to the staging Worker automatically:

`https://molumen.shanenh.workers.dev/`

Use staging to visually review changes before the future production cutover.

## Run a technical check without Claude Code

Use **Run site quality check** in Pages CMS.

It checks:

- Astro/type/content schemas;
- production build;
- internal links.

It does not perform the production-domain cutover.

## When to use Claude instead of Pages CMS

Use Claude/Claude Code for:

- drafting, research, fact-checking, or polishing in Mo's voice;
- page layout or design changes;
- navigation changes;
- homepage/About structural messaging;
- booking, Stripe, Cal.com, Kit, analytics, or other integrations;
- new content types;
- schema architecture;
- troubleshooting failed builds;
- full accessibility/performance maintenance;
- research-heavy batches of future Current Sky entries;
- changes to the Birth Time guide/worksheets/PDF.

For routine writing and editing, Pages CMS should remain the simpler path.

## Monthly maintenance

Mo does not need to perform technical maintenance manually. Use Claude Code with the MoLumen maintenance workflow for deeper maintenance. Pages CMS's quality check is the quick check for ordinary content work.
