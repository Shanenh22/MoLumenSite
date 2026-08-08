---
paths:
  - ".env.example"
  - "src/config/site.ts"
  - "src/components/BookingEmbed.astro"
  - "src/components/ConsentBanner.astro"
  - "src/components/NewsletterForm.astro"
  - "src/components/YouTubeFacade.astro"
  - "docs/integrations/**/*"
---

# Integrations

- `src/config/site.ts` is the repository source of truth for current public integration identifiers; do not copy volatile IDs into general instruction files.
- Never expose secrets. Public IDs may be centralized in configuration when intentionally shipped to browsers.
- Verify current vendor documentation before changing vendor-specific behavior.
- Preserve Cal.com/Stripe booking, Kit newsletter, GA4 consent/analytics, and privacy-conscious YouTube behavior.
- `window.mlTrack` is the analytics entry point; components must not call `gtag` directly.
- Do not send email addresses, birth dates/times, rising signs, or other sensitive/personal values to analytics.
- Keep third-party scripts lazy or single-load where practical and preserve CSP compatibility.
- Add or update targeted tests/health checks when integration behavior changes.
