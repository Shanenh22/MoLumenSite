# Mo Lumen Astrology — Website

Complete rebuild of [molumen.com](https://molumen.com/): a static, fast, accessible Astro site deployed on Cloudflare Pages, replacing the current Squarespace site once staging is approved by the owner.

## Status

**Phase 1 (research) and Phase 2 (architecture) complete. Phase 3 (build) starting.**
The live molumen.com is untouched; nothing deploys to the production domain without owner approval.

## Project map

| Path | Purpose |
|---|---|
| `docs/research/` | Content inventory, voice analysis, competitor review, SEO map, source log, service inventory, redirect map, risk log |
| `docs/plan/` | Architecture (sitemap, nav, content models, components, tokens, flows, image plan) and **open-questions.md — owner action items** |
| `docs/integrations/` | Cal.com + Stripe, GA4 (MailerLite added in Phase 3) |
| `src/config/` | Site facts, navigation, integrations — the owner-editable configuration layer |
| `src/content/` | Content collections: services, articles, sky events, videos, glossary, testimonials, FAQs, legal |
| `src/styles/tokens.css` | Design tokens (single source of truth) |

## Commands

```
npm install        # once
npm run dev        # local dev server
npm run build      # production build → dist/
npm run check      # TypeScript + Astro diagnostics
npm run format     # Prettier
```

## Environment

Copy `.env.example` to `.env`. Every variable is optional and documented in the file; the site runs with none set. No secrets ever belong in this repository — Stripe is connected inside Cal.com, not here.

## Ground rules (from the project brief)

No invented services, prices, testimonials, credentials, or policies. Unconfirmed facts carry visible owner-review flags. Birth data never touches this repo, analytics, storage, or URLs. WCAG 2.2 AA and Core Web Vitals targets are requirements, not aspirations.
