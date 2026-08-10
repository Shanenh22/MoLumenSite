# MoLumen Project State

Last reviewed: 2026-08-10

Read only for current cross-session status. Code/config remains authoritative for implementation facts.

## Platform
- Astro 5 static site for **Mo Lumen Astrology**; confirmed legal name: **Mo Lumen Astrological Services**.
- Seven paid readings, Reading Finder, and service-aware booking are implemented. `src/config/booking.ts` owns reading order, eligibility, booking actions, bare `/book/` behavior, and service/event mappings; do not hand-write `/book/?service=`.
- Primary nav: Readings / Explore Astrology / Current Sky / From Mo + Book. Shared CTAs are intent-aware rather than Book-first.
- Pages CMS is the routine interface for supported content; Explore remains code-managed pending a deliberate migration. `src/content.config.ts` + `.pages.yml` are the live content/CMS contract.
- Current Sky data extends through Dec. 2027; maintain a rolling horizon. No 2027 annual overview page exists.
- Birth Time guide/toolkit/PDF, sky calendar, Birth Time Confidence, and rising-sign preference are implemented. Mobile horoscopes use one sign dropdown plus “Show all signs.”
- Newsletter = **a monthly note from Mo**; “The Sky This Month” is one recurring section. Welcome-video UI/schema renders only with real metadata.
- `llms.txt` maps practice identity, free-learning boundaries, readings, Current Sky, and horoscope limits for answer engines.
- Base structured data uses `Article` only for genuine editorial/reference pages; hubs, calendars, archives, glossaries, and indexes use `WebPage` freshness metadata.
- Validation covers build, content, links, booking integrity, interactive flows, analytics privacy, accessibility, and performance.

## Editorial/product truths
- Audience: thoughtful adults at meaningful crossroads who want perspective without surrendering judgment or agency.
- Promise: clarity without surrendering agency. Mo gives another map; the client still drives.
- Practice: collaborative astrological synthesis; technique, intuition, lived experience, and conversation inform one another.
- Voice: warm authority without mystique; grounded, candid, curious, technically informed in plain language, conversational, agency-first.
- Wonder matters as much as credibility. Natural-science experience informs observation/systems thinking; it does not prove astrology.
- Prefer practice/tool language over belief/faith framing. Do not present resonance, frequency, or causation claims as established fact.
- Content roles: Explore teaches; Current Sky interprets shared cycles; Horoscopes give a broad rising-sign lens; Blog develops ideas; Newsletter builds relationship; readings provide individualized synthesis.
- Preferred journey: **Learn → deepen → observe Mo's thinking → understand the reading experience → identify the right reading → book.**
- Canonical editorial guide: `MoLumen_OS/02_BRAND_AND_EDITORIAL_GUIDE.md`.

## Sources of truth
- `src/config/site.ts` — brand/legal identity + public integrations.
- `src/config/booking.ts` — reading/order/booking.
- `src/layouts/BaseLayout.astro` — global metadata, privacy-safe analytics, base schema.
- `src/content.config.ts` + `.pages.yml` — content/CMS schema.
- `docs/pages-cms-for-mo.md` — owner CMS workflow.
- `src/content/services/*.json` — service facts.
- `src/content/sky-events/*.md` — Current Sky data.

## Release posture / owner gates
- Staging canonicals/sitemap intentionally point at molumen.com; do not add staging noindex without reading `docs/deployment.md`.
- Production `molumen.com` cutover remains owner-gated. Repo checks prove code readiness, not external-account readiness.
- Verify Cal.com account setup and one full booking/payment/confirmation/intake flow.
- Verify newsletter delivery and GA4 reception/consent events.
- Complete owner/legal/accessibility items in `BACKLOG.md`.
- Add welcome-video metadata and more permissioned testimonials only when supplied.

## Durable traps
- Re-verify old audit findings before acting; read live config for volatile IDs/facts.
- Never choose among eligibility-dependent booking options for a visitor.
- Keep birth data, free-text personal questions, and rising-sign preference out of analytics.
- Celestial-event pages are not hosted schema.org `Event` entities merely because they have dates.
- Navigation/collection pages are not `Article` merely because they sit under editorial paths.
- Keep historical reports out of routine context.
- When editorial strategy changes materially, update the canonical OS guide, relevant Claude skills, and owner CMS guidance together.
