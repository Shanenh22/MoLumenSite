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

## Keep Mo's voice consistent

When you revise public copy, use the same voice the rest of the site now follows: warm, intelligent, grounded, candid, curious, conversational, and agency-first.

A few practical tests:

- Explain complicated astrology in plain language without flattening it.
- Say what you see and why, then leave the reader's judgment and choices with them.
- Prefer astrology as perspective, pattern, timing, possibility, and interpretation rather than a verdict.
- Keep wonder, but do not use science as proof of astrology or make scientific-sounding claims the evidence does not support.
- Avoid guru language, doom, certainty, generic self-help endings, repetitive slogans, and copy that merely explains an obvious interface action.
- Prefer practice/tool language over making the reader decide whether they "believe" in astrology.

For a substantial rewrite, research-heavy piece, horoscope set, or Current Sky interpretation, Claude can use the project editor skill and the canonical Brand and Editorial Guide.

## Blog posts

Open **Write & Publish → Blog posts**.

Use the article guide above for the complete workflow. The site automatically handles the article page, author/schema framework, breadcrumbs, sitemap inclusion, and publishing infrastructure.

A blog post should develop an idea rather than simply repeat a reference page. At the end, choose a next step that matches the article: Explore or Start Here for foundational learning, Current Sky or Transits for timing, and the Reading Finder when the subject naturally becomes personal.

## Current Sky

1. Open **Write & Publish → Current Sky**.
2. Click **New**.
3. Add the event title, type, and verified date.
4. Record planets/sign when relevant.
5. Add the short summary and event write-up.
6. Record the astronomical/ephemeris source and **Last verified** date.
7. Keep **Draft ON** while researching or editing.
8. Save, run the quality check, review staging, then turn Draft OFF when ready.

Astronomical dates should be researched and cross-checked before publication. Keep a clear distinction between the verified sky event, astronomical facts, astrological tradition/practice, and Mo's interpretation.

Current Sky is a shared-sky lens, not an automated personal forecast. Rising-sign guidance can show the whole-sign house involved, but it should stay explicit about the limits of that general layer. Claude can help research and draft Current Sky entries; Pages CMS is where Mo can review/edit the final content.

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

Do **not** change a service name, price, duration, eligibility rule, policy, or other business-critical fact unless the real offering has changed and Mo has approved the change. Booking-event IDs and technical integration fields are intentionally hidden from the CMS.

The public service copy should continue to frame a reading as collaborative astrological synthesis: Mo brings preparation, technique, and what she is noticing; the client brings the life and question the chart belongs to. Do not promise certainty or tell the client what decision to make.

## Astrology reference library

**The reference library is not in Pages CMS yet.** The pages under **Explore Astrology** — the signs, planets, houses, aspects and topic pages — are still built directly in code.

An editor for them was listed here previously and did not work: it opened an empty section. That has been removed rather than left looking broken.

To change one of those pages for now, send the wording to Shane or use Claude Code. Everything else in this guide is genuinely editable.

Explore should teach the language and structure of astrology. It should not become a free personal chart reading or a generator of individualized interpretations.

## FAQs and glossary

Open **FAQs, Glossary & Trust**.

Use unique lowercase IDs with hyphens when adding items, for example `birth-time-unknown`.

Only publish FAQ answers that are known to be accurate. If an answer depends on a business policy Mo has not decided, do not invent it; ask Claude or Shane to flag it for owner review instead.

Glossary definitions should be clear, compact, and educational. Link to a deeper Explore page when one exists rather than trying to fit the whole subject into the definition.

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

## Newsletter positioning

The newsletter is **a monthly note from Mo**. **The Sky This Month** is one recurring section inside it, not the name or entire purpose of the newsletter.

Newsletter copy can include Current Sky observations, questions, patterns, connections, something from the natural world that has caught Mo's attention, and new work when there is something genuinely worth sharing.

## Choosing the next link or CTA

Do not send every page straight to **Book a Reading**.

Match the next step to the visitor's current intent:

- learning → deeper Explore content or Current Sky;
- following the sky → related Current Sky, calendar, horoscopes, or newsletter;
- evaluating Mo → How Readings Work or Reading Finder;
- comparing services → service details, Reading Finder, then booking when the fit is clear;
- personal question emerging from free content → Reading Finder.

## Legal and brand names

The public brand name is **Mo Lumen Astrology**. The confirmed legal name is **Mo Lumen Astrological Services**. Do not change legal identity, policies, credentials, or compliance copy unless the underlying fact has been verified.

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

- substantial drafting, research, fact-checking, or polishing in Mo's voice;
- page layout or design changes;
- navigation changes;
- homepage/About structural messaging;
- booking, payment, Cal.com, Kit, analytics, or other integrations;
- new content types;
- schema architecture;
- troubleshooting failed builds;
- full accessibility/performance maintenance;
- research-heavy batches of future Current Sky entries;
- changes to the Birth Time guide/worksheets/PDF;
- edits to Explore Astrology until that library is deliberately migrated into CMS-backed content.

For routine writing and editing, Pages CMS should remain the simpler path.

## Monthly maintenance

Mo does not need to perform technical maintenance manually. Use Claude Code with the MoLumen maintenance workflow for deeper maintenance. Pages CMS's quality check is the quick check for ordinary content work.
