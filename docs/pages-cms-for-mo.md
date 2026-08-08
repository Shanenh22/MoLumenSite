# How Mo Updates the Website

Pages CMS is the normal editing interface for routine MoLumen content. You do not need to edit code, YAML, JSON or Astro files.

## Open the editor

1. Open **Pages CMS** and sign in with GitHub.
2. Open the **MoLumenSite** repository.
3. Make sure the selected branch is **main**.
4. Choose the section you want from the left menu.

## The simplest rule

For **Blog posts, Current Sky and Videos**:

> Keep **Draft ON** while you are working. Turn **Draft OFF** only when you want the item to appear on the website.

You can save a draft as many times as you want.

## Add a blog post

1. Open **Write & Publish → Blog posts**.
2. Click **New**.
3. Enter the title, summary, date, category and tags.
4. Leave **Draft — hide from the website** ON.
5. Write or paste the article in the rich-text editor.
6. Save.
7. Use **Run site quality check** if you want a technical check before publishing.
8. When the post is ready, open it again, turn Draft OFF, and save.

The site handles the article page, breadcrumbs, author/schema framework, related-content logic and sitemap automatically.

## Add a Current Sky event

1. Open **Write & Publish → Current Sky**.
2. Click **New**.
3. Add the event title, type and verified date.
4. Record the planets/sign when relevant.
5. Add a short summary.
6. Record the astronomical/ephemeris source and the date it was last verified.
7. Keep **Draft ON** while researching or editing.
8. Write the event note.
9. Save, run the quality check, review, then turn Draft OFF when ready.

Important: astronomical dates should be researched and cross-checked before publication. Claude can help research and draft Current Sky entries, but Pages CMS is where Mo can review/edit the final content.

## Add a YouTube video

1. Upload the finished video to YouTube first.
2. Open **Write & Publish → Videos**.
3. Add a new item.
4. Use a short internal ID such as `saturn-return-basics`.
5. Choose **YouTube**.
6. Paste the YouTube **video ID**, not the entire URL. For example:
   - `https://www.youtube.com/watch?v=ABC123` → use `ABC123`
   - `https://youtu.be/ABC123` → use `ABC123`
7. Enter the real video title, summary, category and published date.
8. Keep Draft ON until the entry is checked.
9. Turn Draft OFF when ready.

The website uses a click-to-load video facade, so YouTube is not loaded on the initial page view.

## Edit a reading/service

Open **Site Content → Readings & services** and choose the reading.

Mo can safely update existing descriptions, who it is for, preparation, what is included, availability and approved price display.

Do **not** change price/duration unless the actual business offering has changed. Booking-event IDs and other technical integration fields are intentionally hidden from the CMS.

## Edit educational/reference content

Open **Site Content → Astrology reference library** and select an existing page.

These pages can be edited through the rich-text editor. Creating or deleting reference pages is intentionally disabled so an accidental click cannot create a thin page or break the topic structure.

## FAQs and glossary

Use **FAQs, Glossary & Trust**.

These are normal structured forms. Use unique lowercase IDs with hyphens when adding an item.

## Testimonials

A testimonial must be genuine and permissioned.

- Paste the client's approved words; do not improve or rewrite the quote.
- Use only the attribution format the client approved.
- Record the permission in **Permission record**.
- Leave **Approved for public use** OFF until permission is documented.

The website already filters out unapproved testimonials.

## Images and downloads

Pages CMS has media areas for:

- **Content images** → stored under `public/images/uploads/`
- **Downloads** → PDF files under `public/downloads/`

Blog/reference rich-text editors can insert uploaded content images.

## After every save

Saving in Pages CMS creates a GitHub commit. The existing GitHub Actions workflow automatically rebuilds and deploys `main` to the staging Worker:

`https://molumen.shanenh.workers.dev/`

That staging site is the place to visually review changes while the production domain has not yet been cut over.

## Run a technical check without Claude Code

Click **Run site quality check** in Pages CMS.

It runs:

- Astro/type/content-schema checks
- production build
- internal-link check

It does **not** deploy the production domain.

## Adding a YouTube video

Videos live in Pages CMS under **Publishing → Videos**. You need the video's ID,
not the whole address: in `https://www.youtube.com/watch?v=AbC123xyz`, the ID is
`AbC123xyz`. If you copied a short link like `https://youtu.be/AbC123xyz`, the ID
is the bit after the slash.

Fill in the title, a short summary, the category and the publication date. Leave
**Draft** ticked while you are still writing; untick it when you want the video
to appear on the site.

One optional field is worth using: **thumbnail**. If you upload a still image,
the site shows that. If you leave it blank the site shows a plain night-sky
panel instead. It never pulls the picture from YouTube — that would quietly tell
Google who is reading the page before anyone presses play, and the privacy
policy promises it does not.

## Editing the birth time guide

The public article at `/birth-time/` and the toolkit worksheets at
`/birth-time-toolkit/worksheets/` are **not** in Pages CMS yet. They are built as
page templates rather than content files, because the worksheets are printable
forms — ruled lines, checkboxes, comparison tables — and exposing that structure
as editable fields would be a good way to break the PDF by accident.

To change the wording, ask Claude Code. Say which page and roughly what you want
changed; it is a small job.

Two things to know if the wording changes:

- The PDF is generated from the worksheets page, so it has to be rebuilt
  afterwards (`npm run toolkit:pdf`). Claude will do this — but if the website
  and the PDF ever disagree, that step was missed.
- A few passages appear both in the page text and in the structured data that
  search engines read. Those are marked in the file. Change both or neither.

## Editing a service FAQ

Reading FAQs live in Pages CMS under **Supporting → FAQs**. Each question has the
question, the answer, and a category.

Only add answers you are sure of. If a question needs a policy decision — a
refund window, what happens if someone is late — write the question, leave the
answer blank, save it as a draft, and flag it. An approximate answer to a policy
question is worse than no answer, because people will hold you to it.

## Replacing the Birth Time Toolkit PDF

If you have a corrected or redesigned PDF, upload it in Pages CMS under
**Downloads** and name it exactly `birth-time-toolkit.pdf`. It will replace the
existing one. Note that the next time anyone regenerates the PDF from the
website it will overwrite yours, so if you want a hand-made version to stick,
say so and it can be made permanent.

## When to use Claude instead of Pages CMS

Use Claude/Claude Code when you want to:

- change page layout or design
- change navigation
- modify homepage/About structural messaging
- change booking, Stripe, Cal.com or Kit integration
- change analytics
- add a brand-new content type
- change schema architecture
- troubleshoot a failed build
- run full accessibility/performance maintenance
- research and draft a batch of future Current Sky entries

For routine writing and editing, Pages CMS should be the simpler path.

## Monthly maintenance

Mo does not need to do technical maintenance manually. Use Claude Code with the MoLumen maintenance workflow for the deeper monthly check. Pages CMS's quality button is the quick check for ordinary content work.
