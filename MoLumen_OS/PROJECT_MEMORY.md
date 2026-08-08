# Project Memory

## Current known state
- GA4 is live and verified in-browser: measurement ID `G-64N9EPKNTR`, defaulted in `src/config/site.ts` because the deploy workflow passes no env and a missing value fails silently.
- Consent Mode v2 is in place with a first-party banner. Nothing is stored until a visitor agrees; a refusal still yields cookieless page counts.
- `window.mlTrack` is the only analytics entry point. It sanitises anything resembling an email, date or time. Never call `gtag` directly from a component.
- Current Sky is published through 2027-12-27 (507 days of horizon). `test:content` fails under 90 days and warns under 365.
- GA4 account created.
- GBP created; verification pending.
- Stripe registered for booking.
- Cal.com practising name changed to Mo Lumen.
- Kit is the newsletter platform and the repository now uses the owner-supplied Kit embed instead of MailerLite.
- YouTube channel: https://www.youtube.com/@MoLumenAstrology
- 60-second welcome video planned.
- Pages CMS connected to the repository and configured through root `.pages.yml`.
- Pages CMS is the primary routine publishing interface for Mo.
- CMS-editable areas include Blog, Current Sky, Videos, existing Readings/services, existing reference-library pages, FAQs, Glossary and Testimonials.
- Blog, Current Sky and Videos have draft-safe publishing behavior.
- Pages CMS includes a one-click repository quality-check action with MoLumen content-integrity validation.
- Pull requests have automated build/type/content/link/booking/Reading Finder validation.
- Dependabot and CodeQL repository security monitoring are configured.
- A scheduled repository-health workflow checks the staging site and key external integration endpoints.
- Cloudflare deploys use an explicitly pinned Wrangler release.
- Claude Code now has dedicated `molumen-integrations` and `molumen-release-manager` skills in addition to Developer, Editor, Strategist and Publisher.

## Current phase
YouTube facade/video hub and welcome-video slot, Birth Time Toolkit, and the
remaining audit fixes (CSP report-only, hero/LCP preload, WCAG 2.2 target size,
testimonial surfacing, courses/guides de-emphasis, per-service FAQs).

GA4/event instrumentation, booking conversion and the 2027 Current Sky window
are done — see the 2026-08-07 changelog entry.

## Two traps worth not rediscovering
- **CRLF and `.`** — in JavaScript `.` excludes line terminators including `\r`,
  so `(.*)$` never matches a line on a CRLF checkout. This silently broke the
  whole content-integrity validator on Windows while CI passed. Normalise line
  endings before parsing anything.
- **Inline scripts are template literals.** `set:html={` … `}` cannot contain a
  backtick anywhere, including inside a comment — one closes the string and the
  rest parses as code. And `<script is:inline>{` … `}</script>` emits the braces
  and backticks literally, producing a script that is valid JavaScript and does
  nothing. Both failed silently; verify inline-script behaviour in a browser,
  never by confirming the markup shipped.

## Publishing guardrail
Keep `.pages.yml`, Astro content schemas and the Pages CMS-facing file structure synchronized whenever content architecture changes.

Homepage/About structural copy remains developer/Claude-assisted for now because it is tightly coupled to conversion layout, credentials and other verified business claims. Revisit only if frequent owner editing justifies extracting selected fields.

## Deferred by owner
- Do not change staging indexing/noindex behavior yet. Revisit before production cutover.

## End-of-session update
Record:
- date
- completed
- verified
- pending external actions
- blockers
- next highest-value task
