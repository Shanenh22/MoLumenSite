# Backlog

## P0
- **Cal.com configuration — blocks production.** See `docs/calcom-owner-actions.md`. Meeting
  location says "Somewhere else" on all 9 event types while the site says Zoom · Phone; no
  event type has any intake question, so the intake form four surfaces promise does not
  exist; Quick Check-In carries the Monthly Transits description. All owner-side.
- Verify Kit subscription flow end-to-end with a real test address
- Verify GA4 deployment/events
- Verify Cal.com → Stripe booking path
- ~~Fix mobile booking CTA/path~~ DONE 2026-08-07 — header CTA visible at all widths, /readings/ deep-links, mobile booking order
- Complete QA suite
- Confirm production environment configuration

## Deferred by owner
- Protect staging from indexing — intentionally postponed for now; revisit before production cutover

## P1
- ~~Birth-time public resource + toolkit~~ DONE 2026-08-08 — /birth-time/ and /birth-time-toolkit/ shipped; Kit automation remains account-side
- Extract the /birth-time/ article body into a content collection so Mo can edit it in Pages CMS (worksheets stay code-managed: printable forms)
- ~~Build privacy-conscious YouTube facade and finish the video hub/welcome video slot~~ DONE 2026-08-07 — awaiting only Mo's video ID
- ~~Complete 2027 Current Sky through Dec 31, 2027~~ DONE 2026-08-07 — 40 events, horizon 507 days
- ~~Add 90-day Current Sky horizon validation~~ DONE 2026-08-07 — in content-integrity.mjs, fails <90d, warns <365d
- ~~Create Birth Time Toolkit~~ DONE 2026-08-07 — page, PDF and CTAs shipped; Kit automation is the remaining account-side step
- ~~Direct reading-to-booking actions~~ DONE 2026-08-07
- ~~Current Sky calendar view~~ DONE 2026-08-08 — `/current-sky/calendar/`, 36 assertions incl. two forced time zones
- ~~Birth Time Confidence check~~ DONE 2026-08-08 — on `/birth-time-toolkit/`, returns the toolkit's own five labels
- ~~Rising-sign display preference~~ DONE 2026-08-08 — `ml-rising-v1`, plus a real rising-sign module on `/horoscopes/`
- ~~Shane to approve the `privacy.md` storage paragraph~~ DONE 2026-08-08 — approved with the wording tightened to state explicitly that the preference is not birth data and not an identifier
- ~~Fix the broken `src/content/explore/` declaration~~ DONE 2026-08-08 — collection and CMS block removed; they pointed at a directory that never existed
- ~~Drop the unrunnable `test:a11y`~~ DONE 2026-08-08 — `pa11y-ci` was never a dependency; `audit:a11y` (axe) is the gate
- **Migrate the `/explore/` reference library into a content collection** so Mo can edit it in Pages CMS. This is the real version of the editor that was configured but never built. 25 hand-written `.astro` pages carrying `Layers` and `FurtherReading` components, per-page structured data, `oceanFor()` hero assignment and hand-placed inline links that must stay in step with the prose — so it needs its own verification pass (build, links, hero contrast, axe) rather than a bulk conversion. Restore the `.pages.yml` block in the same change that creates the content, never before.
- ~~Testimonial surfacing~~ DONE 2026-08-08 — one matched quote per reading page, strict
  `service` match, no fallback. Four readings still have no testimonial because none exists:
  relationship, quick-check-in, want-more-clarity, monthly-transits. Relationship is the
  notable gap — $275 and open to new clients.
- ~~Unique service FAQ architecture/content~~ PARTIAL 2026-08-08 — six scoped FAQs added
  (natal ×2, relationship ×3, want-more-clarity ×1). The four established-only readings
  still show globals only; add scoped ones there when a real pre-booking question is known.
- ~~Touch targets~~ DONE 2026-08-07 — 36 fixed, automated check added to axe-sweep
- Hero/LCP — preload measured and reverted (no improvement); next try viewport-based hero background variants. Homepage mobile LCP ~3.0s vs 1.7-2.3s elsewhere
- ~~CSP report-only~~ DONE 2026-08-07 — watch reports for a week, then enforce
- Search Console/Bing verification when tokens are available

## P2
- Unique service FAQ architecture/content
- Reduce inline style debt opportunistically
- Expand CMS only when a real recurring editorial need appears
- Consider extracting selected homepage/About copy into structured CMS files after launch if Mo needs frequent edits
- Normalize legacy Prettier formatting so formatting can become a blocking CI check
- Review npm audit findings through normal dependency updates; do not apply breaking `--force` upgrades blindly

## Completed publishing and repository foundation
- Pages CMS repository configuration
- Friendly Blog / Current Sky / Video editors
- Existing Readings/services editor with protected technical fields
- ~~Existing astrology reference-library editor~~ **This was never real.** The collection and CMS block were configured against a directory that never existed; removed 2026-08-08. See the P1 migration item above.
- FAQ / Glossary / Testimonial editors
- Content image and PDF media locations
- Draft safety for Blog, Current Sky and Videos
- Pages CMS one-click quality-check workflow
- Mo-friendly publishing guide
- Claude Publisher/OS updated to treat Pages CMS as primary routine publishing interface
- Kit integration replaces obsolete MailerLite implementation/docs
- Official YouTube channel centralized in site configuration
- PR validation workflow
- Dependabot npm/GitHub Actions monitoring
- CodeQL JavaScript/TypeScript scanning
- MoLumen content-integrity validator
- Scheduled repository/staging/integration health checks
- Explicit Wrangler release pin in deployment workflow
- Claude integrations and release-manager skills
