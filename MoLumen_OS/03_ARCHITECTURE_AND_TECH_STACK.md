# Architecture and Tech Stack

## Core
- Astro
- static-first build
- Cloudflare
- content collections
- centralized config
- reusable components
- structured metadata/schema

## Services
Cal.com handles booking.
Stripe handles payment through booking.
Kit handles newsletter.
GA4 handles analytics.
YouTube hosts video.
GBP provides external/local corroboration.

## Rules
- secrets never enter public source
- public IDs may be centralized
- third-party scripts should be deferred/lazy when practical
- avoid duplicate script injection
- preserve CSP compatibility
- add regression tests for important integrations

## Performance
Protect low CLS, low blocking time, strong LCP, responsive imagery and minimal client JavaScript.
