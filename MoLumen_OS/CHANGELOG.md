# MoLumen Recent Changelog

This file contains only recent, human-useful project highlights. Git history is the complete implementation record. Older accumulated notes are preserved at `archive/CHANGELOG-through-2026-08-08.md` and are not current instructions.

## 2026-08-10 — editorial ecosystem and machine-readable cleanup
- Recentered public copy around Mo's practice: warm authority without mystique, collaborative astrological synthesis, wonder with complexity, and retained client agency.
- Reworked the learning journey so Explore teaches and deepens, Current Sky interprets shared cycles, Horoscopes stay a broad rising-sign lens, Blog develops durable ideas, Newsletter remains broader monthly correspondence, and personal questions move toward the Reading Finder rather than directly to checkout.
- Simplified mobile rising-sign controls and removed redundant visible state narration while preserving the all-sign view and preference behavior.
- Tightened Current Sky calendar/archive continuity, event-page rising-sign guidance, horoscope limits, and several page-specific next steps.
- Corrected celestial-event structured data so dated sky content is not falsely represented as a hosted `Event`.
- Tightened global schema classification so genuine editorial/reference pages may receive `Article`, while hubs, calendars, archives, glossaries, and reference indexes remain truthful `WebPage`/collection experiences.
- Updated `llms.txt` so answer engines see the one-astrologer practice, learning-library boundaries, collaborative method, Current Sky/horoscope limits, and machine-readable identity accurately.
- Aligned the Brand/Editorial guide, Claude editorial skills/rules, templates, and owner CMS guidance with the public-site strategy.

## 2026-08-08 — post-funnel code pass
- Stopped closing CTAs choosing between options that differ by eligibility rather than preference; Want More Clarity now offers "Review Booking Options" and returns the reader to its priced cards, in the Reading Finder as well as on the reading page.
- Routed every remaining booking link through `src/config/booking.ts`, including schema offer URLs, and added `check:booking-links` to `verify:core`.
- Restored the manifest-backed dist server in the two suites the funnel merge had reverted, and migrated the four that had never used it.
- Added `test:analytics`, which tests `mlTrack`'s sanitiser directly rather than assuming the call sites behave.
- Cleared all 34 type-check hints, removed the phantom `courses`/`guides` collections, and stopped in-page anchors landing under the sticky header.

## 2026-08-08 — conversion funnel repair
- Made the bare booking page deterministic (`natal-90`) and centralized reading order/booking actions in `src/config/booking.ts`.
- Removed multi-price CTA ambiguity by exposing the real Natal and Want More Clarity options and preserving service/event deep links.
- Added privacy-safe `booking_complete` measurement from Cal.com's `bookingSuccessfulV2` callback through `mlTrack`, plus Reading Finder step measurement.
- Reorganized reading discovery into first-time vs established-client paths and regrouped primary navigation under Readings / Explore Astrology / Current Sky / From Mo.
- Added Reading Finder paths to shared content closers, corrected Current Sky's next step, and added newsletter nurture only for Finder visitors who say they are still exploring.
- Added service-matched testimonial surfacing, scoped FAQ support/content, mobile consent-banner repair, and guarded homepage welcome-video placement.
- Expanded booking/finder/content/contrast regression coverage.
- Added Cal.com owner setup guidance for remaining account-side location, intake, and Quick Check-In description work.

## 2026-08-08 — agent context architecture
- Added a shared root agent contract and a small Claude router.
- Added path-scoped Claude rules, narrower skills, manual/forked release handling, and a read-only QA subagent.
- Removed copied skill resources and redirected skills to canonical sources.
- Reorganized the MoLumen OS around a compact state file, active-only backlog, topic decision index, and explicit history/archive areas.
- Added automated agent-document integrity checks to prevent common context regressions.

Keep this file short. Archive older entries rather than allowing it to become a second Git log.
