# AI Project Changelog

### 2026-08-07 — Analytics, consent, booking conversion and the 2027 sky window

**Changed**

- GA4 measurement ID configured (`G-64N9EPKNTR`, defaulted in `src/config/site.ts`). Analytics had never run: the ID was empty, the gtag block sits behind an `ga4Id &&` guard, and the deploy workflow passes no env — so 130 pages shipped with no measurement while every check stayed green.
- Google Consent Mode v2 with a first-party consent banner. Everything denied by default; no cookie is written until a visitor agrees. Reopenable from the footer on every page.
- Removed `anonymize_ip` (a Universal Analytics parameter, inert in GA4) and replaced it with `allow_google_signals: false` and `allow_ad_personalization_signals: false`, which take effect.
- `window.mlTrack` is now the single analytics entry point, with a sanitiser that drops anything resembling an email, date or time before it can reach GA. All call sites migrated; the Reading Finder's four events fire for the first time.
- `booking_cta_click` added as one delegated listener rather than per-page wiring.
- Mobile header exposes a Book action at every width (was `display: none` below 479px). Label shortens to "Book"; `aria-label` keeps the full accessible name.
- `/readings/` cards, compare cards and table rows deep-link to `/book/?service=<bookingEventId>`; cards now show price.
- `/book/` collapses the returning-clients group on phones. Availability moved from 2,368px to 1,503px. Deep links into that group open it.
- Published 40 researched 2027 Current Sky events. Horizon 139 → 507 days.
- Current Sky horizon validation added to `content-integrity.mjs`: fails under 90 days, warns under 365.
- `/horoscopes/` split into "Coming up" and "Recent lunation letters", both filtered on today. It previously headed six future lunations as "recent".
- Sky-event page titles now carry month and year, resolving ten duplicate titles caused by annually repeating event names.
- `Service` schema gained `url`; `Offer` gained the deep-linked booking URL; multi-price readings emit `AggregateOffer` instead of a single price contradicting the visible page.
- `privacy.md` named MailerLite as the newsletter processor. Corrected to Kit, with Google Analytics added and the analytics/cookie sections rewritten to describe what the site actually does.
- Fixed stale copy: an owner note rendering in `<main>` on `/readings/gift/`, third-person voice on the same page, and "Three questions" on `/resources/` and `/readings/` for a five-question finder.

**Fixed**

- `scripts/content-integrity.mjs` reported 45 false errors on any CRLF checkout. In JavaScript `.` excludes line terminators and `\r` is one, so no frontmatter line parsed and `frontmatter()` returned `{}` for every file — which also silently disabled the draft skip. CI on Linux passed the same commit. This repo sets `core.autocrlf=true`, so it affected every Windows working copy including the owner's.
- `scripts/check-hero-contrast.mjs`: three defects. No exclusion for fixed bottom overlays (the consent banner produced ten false failures at 1.00–1.15:1); `.seabreak--quote` mislabelled as "hero"; and its `.seabreak__line` text missing from the sampled selector, so the site's one sea break had never been measured. It reads 7.94:1 desktop / 6.19:1 mobile. An unmeasurable block now fails instead of printing a note inside a run that ends "Every hero passes".

**Validated**

- Astro check 0 errors. Build 170 pages.
- Content integrity 0 errors, 0 warnings. Horizon 507 days.
- Internal links 170 files, 0 failures.
- axe 0 violations across 20 pages × 2 viewports.
- `check:contrast` 8/8. `check:hero-contrast` 129 pages discovered, 0 failures.
- Booking 18/18. Reading Finder 11/11.
- `audit.mjs` clean on 12 checks: 0 duplicate titles or descriptions, 0 thin, 0 orphans, 0 missing alt, 0 heading skips.
- Consent verified in-browser: pre-consent zero cookies and `gcs=G100`; post-accept `_ga` written and consent update pushed; decline stores the choice and writes nothing.
- Kit verified in-browser: one script tag across two hosts on a page, second host falls back to `/newsletter/`, no console errors, no failed requests.

**Deferred**

- Staging noindex / search-engine protection — deferred by owner. Not implemented.

**Not completed this pass**

- YouTube facade component, `/videos/` hub rebuild and welcome-video slot.
- Birth Time Toolkit lead magnet.
- CSP report-only, hero/LCP preload, WCAG 2.2 target-size sweep, testimonial surfacing, courses/guides de-emphasis, per-service FAQ architecture.



### 2026-08-07 — Repository hardening v3

**Changed**
- Replaced remaining MailerLite repository integration/configuration with the owner-supplied Kit embed.
- Added the official MoLumen YouTube channel to centralized site configuration.
- Added `scripts/content-integrity.mjs` and wired it into Pages CMS, PR validation and deploy validation.
- Added pull-request CI for Astro/type checks, content integrity, build, links, booking handoff and Reading Finder handoff; formatting is currently advisory because legacy files are not normalized.
- Added weekly Dependabot monitoring for npm and GitHub Actions.
- Added CodeQL JavaScript/TypeScript scanning.
- Added scheduled staging and external-integration health checks.
- Pinned the deployment workflow to an explicit Wrangler release and refreshed the Workers compatibility date/config schema.
- Added `molumen-integrations` and `molumen-release-manager` Claude Code skills.
- Updated project memory, decisions and backlog to reflect the new operating model.

**Validated**
- Astro/type check passed on the hardening PR.
- MoLumen content-integrity check passed with 0 errors and 0 warnings.
- Production build generated 130 pages successfully.
- CodeQL passed on the prior hardening revision; final PR checks rerun after the latest documentation updates.

**External actions still needed**
- Submit a real test newsletter address through Kit to verify account-side signup/confirmation/delivery behavior.
- Review/resolve dependency advisories through normal Dependabot updates rather than force-upgrading blindly.
- Staging noindex/search protection is intentionally deferred by owner request.

---

### 2026-08-07 — Pages CMS publishing layer

**Changed**
- Added repository-root `.pages.yml` for Mo-friendly content editing.
- Added grouped CMS editors for Blog, Current Sky, Videos, existing Readings/services, existing reference pages, FAQs, Glossary and Testimonials.
- Added Pages CMS media sources for content images and PDF downloads.
- Added draft-safe publishing for Current Sky and Videos; Blog already supported drafts.
- Updated homepage, Current Sky routes/archive and Videos page so drafts are excluded from generated public pages.
- Added a Pages CMS `Run site quality check` action backed by `.github/workflows/pages-cms-quality.yml`.
- Replaced raw-GitHub editing instructions with Pages CMS as the normal workflow.
- Added `docs/pages-cms-for-mo.md` as Mo's operating guide.
- Updated the MoLumen OS, Publisher skill and root `CLAUDE.md` so future schema changes preserve Pages CMS compatibility.

**Guardrails**
- `settings.content.merge: true` preserves technical fields hidden from the CMS.
- Service/reference create, rename and delete actions are restricted.
- Booking integration fields, legal content, analytics, schema architecture and credentials remain protected from routine CMS editing.
- Homepage/About structural copy remains code-managed for now to avoid exposing tightly coupled conversion/trust logic.

**Validation**
- Pages CMS configuration follows the current `.pages.yml` configuration model.
- Repository quality action runs Astro/type/content checks, production build and internal-link checks.

**External actions still needed**
- Mo should refresh/open the connected repository in Pages CMS and verify the new menus render as expected.

---

## Future session format

### YYYY-MM-DD — Session title

**Changed**
- ...

**Validated**
- ...

**External actions still needed**
- ...
