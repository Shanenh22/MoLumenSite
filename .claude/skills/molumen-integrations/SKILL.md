---
name: molumen-integrations
description: Maintain MoLumen third-party integration code/configuration for Kit, Cal.com, Stripe, GA4, YouTube, Search Console/Bing/GBP, Pages CMS, and Cloudflare-facing settings without redesigning the site.
---

# MoLumen Integrations

Use for third-party account/configuration work and integration code.

Start with the current implementation. `src/config/site.ts` is authoritative for public integration IDs; never copy volatile IDs from old prose. Read only the relevant file under `docs/integrations/` or canonical architecture guide when needed.

Rules:
- never expose secrets in public source
- verify current vendor documentation before changing vendor-specific behavior
- preserve layout/page flow unless integration function requires a change
- keep third-party scripts lazy or single-load where practical
- preserve consent/privacy behavior and CSP compatibility
- use `window.mlTrack`, not direct component `gtag` calls
- add/update integration-specific tests and health checks
- never fabricate verification status, review counts, account URLs, IDs, or analytics results

Do not perform production release/DNS work through this skill.
