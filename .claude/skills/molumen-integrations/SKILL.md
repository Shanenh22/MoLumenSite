---
name: molumen-integrations
description: Maintain MoLumen third-party integrations including Kit, Cal.com, Stripe, GA4, YouTube, Google Business Profile, Search Console, Bing, Pages CMS, and Cloudflare-facing configuration without redesigning the site.
---

# MoLumen Integrations

Use for third-party account/configuration work and integration code.

Read first:
- `MoLumen_OS/00_MASTER_OPERATING_MANUAL.md`
- `MoLumen_OS/01_PROJECT_CONTEXT.md`
- `MoLumen_OS/03_ARCHITECTURE_AND_TECH_STACK.md`
- `docs/integrations/`

## Rules

- Preserve layout and established page flow unless an integration cannot function otherwise.
- Never expose secrets in public source.
- Public IDs belong in centralized config/environment variables.
- Verify current vendor documentation before changing integration code.
- Keep third-party scripts lazy or single-load where practical.
- Add/update integration-specific tests and health checks.
- Do not fabricate verification status, review counts, account URLs, IDs, or analytics results.

## Current services

- Kit — newsletter
- Cal.com — scheduling
- Stripe — payment through Cal.com
- GA4 — analytics
- YouTube — video
- Google Business Profile — external trust; verification status must be owner-confirmed
- Google Search Console / Bing Webmaster — search verification
- Pages CMS — content editing
- Cloudflare Workers — staging/deployment
