# Owner Guide — running your website

The site is built so routine content can be maintained without redesigning pages or editing code. **Pages CMS is the normal owner-facing editing interface** for supported content; GitHub remains the source of truth underneath it.

For the step-by-step CMS guide, use `docs/pages-cms-for-mo.md`.

## The 60-second mental model

- **Pages CMS** — routine editing for Blog, Current Sky, Videos, FAQs, Glossary, Testimonials, and approved reading/service copy.
- **`src/content/`** — the content files Pages CMS edits underneath the interface.
- **`src/config/site.ts`** — public brand/legal identity and public integration configuration.
- **`src/config/booking.ts`** — the protected source of truth for reading order, eligibility, booking actions, and Cal.com event mappings.
- **`.pages.yml` + `src/content.config.ts`** — the live CMS/content schema; they must stay synchronized.
- **Astro pages/components** — layout, navigation, schema architecture, tightly coupled tools, and content areas that have not been migrated into CMS-backed content.

Saving to `main` triggers the repository build and deploy workflow. The current staging site is:

`https://molumen.shanenh.workers.dev/`

Production `molumen.com` cutover remains a separate owner-gated release step.

## Brand and legal identity

- Public brand: **Mo Lumen Astrology**
- Confirmed legal name: **Mo Lumen Astrological Services**

Use the public brand in ordinary visitor-facing language. Use the legal name where legal/copyright/business identity requires it. Do not change either without owner confirmation.

## Common tasks

| Task | Normal path |
| --- | --- |
| Publish/edit a blog post | Pages CMS → **Write & Publish → Blog posts** |
| Add/edit a Current Sky event | Pages CMS → **Write & Publish → Current Sky** |
| Add a video | Pages CMS → **Write & Publish → Videos** |
| Edit an existing reading/service description | Pages CMS → **Site Content → Readings & services** |
| Edit FAQs, glossary, testimonials | Pages CMS → **FAQs, Glossary & Trust** |
| Run a routine technical check | Pages CMS → **Run site quality check** |
| Change Explore Astrology pages | Claude Code / code-managed for now |
| Change Birth Time guide/toolkit/PDF | Claude Code |
| Change layout/navigation/schema/integrations | Claude Code |
| Deploy / go live | `docs/deployment.md`, `docs/domain-migration.md` |

## What Pages CMS does not mean

Not every public page is CMS-editable. In particular, **Explore Astrology is still code-managed**. A previous empty CMS editor for it was removed because no real content collection existed. Do not reintroduce that editor until the reference library is deliberately migrated and tested.

The Birth Time guide/toolkit and printable worksheets are also coupled to page/tool/PDF behavior and remain code-managed.

## Business-critical facts

Do not casually change:

- service names;
- prices or price eligibility;
- durations;
- booking mappings;
- cancellation/rescheduling policies;
- credentials;
- legal identity or legal/compliance copy;
- vendor/account configuration.

Change those only when the underlying real-world fact has been confirmed.

## Editorial standard

Routine owner edits should still sound like Mo. The current standard is **warm authority without mystique**: intelligent, grounded, candid, curious, technically informed in plain language, conversational, and agency-first.

Mo explains what she sees and why, while leaving the reader's judgment and choices with them. Preserve wonder, but do not use science as proof of astrology. Prefer perspective, pattern, timing, possibility, and interpretation over certainty or commands.

The canonical guide is `MoLumen_OS/02_BRAND_AND_EDITORIAL_GUIDE.md`.

## Content roles

Keep each part of the site doing a distinct job:

- **Explore Astrology** teaches the language, structure, and limits.
- **Current Sky** observes/interprets shared cycles.
- **Horoscopes** provide a broad rising-sign lens, not an individualized forecast.
- **Blog** develops durable ideas and lets readers think with Mo.
- **Newsletter** is a monthly note from Mo; **The Sky This Month** is one recurring section.
- **Readings** provide individualized synthesis and conversation.

Do not send every page straight to Book. The preferred journey is:

**Learn → deepen → observe Mo's thinking → understand the reading experience → identify the right reading → book.**

## Rules the site enforces

- Services with unconfirmed pricing do not invent a price.
- Testimonials with `approved: false` do not render publicly.
- Legal pages retain their review-status controls.
- Analytics uses the privacy-safe `mlTrack` path and must not receive birth data, personal free-text questions, or rising-sign preference.
- Booking links/actions should originate from `src/config/booking.ts`, not hand-written service/event URLs.
- Welcome-video sections remain hidden until a real video ID is supplied.

## When to use Claude

Use Claude/Claude Code for substantial research or rewriting in Mo's voice, Explore page edits, structural page changes, Current Sky research batches, booking/integrations, schema, analytics, accessibility/performance work, failed builds, Birth Time tool/PDF changes, or any task where several parts of the system must stay synchronized.

The project Claude skills and MoLumen OS now point to the same canonical editorial guidance so the public site, CMS workflow, and agent behavior should not drift apart.
