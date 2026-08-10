# MoLumen Project State

Last reviewed: 2026-08-10

Read only when a task depends on current cross-session status. Code/config remains authoritative for implementation facts.

## Current platform
- Astro 5 static site. Public brand: **Mo Lumen Astrology**. Confirmed legal name: **Mo Lumen Astrological Services**.
- Seven paid reading pages, Reading Finder, and service-aware booking handoff are live in the codebase.
- `src/config/booking.ts` owns reading order, eligibility labels, booking actions, bare `/book/` default, and service/event mappings. Do not hand-write `/book/?service=`.
- Primary nav: Readings / Explore Astrology / Current Sky / From Mo + Book. Current Sky dropdown includes Current Sky, Horoscopes, Sky Calendar, The Sky in 2026, and Archive.
- Shared CTA behavior is intent-aware rather than Book-first.
- Pages CMS is the normal interface for supported routine content. Explore remains code-managed until a deliberate content migration exists.
- Current Sky coverage extends through December 2027; maintain a rolling horizon.
- Birth Time guide/toolkit/PDF, sky calendar, Birth Time Confidence, and rising-sign preference are implemented.
- Mobile rising-sign UI uses one dropdown; selecting a sign isolates it and "Show all signs" restores all. Redundant explanatory UI copy was removed.
- Horoscopes/Current Sky distinguish rising-sign house guidance from individualized interpretation.
- Newsletter positioning is **a monthly note from Mo**; "The Sky This Month" is one recurring section.
- Welcome-video slots render only when a real video ID exists.
- `llms.txt` maps the practice, free-learning boundaries, Current Sky/horoscope limits, readings, and machine-readable identity for answer engines.
- Shared structured data now reserves `Article` for genuine editorial/reference pages. Hubs, calendars, archives, glossaries, and reference indexes receive `WebPage` freshness metadata rather than being mislabeled as articles.
- Validation covers build, content, links, booking integrity, interactive flows, analytics privacy, accessibility, and performance.

## Editorial/product truths
- Audience: thoughtful adults at meaningful crossroads who want perspective without surrendering judgment or agency.
- Promise: clarity without surrendering agency. Mo gives another map; the client still drives.
- Practice: collaborative astrological synthesis. Technique, intuition, lived experience, and conversation inform one another; intuition can suggest where to look but does not end the inquiry.
- Voice: warm authority without mystique; intelligent, grounded, candid, curious, technically informed in plain language, conversational, agency-first.
- Wonder matters as much as credibility. Natural-science experience informs observation/systems thinking; it does not prove astrology.
- Prefer practice/tool language over belief/faith framing. Do not use resonance/frequency/causation claims as established fact.
- Content roles: Explore teaches; Current Sky interprets shared cycles; Horoscopes give a broad rising-sign lens; Blog develops ideas; Newsletter builds relationship; paid readings provide individualized synthesis.
- Preferred journey: **Learn → deepen → observe Mo's thinking → understand the reading experience → identify the right reading → book.**
- Canonical editorial guidance: `MoLumen_OS/02_BRAND_AND_EDITORIAL_GUIDE.md`.

## Architecture truths
- `src/config/site.ts` — brand/legal identity + public integration config.
- `src/config/booking.ts` — reading/order/booking source of truth.
- `src/layouts/BaseLayout.astro` — global metadata, privacy-safe analytics shell, and base structured-data classification.
- `src/content.config.ts` + `.pages.yml` — live content/CMS system.
- `docs/pages-cms-for-mo.md` — owner CMS workflow.
- `src/content/services/*.json` — service data.
- `src/content/sky-events/*.md` — Current Sky data.

## Release posture
- Staging canonicals/sitemap point at molumen.com by design; there is no staging noindex/robots block. See `docs/deployment.md` before changing this.
- `molumen.com` cutover remains owner-gated.
- Repository checks prove code readiness; external-account state must be verified separately.

## Unresolved owner/external work
- Complete/verify Cal.com account-side setup in `docs/calcom-setup-for-mo.md`, then run an end-to-end booking/payment/confirmation/intake test.
- Verify newsletter delivery and GA4 reception/consent events.
- Complete owner/legal/accessibility items in `BACKLOG.md`.
- Supply welcome-video ID/poster and additional permissioned testimonials when ready.
- No 2027 annual overview page exists; do not invent one merely because 2027 event entries exist.

## Durable traps
- Re-verify old audit findings before acting.
- Read live config for volatile IDs/facts.
- Never choose among eligibility-dependent booking options for the visitor.
- Keep birth data, free-text personal questions, and rising-sign preference out of analytics.
- Do not describe celestial-event pages as hosted `Event` entities in schema merely because they have dates.
- Do not classify navigation/collection pages as `Article` merely because they live under an editorial URL prefix.
- Keep historical reports out of routine context.
- When editorial strategy changes materially, update the canonical OS guide, relevant Claude skills, and owner-facing CMS guidance together.
