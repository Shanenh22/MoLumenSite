# MoLumen Project State

Last reviewed: 2026-08-09

Read this only when a task depends on current cross-session status. Code/config remains authoritative for implementation facts.

## Current platform
- Astro 5 static site with shared layouts/components and content collections.
- Public brand: **Mo Lumen Astrology**. Confirmed legal name: **Mo Lumen Astrological Services**.
- Reading funnel includes seven paid reading pages, Reading Finder, and service-aware booking handoff.
- `src/config/booking.ts` owns reading order, bare `/book/` default (`natal-90`), eligibility labels, and every booking link. Multi-option readings expose their real priced choices; a closing CTA never picks between options that differ by an eligibility condition. `check:booking-links` fails on any hand-written `/book/?service=`.
- Reading discovery separates first-time choices from established-client follow-ups. Primary nav is Readings / Explore Astrology / Current Sky / From Mo plus Book a Reading. Current Sky is a dropdown with Current Sky, Horoscopes, Sky Calendar, The Sky in 2026, and Archive.
- `booking_complete` and Reading Finder step events use `mlTrack` without sending answers or birth data.
- Shared CTA behavior is intent-aware rather than Book-first across educational, Current Sky, credibility, and service paths.
- Matching approved testimonials and verified service-scoped FAQs appear where available.
- Homepage/About welcome-video slots render only when a real video ID is configured.
- Pages CMS is the normal interface for supported routine content editing. The Explore reference library remains code-managed; its former empty CMS editor must not be reintroduced without a deliberate content migration.
- Current Sky coverage extends through December 2027; maintain a rolling future horizon.
- Birth Time guide/toolkit, worksheet PDF, sky calendar, Birth Time Confidence, and rising-sign preference are implemented.
- On mobile, the rising-sign picker uses one dropdown; selecting a sign shows that sign and choosing "Show all signs" restores the full set. Redundant explanatory UI copy and the separate Show All button were removed.
- Horoscope and Current Sky copy now distinguishes rising-sign house guidance from individualized interpretation. Rising sign tells the reader where to look; whole chart, timing, and lived circumstances determine what a pattern may mean personally.
- Newsletter positioning is now **a monthly note from Mo**. "The Sky This Month" is one recurring section, not the newsletter's full identity.
- Global Person/site schema and public copy avoid narrowly branding Mo as one school of astrologer. Her practice is broadly studied, technically grounded, synthesis-oriented, conversational, and agency-first.
- Repository validation covers build, content, links, booking-link integrity, interactive flows, analytics privacy, accessibility, and performance. All browser suites serve `dist/` through `scripts/lib/dist-server.mjs`.

## Editorial/product truths
- Core audience: thoughtful adults at meaningful crossroads who want deeper perspective without surrendering judgment or agency.
- Emotional product: clarity without surrendering agency. Mo gives another map; the client still drives.
- Practice model: a reading is a collaborative act of astrological synthesis. Technique, intuition, lived experience, and conversation inform one another. Intuition can suggest where to look; it does not end the inquiry.
- Voice: warm authority without mystique. Intelligent, grounded, candid, curious, technically informed in plain language, conversational, and agency-first.
- Wonder matters as much as credibility. Mo's natural-science background informs systems thinking, observation, curiosity, and respect for complexity; it does not prove astrology.
- Prefer practice/tool language over belief/faith framing. Do not use scientific-sounding resonance/frequency/causation claims as established fact.
- Free content teaches vocabulary, structure, context, limits, shared cycles, and general interpretation. It must not become a free automated personal astrologer.
- Content ecosystem: Explore teaches; Current Sky observes/interprets shared cycles; Horoscopes provide a broad rising-sign lens; Blog develops durable ideas; Newsletter builds an ongoing relationship; paid readings provide individualized synthesis.
- Preferred visitor journey: **Learn → deepen → observe Mo's thinking → understand the reading experience → identify the right reading → book.** Every substantial page should answer "what next?" according to its role rather than sending everyone directly to Book.

## Architecture truths
- `src/config/site.ts` — public integration configuration and brand/legal identity.
- `src/config/booking.ts` — reading-funnel booking/order/action vocabulary.
- `src/content.config.ts` — Astro content schemas.
- `.pages.yml` — Pages CMS surface.
- `src/config/images.ts` — static-page image registry.
- `src/content/services/*.json` — service data.
- `src/content/sky-events/*.md` — Current Sky data.
- `MoLumen_OS/02_BRAND_AND_EDITORIAL_GUIDE.md` — canonical Mo voice, framing, content ecosystem, page-role, and CTA guidance.
- `docs/pages-cms-for-mo.md` — owner-facing CMS workflow and current editorial guidance.
- Browser tests use `scripts/lib/dist-server.mjs`.

## Environment/release posture
- Staging builds without `PUBLIC_SITE_URL`, so its canonicals/sitemap point at molumen.com: the deliberate mechanism in `docs/deployment.md` for keeping the workers.dev URL from being treated as the real site. There is no `noindex` or robots `Disallow` on staging; do not add one without revisiting that decision.
- `molumen.com` attachment/cutover remains owner-gated.
- Repository checks prove code readiness; external-account state must be verified separately.

## Unresolved owner/external work
- Complete Cal.com changes in `docs/calcom-setup-for-mo.md`: Zoom + attendee phone locations, service-appropriate intake questions, and corrected Quick Check-In description.
- Afterward run one end-to-end booking/payment/confirmation/intake test.
- Verify newsletter subscription/delivery and GA4 reception of consent/events including `booking_complete`.
- Complete owner/legal/accessibility reviews in `BACKLOG.md`.
- Supply the real welcome-video ID/poster when ready and additional permissioned testimonials when available.
- A 2027 annual Current Sky overview page has not been created. Do not invent one simply because 2027 event entries exist; decide timing/content deliberately.

## Durable traps
- Re-verify old audit findings before acting.
- Read live config for volatile integration IDs.
- Build booking links through `src/config/booking.ts`; do not hand-write service/event mappings. A reading whose options differ by eligibility rather than preference must not have one chosen for the visitor.
- A green suite can still be blind: assert the untouched default state, and confirm a new check fails on an injected violation before trusting it.
- Validate browser behavior through repository-owned test/server paths; stale local servers can mislead.
- Lazy third-party embeds require mobile and fallback testing.
- Consent-aware analytics must synchronize consent before events fire.
- Keep historical reports/handoffs out of routine context and confirm CMS claims against live collection/config state.
- When public editorial strategy changes materially, update the canonical OS guide, relevant Claude skills, and owner-facing CMS guidance together so the system does not drift.
