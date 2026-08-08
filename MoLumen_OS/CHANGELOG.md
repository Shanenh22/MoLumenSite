# MoLumen Recent Changelog

This file contains only recent, human-useful project highlights. Git history is the complete implementation record. Older accumulated notes are preserved at `archive/CHANGELOG-through-2026-08-08.md` and are not current instructions.

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
