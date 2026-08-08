# Backlog

## P0
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
- Testimonial surfacing
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
- Existing astrology reference-library editor
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
