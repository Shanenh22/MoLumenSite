# MoLumen Project State

Last reviewed: 2026-08-08

Read this only when a task depends on current cross-session status. Code/config remains authoritative for implementation facts.

## Current platform
- Astro 5 static site with shared layouts/components and content collections.
- Reading funnel includes the readings index, seven paid reading detail pages, Reading Finder, and service-aware booking handoff.
- `src/config/booking.ts` is the funnel source of truth for canonical reading order, the bare `/book/` default (`natal-90`), eligibility labels, and booking actions. Multi-option services expose their real priced options instead of silently choosing one.
- Reading discovery separates first-time choices from established-client follow-ups; the primary navigation is Readings / Explore Astrology / Current Sky / From Mo plus the persistent Book a Reading CTA.
- Booking analytics now closes the site-side funnel with privacy-safe `booking_complete` handling through `mlTrack`; Reading Finder step progression is measured without sending answers or birth data.
- Educational/shared CTA bands provide a lower-commitment Reading Finder path, Current Sky routes unknown visitors to the Finder, and the Finder offers the existing newsletter only to visitors who say they are still exploring.
- Approved testimonials are surfaced on matching service pages only; scoped service FAQs exist where verified pre-booking questions are known.
- Homepage and About welcome-video slots are wired but render only when a real configured video ID exists.
- Pages CMS is the normal interface for supported routine content editing.
- Current Sky, blog, videos, FAQs, glossary, legal content, and astrology learning content are established.
- Current Sky coverage currently extends through December 2027; the durable policy is a rolling future horizon, not a fixed endpoint.
- Birth Time guide/toolkit, worksheet PDF generation, sky calendar, Birth Time Confidence, and rising-sign preference are implemented.
- Newsletter, analytics, booking, and video integrations are wired through current code/config; repository prose is not the source of truth for vendor identifiers.
- The repository has native build/content/link/interactive/accessibility/performance validation.

## Architecture truths that change infrequently
- `src/config/site.ts` — public integration configuration and public site defaults.
- `src/config/booking.ts` — booking/default/order/action vocabulary for the reading funnel.
- `src/content.config.ts` — Astro content schemas.
- `.pages.yml` — Pages CMS editing surface.
- `src/config/images.ts` — default static-page image registry.
- `src/content/services/*.json` — service data.
- `src/content/sky-events/*.md` — Current Sky event data.
- Browser tests use the shared manifest-backed dist server in `scripts/lib/dist-server.mjs`.

## Current environment/release posture
- Staging and future production Cloudflare Workers are separate.
- Staging is intentionally protected from indexing.
- `molumen.com` production attachment/cutover remains owner-gated.
- Repository checks are the evidence source for code readiness; external account verification cannot be inferred from code.

## Unresolved external/owner dependencies
- Complete the Cal.com account changes documented in `docs/calcom-setup-for-mo.md`: replace the current custom attendee location with Zoom + attendee phone choices, add service-appropriate booking/intake questions, and correct the Quick Check-In description.
- After those Cal.com changes, complete one end-to-end test of booking, payment, confirmation, location selection, and intake behavior.
- Verify real newsletter subscription/delivery behavior in the provider account.
- Verify GA4 consent/event reception, including `booking_complete`, with real/test traffic once the deployed flow is exercised.
- Complete owner/legal/accessibility reviews listed in `BACKLOG.md` before production cutover.
- Supply the real welcome-video ID/poster when the video is ready; the homepage/About slots already exist.
- Supply additional permissioned testimonials only when real client material is available.

## Durable traps worth remembering
- Re-verify old audit findings before acting on them.
- Never copy volatile integration IDs into prose; read live config.
- Build booking links through `src/config/booking.ts`; do not hand-write service/event mappings at individual call sites.
- A stale local server can produce false browser failures; validate through repository-owned server/test paths.
- Lazy third-party embeds require mobile and fallback-path testing, not iframe-presence checks alone.
- Consent-aware analytics must synchronize consent before events fire.
- Generate derived PDFs from authoritative source content instead of hand-maintaining copies.
- Keep historical reports and handoffs out of routine context.
- If documentation claims something is CMS-editable, confirm the collection/config actually exists.
