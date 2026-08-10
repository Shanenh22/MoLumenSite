# QA and Launch

## Pre-launch
- agent/instruction integrity
- framework/type check
- content integrity
- production build
- internal-link crawl
- booking-link source-of-truth check
- booking handoff and completed-booking event path
- Reading Finder handoff
- Current Sky calendar/time-zone behavior
- Birth Time Confidence and rising-sign preference behavior
- analytics privacy/sanitization
- accessibility, including automated axe coverage plus required manual screen-reader review
- contrast and hero contrast
- responsive/mobile behavior and horizontal overflow
- Lighthouse/performance when a change plausibly affects it
- console/network behavior for relevant interactive/integration changes
- truthful metadata/schema and entity consistency
- redirects
- production canonical/indexability
- Kit subscription/delivery behavior
- GA4 consent/event reception
- video lazy loading/fallback
- end-to-end Cal.com/Stripe/intake/confirmation behavior

Do not claim a browser/visual test that was not actually performed. Code review, automated browser tests, staging workflow curl, and manual visual inspection are different evidence.

## Staging indexing posture
The current staging Worker is **not** protected by `noindex` or a robots `Disallow`. Staging builds intentionally emit canonicals/sitemap URLs for `molumen.com`, as documented in `docs/deployment.md`. Do not add a staging noindex rule casually; revisit the deployment/indexing decision first.

## Production
Do not attach/cut over `molumen.com` unless explicitly authorized.

Before cutover verify redirect map, environment/public configuration, sitemap/canonical, analytics consent/events, Kit, Cal.com/Stripe, owner/legal/accessibility gates, DNS, and rollback plan.

Repository checks establish code readiness only. Vendor/account configuration and real-world delivery/payment/analytics behavior must be verified separately.
