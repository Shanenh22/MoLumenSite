# Content Editing Basics

## The normal way: Pages CMS

Mo should use **Pages CMS** for routine website content. It provides forms and a rich-text editor while saving the underlying files safely to GitHub.

Open Pages CMS, sign in with GitHub, choose the **MoLumenSite** repository and the `main` branch, then choose the content area you want to edit.

The CMS currently exposes:

- **Blog posts** — create and edit articles
- **Current Sky** — create and edit dated sky events
- **Videos** — add YouTube/Instagram entries
- **Readings & services** — edit existing descriptions, approved prices, preparation and availability
- **FAQs**
- **Glossary**
- **Testimonials** — permission safeguards still apply

Not in the CMS: the **Explore Astrology** reference pages, the homepage, About, and the birth-time pages. Those are built in code and change through Shane or the project developer workflow.

See [`docs/pages-cms-for-mo.md`](./pages-cms-for-mo.md) for the step-by-step workflow.

## Draft safety

Blog posts, Current Sky entries and Videos support a **Draft** switch.

- Keep **Draft ON** while working.
- Save as often as needed.
- Draft content is excluded from public website pages.
- When it is ready, turn **Draft OFF** and save.

A save to `main` triggers the existing staging build/deploy workflow, so changes can be reviewed at the Workers staging site before the production-domain cutover.

## Quality check button

Pages CMS includes a **Run site quality check** action. It runs the Astro type/content check, production build and internal-link check. It does not change DNS or deploy the production domain.

## Content that stays protected

Some content remains outside the CMS on purpose, including:

- layout and navigation code
- booking/payment integration details
- analytics
- schema architecture
- legal pages
- credentials and other sensitive trust claims embedded in layout pages
- homepage/About structural copy that is tightly coupled to conversion and layout logic
- Birth Time worksheet structure and PDF generation

For those less-frequent changes, use Claude Code or a developer so the change can be tested with the surrounding layout and business rules.

## Advanced fallback: GitHub files

All content remains ordinary files in GitHub, so nothing is locked into Pages CMS. Developers can still edit the underlying files directly when needed.

- **JSON** is used for structured collections such as services, FAQs, glossary and testimonials.
- **Markdown** is used for Blog posts and Current Sky entries.
- **Astro/TypeScript data** currently powers the Explore Astrology reference library and other code-managed pages.

Avoid direct GitHub editing for routine work when Pages CMS provides the same field; the CMS has the friendlier validation and guardrails.

## Voice and editorial checklist

Use warm authority without mystique: intelligent, grounded, candid, curious, technically informed in plain language, conversational, and agency-first.

- Explain complicated astrology clearly without flattening nuance.
- Preserve wonder without using science as proof of astrology.
- Distinguish astronomical fact, astrological tradition/practice, and Mo's interpretation when the distinction matters.
- Prefer perspective, pattern, timing, possibility, and interpretation over verdicts or commands.
- Prefer practice/tool language over asking readers to decide whether they "believe" in astrology.
- Avoid deterministic claims, fear-based predictions, guru language, fake certainty, scientific-sounding causation claims, and generic self-help endings.
- Match the final link or CTA to the page's actual role instead of sending every reader directly to Book.
- Keep the reader's judgment and choices with them.
