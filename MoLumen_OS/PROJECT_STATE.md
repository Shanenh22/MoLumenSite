# MoLumen Project State

Last reviewed: 2026-08-08

Read this only when a task depends on current cross-session status. Code/config remains authoritative for implementation facts.

## Current platform
- Astro 5 static site with shared layouts/components and content collections.
- Reading funnel includes seven paid reading pages, Reading Finder, and service-aware booking handoff.
- `src/config/booking.ts` owns reading order, bare `/book/` default (`natal-90`), eligibility labels, and every booking link. Multi-option readings expose their real priced choices; a closing CTA never picks between options that differ by an eligibility condition. `check:booking-links` fails on any hand-written `/book/?service=`.
- Reading discovery separates first-time choices from established-client follow-ups. Primary nav is Readings / Explore Astrology / Current Sky / From Mo plus Book a Reading.
- `booking_complete` and Reading Finder step events use `mlTrack` without sending answers or birth data.
- Shared content closers offer the Reading Finder; Current Sky routes unknown visitors there; still-exploring Finder users also see the existing newsletter.
- Matching approved testimonials and verified service-scoped FAQs appear where available.
- Homepage/About welcome-video slots render only when a real video ID is configured.
- Pages CMS is the normal interface for supported routine content editing.
- Current Sky coverage extends through December 2027; maintain a rolling future horizon.
- Birth Time guide/toolkit, worksheet PDF, sky calendar, Birth Time Confidence, and rising-sign preference are implemented.
- Repository validation covers build, content, links, booking-link integrity, interactive flows, analytics privacy, accessibility, and performance. All browser suites serve `dist/` through `scripts/lib/dist-server.mjs`.

## Architecture truths
- `src/config/site.ts` — public integration configuration.
- `src/config/booking.ts` — reading-funnel booking/order/action vocabulary.
- `src/content.config.ts` — Astro content schemas.
- `.pages.yml` — Pages CMS surface.
- `src/config/images.ts` — static-page image registry.
- `src/content/services/*.json` — service data.
- `src/content/sky-events/*.md` — Current Sky data.
- Browser tests use `scripts/lib/dist-server.mjs`.

## Environment/release posture
- Staging builds without `PUBLIC_SITE_URL`, so its canonicals/sitemap point at molumen.com — the deliberate mechanism in `docs/deployment.md` for keeping the workers.dev URL from being treated as the real site. There is no `noindex` or robots `Disallow` on staging; do not add one without revisiting that decision.
- `molumen.com` attachment/cutover remains owner-gated.
- Repository checks prove code readiness; external-account state must be verified separately.

## Unresolved owner/external work
- Complete Cal.com changes in `docs/calcom-setup-for-mo.md`: Zoom + attendee phone locations, service-appropriate intake questions, and corrected Quick Check-In description.
- Afterward run one end-to-end booking/payment/confirmation/intake test.
- Verify newsletter subscription/delivery and GA4 reception of consent/events including `booking_complete`.
- Complete owner/legal/accessibility reviews in `BACKLOG.md`.
- Supply the real welcome-video ID/poster when ready and additional permissioned testimonials when available.

## Durable traps
- Re-verify old audit findings before acting.
- Read live config for volatile integration IDs.
- Build booking links through `src/config/booking.ts`; do not hand-write service/event mappings. A reading whose options differ by eligibility rather than preference must not have one chosen for the visitor.
- A green suite can still be blind: assert the untouched default state, and confirm a new check fails on an injected violation before trusting it.
- Validate browser behavior through repository-owned test/server paths; stale local servers can mislead.
- Lazy third-party embeds require mobile and fallback testing.
- Consent-aware analytics must synchronize consent before events fire.
- Keep historical reports/handoffs out of routine context and confirm CMS claims against live collection/config state.
