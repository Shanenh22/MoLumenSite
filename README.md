# Mo Lumen Astrology — Website

Complete rebuild of [molumen.com](https://molumen.com/): a static, fast, accessible Astro site deployed on Cloudflare Workers (static assets via `wrangler.jsonc`), replacing the current Squarespace site once staging is approved by the owner.

## Status

The Astro site is built, audited, and deployed to staging at https://molumen.shanenh.workers.dev/.
The live molumen.com is untouched; nothing deploys to the production domain without owner approval.

## Project map

| Path                    | Purpose                                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `docs/research/`        | Content inventory, voice analysis, competitor review, SEO map, source log, service inventory, redirect map, risk log              |
| `docs/plan/`            | Architecture (sitemap, nav, content models, components, tokens, flows, image plan) and **open-questions.md — owner action items** |
| `docs/integrations/`    | Cal.com + Stripe, GA4, Kit, and other third-party integration notes                                                               |
| `src/config/`           | Site facts, navigation, integrations — the owner-editable configuration layer                                                     |
| `src/content/`          | Content collections: services, blog, sky events, explore, videos, glossary, testimonials, FAQs, courses, guides, legal            |
| `src/styles/tokens.css` | Design tokens (single source of truth)                                                                                            |
| `scripts/`              | Audit, validation, content-integrity, and maintenance tooling                                                                     |
| `MoLumen_OS/`           | Project operating manuals, publishing templates, workflows, memory, decisions, and backlog                                       |
| `.claude/skills/`       | Project-specific Claude Code skills                                                                                               |
| `.pages.yml`            | Pages CMS configuration used by Mo for safe content editing                                                                       |

## Commands

```bash
npm install        # once
npm run dev        # local dev server
npm run build      # production build → dist/
npm run check      # TypeScript + Astro diagnostics
npm run format     # Prettier
npm run test:content # MoLumen business/content integrity checks
npm run audit      # structure + SEO + link-graph audit of dist/
npm run audit:a11y # axe-core WCAG 2.2 sweep of dist/
npm run audit:lh   # Lighthouse, mobile + desktop
```

The audit commands read `dist/`, so run `npm run build` first. See `docs/auditing.md`.

## Environment

Copy `.env.example` to `.env`. Public integration identifiers such as the Kit form UID and GA4 measurement ID may be configured there. No secret keys belong in this repository — Stripe is connected inside Cal.com, not here.

## Current third-party services

- **Cal.com** — scheduling and booking handoff
- **Stripe** — payment processing through Cal.com
- **Kit** — newsletter signup and email audience
- **Google Analytics 4** — analytics when configured
- **YouTube** — official channel at https://www.youtube.com/@MoLumenAstrology
- **Pages CMS** — GitHub-backed content editor for Mo
- **Cloudflare Workers** — staging/deployment hosting

## Ground rules

No invented services, prices, testimonials, credentials, or policies. Unconfirmed facts carry visible owner-review flags. Birth data never touches this repo, analytics, storage, or URLs. WCAG 2.2 AA and Core Web Vitals targets are requirements, not aspirations.
