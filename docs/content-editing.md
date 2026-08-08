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

Not in the CMS: the **Explore Astrology** reference pages, the homepage, About, and the birth-time pages. Those are built in code and change through Shane.

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

For those less-frequent changes, use Claude Code or a developer so the change can be tested with the surrounding layout and business rules.

## Advanced fallback: GitHub files

All content remains ordinary files in GitHub, so nothing is locked into Pages CMS. Developers can still edit Markdown/JSON directly when needed.

- **JSON** is used for structured lists such as services, FAQs, videos, glossary and testimonials.
- **Markdown** is used for prose such as blog posts, Current Sky entries and educational pages.

Avoid direct GitHub editing for routine work when Pages CMS provides the same field; the CMS has the friendlier validation and guardrails.

## Voice checklist

Warm, candid, practical and agency-first. Explain technical terms on first use. Avoid fear-based predictions, guaranteed outcomes, “the universe wants,” or medical/legal/financial claims. Choice stays with the reader.
