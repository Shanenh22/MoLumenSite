# Mo Lumen Astrology — Website

Complete rebuild of [molumen.com](https://molumen.com/): a static, fast, accessible Astro site deployed on Cloudflare Workers, replacing the current Squarespace site once staging and owner-side launch requirements are approved.

## Status

The Astro site is built and deployed to staging at:

`https://molumen.shanenh.workers.dev/`

The live `molumen.com` remains owner-gated. Nothing in the normal staging workflow attaches or cuts over the production domain.

## Product shape

Mo Lumen Astrology is a one-astrologer practice plus an owned learning/reference library.

- **Readings** provide individualized astrological synthesis and conversation.
- **Explore Astrology** teaches the language, structure, techniques, and limits of astrology.
- **Current Sky** follows shared cycles and keeps astronomical fact distinct from interpretation.
- **Horoscopes** provide a broad rising-sign whole-sign-house lens, not individualized prediction.
- **Blog** develops durable ideas and shows how Mo thinks.
- **Newsletter** is a monthly note from Mo; “The Sky This Month” is one recurring section, not the whole product.

The preferred visitor journey is: **learn → deepen → observe Mo's thinking → understand the reading experience → identify the right reading → book**.

## Project map

| Path | Purpose |
| --- | --- |
| `src/pages/` | Astro routes, hubs, tools, reading pages, and code-managed educational pages |
| `src/content/` | CMS/content collections: services, blog, sky events, videos, glossary, testimonials, FAQs, and legal content |
| `src/config/` | Site identity, navigation, images, and booking/integration configuration |
| `src/components/` | Shared UI, booking, newsletter, Current Sky, rising-sign, CTA, header/footer components |
| `src/layouts/BaseLayout.astro` | Global metadata, structured data, analytics/privacy shell, header/footer composition |
| `src/data/` | Code-managed reference data and supporting editorial data |
| `src/styles/` | Design tokens and global responsive styling |
| `.pages.yml` | Pages CMS configuration used by Mo for supported routine content |
| `MoLumen_OS/` | Current product/editorial operating manuals, state, decisions, templates, workflows, and active backlog |
| `.claude/rules/` | Path-scoped Claude Code rules |
| `.claude/skills/` | Project-specific Claude Code skills |
| `docs/` | Owner workflows, integrations, maintenance, research, deployment, and historical project documentation |
| `docs/history/` | Superseded plans/audits/session handoffs kept for historical reference rather than current instruction |
| `scripts/` | Build-time metadata, content/link/booking checks, interactive regression tests, audits, image/PDF tooling |
| `public/` | Static assets, optimized images, downloads, verification files, redirects, headers, icons |

The **Explore Astrology** reference library is currently code-managed; it is not a Pages CMS content collection. Courses and Guides are public page routes, not active content collections.

## Commands

```bash
npm install             # install project dependencies
npm run dev             # local dev server
npm run check           # Astro + TypeScript diagnostics
npm run build           # production build -> dist/
npm run test:content    # business/content integrity checks
npm run test:links      # internal link check against dist/
npm run verify:core     # agent docs + type/content + build + links + booking-link integrity
npm run verify:interactive # booking/finder/analytics/calendar/birth-time/rising-sign regression tests
npm run verify          # full core + interactive verification
npm run audit           # structure + SEO + link-graph audit of dist/
npm run audit:a11y      # axe-core WCAG sweep of dist/
npm run audit:lh        # Lighthouse mobile + desktop
npm run toolkit:pdf     # regenerate Birth Time Toolkit PDF after build
```

The dist-based audit and interactive commands require a current production build. See `docs/auditing.md` for the deeper audit workflow.

## Environment and public configuration

Copy `.env.example` to `.env` for local overrides when needed. Public identifiers such as the GA4 measurement ID, Kit form UID, Cal.com username, and optional welcome-video metadata are centralized in `src/config/site.ts` with environment overrides where appropriate.

No secret keys belong in this repository. Stripe is connected through Cal.com rather than embedded as a private credential in the site.

## Current third-party services

- **Cal.com** — scheduling and booking handoff
- **Stripe** — payment processing through Cal.com
- **Kit** — newsletter signup and email audience
- **Google Analytics 4** — consent-aware measurement through the shared privacy-safe tracking layer
- **YouTube** — official channel and click-to-load video presentation
- **Pages CMS** — GitHub-backed content editor for supported routine content
- **Cloudflare Workers** — staging/deployment hosting

## Ground rules

- Never invent services, prices, eligibility, testimonials, credentials, policies, legal identity, outcomes, astronomical facts, citations, or integration IDs.
- Birth data, personal free text, and rising-sign preference do not enter analytics.
- Astrology is framed as perspective, pattern, timing, possibility, and interpretation rather than a deterministic command or guaranteed future.
- Natural-science language may inform observation and systems thinking; it is not used as proof of astrology.
- Free content teaches generously without becoming an automated personal astrologer.
- Structured data must describe the real page/entity: dated celestial content is not a hosted `Event`, and collection/navigation pages are not automatically `Article` pages.
- Match each page's next step to visitor intent rather than appending Book everywhere.
- Production cutover, legal approval, owner/account configuration, and other external launch gates remain explicit owner actions.
