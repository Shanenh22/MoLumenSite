# MoLumen Project State

Last reviewed: 2026-08-14

Read for cross-session status only. Code/config is authoritative for implementation facts.

## Platform
- Astro 5 static site: **Mo Lumen Astrology**; legal name **Mo Lumen Astrological Services**.
- Seven readings, Reading Finder, and service-aware booking are implemented. `src/config/booking.ts` owns reading order, eligibility, actions, bare `/book/`, and event mappings.
- Pages CMS handles routine content; Explore remains code-managed. `src/content.config.ts` + `.pages.yml` are the live content/CMS contract.
- Current Sky public coverage extends through Dec. 2027. Owner-reviewed 2028 entries are staged as drafts and become publishable beginning July 1, 2027 through the centralized publication gate; a scheduled July 1 rebuild refreshes the static site. A 2028 draft without `ownerReview: true` remains private. No 2027 annual overview exists.
- Birth Time guide/toolkit/PDF, sky calendar, Birth Time Confidence, and rising-sign preference are implemented.
- Newsletter = **a monthly note from Mo**; “The Sky This Month” is one section. Welcome-video UI/schema requires real metadata.
- Courses, Guides, and Videos stay out of navigation while they lack a mature content job. Courses/Guides are noindexed; Videos is noindexed while empty.
- `/search/` is a secondary retrieval utility. Its build-generated index uses rendered indexable content; reference pages lead broad concept queries, Current Sky events show dates, and query text stays out of analytics.
- Sitemap filtering mirrors deliberate noindex routes, including browser Birth Time worksheets and empty Videos; Videos becomes eligible when published entries exist.
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
- Staging canonicals/sitemap intentionally point at molumen.com; the workers.dev review hostname is protected with a host-specific `X-Robots-Tag: noindex`. Read `docs/deployment.md` before changing indexing behavior.
- Production `molumen.com` cutover is owner-gated. Repo checks prove code readiness, not external-account readiness.
- Cal.com Zoom + attendee phone locations are live. Remaining: intake/label/description checks plus one full booking/payment/confirmation/intake test.
- Verify newsletter delivery and GA4 reception/consent events; complete owner/legal/accessibility items in `BACKLOG.md`.
- Add welcome-video metadata or more permissioned testimonials only when supplied.

## Durable traps
- Re-verify old audit findings; read live config for volatile facts.
- Never choose an eligibility-dependent booking option for a visitor.
- Keep birth data, free-text personal questions, rising-sign preference, and site-search queries out of analytics.
- Celestial-event pages are not hosted schema.org `Event` entities merely because they have dates; collection pages are not `Article` merely because they sit under editorial paths.
- Keep historical reports out of routine context.
- When editorial strategy changes materially, sync the canonical OS guide, relevant Claude skills, and owner CMS guidance.
