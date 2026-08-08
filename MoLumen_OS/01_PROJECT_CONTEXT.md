# Project Context

## Brand
Mo Lumen Astrology.

## Platform
Astro static-first site deployed through Cloudflare.

## Business priority
Primary: qualified paid reading bookings.
Secondary: newsletter growth, trust, search authority, durable educational content, video publishing, and preparation for future reports/memberships/courses/products.

## Current services
- Cal.com — booking
- Stripe — booking payment
- Kit — newsletter/email
- GA4 — analytics
- YouTube — video
- Google Business Profile — external/local corroboration
- Search Console / Bing Webmaster — search verification
- Pages CMS — routine content editing
- Cloudflare — hosting/deployment

## Source-of-truth rule
Do not store volatile integration IDs, embed snippets, verification status, or deployment values in this context file.

Use:
- `src/config/site.ts` for current public integration configuration
- `docs/integrations/` for service-specific implementation notes
- `MoLumen_OS/PROJECT_MEMORY.md` for current cross-session status when needed
- `MoLumen_OS/DECISIONS.md` for historical rationale
- `MoLumen_OS/BACKLOG.md` for unresolved priorities

## Operating principle
Verify current code/state before acting on an old audit, prompt, handoff, or backlog item. Completed work should not be repeated unless evidence shows a regression.
