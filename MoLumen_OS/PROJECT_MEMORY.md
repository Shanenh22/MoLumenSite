# Project Memory

## Current known state
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
GA4/event instrumentation, booking conversion refinements, YouTube facade/video hub, 2027 Current Sky, Birth Time Toolkit, remaining audit fixes and launch readiness.

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
