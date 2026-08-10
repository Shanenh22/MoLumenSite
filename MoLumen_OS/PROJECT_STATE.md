# MoLumen Project State

Last reviewed: 2026-08-10

Read for cross-session status only. Code/config is authoritative for implementation facts.

## Platform
- Astro 5 static site: **Mo Lumen Astrology**; legal name **Mo Lumen Astrological Services**.
- Seven readings, Reading Finder, and service-aware booking are implemented. `src/config/booking.ts` owns reading order, eligibility, actions, bare `/book/`, and event mappings; do not hand-write service booking URLs.
- Pages CMS handles supported routine content; Explore remains code-managed. `src/content.config.ts` + `.pages.yml` are the live content/CMS contract.
- Current Sky data extends through Dec. 2027; maintain a rolling horizon. There is no 2027 annual overview page.
- Birth Time guide/toolkit/PDF, sky calendar, Birth Time Confidence, and rising-sign preference are implemented.
- Newsletter = **a monthly note from Mo**; “The Sky This Month” is one section. Welcome-video UI/schema requires real metadata.
- `llms.txt` maps practice identity, free-learning boundaries, readings, Current Sky, and horoscope limits for answer engines.
- Base schema uses `Article` only for genuine editorial/reference pages; collection/index surfaces use `WebPage` freshness metadata.

## Editorial/product truths
- Audience: thoughtful adults at meaningful crossroads who want perspective without surrendering judgment or agency.
- Promise: clarity without surrendering agency. Mo gives another map; the client still drives.
- Practice: collaborative astrological synthesis; technique, intuition, lived experience, and conversation inform one another.
- Voice: warm authority without mystique; grounded, candid, curious, technically informed in plain language, conversational, agency-first.
- Natural-science experience informs observation/systems thinking; it does not prove astrology. Do not present resonance, frequency, or causation claims as established fact.
- Roles: Explore teaches; Current Sky interprets shared cycles; Horoscopes give a broad rising-sign lens; Blog develops ideas; Newsletter builds relationship; readings provide individualized synthesis.
- Journey: **Learn → deepen → observe Mo's thinking → understand the reading experience → identify the right reading → book.**
- Canonical guide: `MoLumen_OS/02_BRAND_AND_EDITORIAL_GUIDE.md`.

## Sources of truth
- `src/config/site.ts` — identity/integrations; `src/config/booking.ts` — readings/booking.
- `src/layouts/BaseLayout.astro` — global metadata, privacy-safe analytics, base schema.
- `src/content.config.ts` + `.pages.yml` — content/CMS; `docs/pages-cms-for-mo.md` — owner workflow.
- `src/content/services/*.json` and `src/content/sky-events/*.md` — service and Current Sky facts.

## Release posture / owner gates
- Staging canonicals/sitemap intentionally point at molumen.com; read `docs/deployment.md` before changing indexing behavior.
- Production `molumen.com` cutover is owner-gated. Repo checks prove code readiness, not external-account readiness.
- Verify Cal.com account setup plus one full booking/payment/confirmation/intake flow.
- Verify newsletter delivery and GA4 reception/consent events; complete owner/legal/accessibility items in `BACKLOG.md`.
- Add welcome-video metadata or more permissioned testimonials only when supplied.

## Durable traps
- Re-verify old audit findings; read live config for volatile facts.
- Never choose an eligibility-dependent booking option for a visitor.
- Keep birth data, free-text personal questions, and rising-sign preference out of analytics.
- Celestial-event pages are not hosted schema.org `Event` entities merely because they have dates; collection pages are not `Article` merely because they sit under editorial paths.
- Keep historical reports out of routine context.
- When editorial strategy changes materially, sync the canonical OS guide, relevant Claude skills, and owner CMS guidance.
