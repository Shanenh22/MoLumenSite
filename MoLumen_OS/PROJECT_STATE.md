# MoLumen Project State

Last reviewed: 2026-08-08

Read this only when a task depends on current cross-session status. Code/config remains authoritative for implementation facts.

## Current platform
- Astro 5 static site with shared layouts/components and content collections.
- Reading funnel includes the readings index, seven paid reading detail pages, Reading Finder, and service-aware booking handoff.
- Pages CMS is the normal interface for supported routine content editing.
- Current Sky, blog, videos, FAQs, glossary, legal content, and astrology learning content are established.
- Current Sky coverage currently extends through December 2027; the durable policy is a rolling future horizon, not a fixed endpoint.
- Birth Time guide/toolkit, worksheet PDF generation, sky calendar, Birth Time Confidence, and rising-sign preference are implemented.
- Newsletter, analytics, booking, and video integrations are wired through current code/config; repository prose is not the source of truth for vendor identifiers.
- The repository has native build/content/link/interactive/accessibility/performance validation.

## Architecture truths that change infrequently
- `src/config/site.ts` — public integration configuration and public site defaults.
- `src/content.config.ts` — Astro content schemas.
- `.pages.yml` — Pages CMS editing surface.
- `src/config/images.ts` — default static-page image registry.
- `src/content/services/*.json` — service data.
- `src/content/sky-events/*.md` — Current Sky event data.
- Browser tests use the shared manifest-backed dist server in `scripts/lib/dist-server.mjs`.

## Current environment/release posture
- Staging and future production Cloudflare Workers are separate.
- Staging is intentionally protected from indexing.
- `molumen.com` production attachment/cutover remains owner-gated.
- Repository checks are the evidence source for code readiness; external account verification cannot be inferred from code.

## Unresolved external/owner dependencies
- Verify real newsletter subscription/delivery behavior in the provider account.
- Verify GA4 consent/event reception with real traffic.
- Verify production booking/payment/confirmation behavior after approved account configuration.
- Complete owner/legal/accessibility reviews listed in `BACKLOG.md` before production cutover.
- Supply/approve real production video/testimonial/credential facts before publishing claims that depend on them.

## Durable traps worth remembering
- Re-verify old audit findings before acting on them.
- Never copy volatile integration IDs into prose; read live config.
- A stale local server can produce false browser failures; validate through repository-owned server/test paths.
- Lazy third-party embeds require mobile and fallback-path testing, not iframe-presence checks alone.
- Consent-aware analytics must synchronize consent before events fire.
- Generate derived PDFs from authoritative source content instead of hand-maintaining copies.
- Keep historical reports and handoffs out of routine context.
- If documentation claims something is CMS-editable, confirm the collection/config actually exists.
