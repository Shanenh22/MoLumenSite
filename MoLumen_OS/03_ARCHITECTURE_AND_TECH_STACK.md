# Architecture and Tech Stack

## Core
- Astro 5, static-first build
- reusable layouts/components and centralized config
- Astro content collections for content-backed families
- Pages CMS for supported routine owner editing
- Cloudflare Worker deployment through the repository GitHub Actions/Wrangler workflow
- structured metadata/schema generated from truthful page/content data

## Sources of truth
- `src/config/site.ts` — brand/legal identity and public integration configuration
- `src/config/booking.ts` — reading order, eligibility, booking actions, Cal.com event mapping
- `src/content.config.ts` — content schemas
- `.pages.yml` — Pages CMS surface
- `src/config/images.ts` — static-page image registry

## Services
Cal.com handles booking and Stripe payment through booking.
Kit handles newsletter forms/delivery.
GA4 handles consent-aware analytics.
YouTube hosts video behind privacy-conscious click-to-load facades.
GBP/Search Console/Bing provide external/local/search corroboration and discovery where configured.

## Rules
- secrets never enter public source
- public IDs may be centralized when they are intentionally public
- third-party scripts should be deferred/lazy when practical
- avoid duplicate script injection
- preserve CSP compatibility
- route analytics through `mlTrack`; do not send birth data, personal free text, or rising-sign preference
- add regression tests for important integrations and interactive behavior
- schema must describe the actual page/entity; do not manufacture machine-readable facts
- runtime code/config outranks stale prose when they conflict

## Performance
Protect low CLS, low blocking time, strong LCP, responsive imagery, and minimal client JavaScript.

Do not make speculative performance changes merely because a generic best practice suggests them. Measure first when the repository already contains evidence that an optimization (for example, a preload) may worsen the actual page.
