# Testing Report — staging build (2026-08-02)

Environment: Astro 5.18.2 static build, 100 pages. Tests run in the development container (Chromium via Playwright).

## Automated

| Check                                                                      | Result                    |
| -------------------------------------------------------------------------- | ------------------------- |
| `astro check` (TypeScript + templates)                                     | 0 errors, 0 warnings      |
| Production build                                                           | 100/100 pages, no errors  |
| Internal link validation (script over dist/)                               | 0 broken links            |
| Console errors (home, readings, natal, finder, explorer, sky, about, book) | none                      |
| Mobile horizontal overflow at 375px                                        | none                      |
| Sitemap generation                                                         | sitemap-index.xml present |
| RSS                                                                        | /rss.xml valid, 15 items  |

## Interactive

| Test                                            | Result                                                     |
| ----------------------------------------------- | ---------------------------------------------------------- |
| Reading Finder full flow (3 questions → result) | Pass — correct recommendation, focus moves to result       |
| Reading Finder no-JS                            | Pass — noscript fallback with comparison guidance          |
| Mobile nav open/close, Escape, backdrop click   | Pass (native dialog: focus trap + scroll lock)             |
| Chart explorer select (mouse)                   | Pass                                                       |
| Current Sky filters                             | Pass                                                       |
| Video facade                                    | Not yet testable — awaiting real video IDs                 |
| Booking embed                                   | Fallback state verified; live embed awaits Cal.com account |

## Staging verification (2026-08-02, https://molumen.shanenh.workers.dev/)

| Check                                                 | Result              |
| ----------------------------------------------------- | ------------------- |
| Homepage renders with styles, nav, services, prices   | Pass                |
| /readings/ shows all 7 services with confirmed prices | Pass                |
| Legacy redirect /services-2 → /readings/              | Pass (301 followed) |
| Unknown URL returns 404 status                        | Pass                |
| sitemap-index.xml served                              | Pass                |

## Accessibility & design audit (2026-08-02, post-redesign)

| Check                                                                                  | Result                                                                                            |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| axe-core WCAG 2.0/2.1/2.2 A+AA, 13 representative pages                                | **0 violations** (after fixes below)                                                              |
| Horizontal overflow at 320/360/375/390/430px                                           | 0px at every width                                                                                |
| Fixed: night-band gold buttons inherited gold link color (unreadable "Book a Reading") | `.section--night a.btn--*` explicit colors                                                        |
| Fixed: footer prose links indistinguishable from text (WCAG 1.4.1)                     | underlined                                                                                        |
| Fixed: gold accent text 3.96–4.13:1 on tinted backgrounds                              | `--accent-ink` darkened to #6f5626 (≥4.9:1)                                                       |
| Fixed: decorative logo SVG announced with empty label                                  | aria-hidden when unlabeled                                                                        |
| Logo                                                                                   | Owner PNG traced to optimized SVG symbol (14KB, one copy/page, currentColor) — crisp at all sizes |

## Accessibility & color audit — round 2 (2026-08-02, post-teal palette)

| Check                                                                                               | Result           |
| --------------------------------------------------------------------------------------------------- | ---------------- |
| axe-core WCAG 2.0/2.1/2.2 A+AA — **40 pages**, every page type incl. legal, 404, article, sky event | **0 violations** |
| Same audit at 390px mobile (6 pages) + mobile nav open                                              | **0 violations** |
| Rendered button contrast, every variant in real context                                             | all ≥ 6.06:1     |
| Horizontal overflow 320/360/375/390/430px                                                           | 0px              |

**Accent palette (replaces the bronze/gold CTA):**

| Token               | Value     | Use                         | Contrast                                  |
| ------------------- | --------- | --------------------------- | ----------------------------------------- |
| `--color-teal`      | `#0f6e6b` | primary CTA on light        | white text **6.06:1**                     |
| `--color-aqua`      | `#2ec4b6` | CTA on night/photo sections | navy text **6.6:1**, vs navy bg **6.6:1** |
| `--color-teal-ink`  | `#0d6360` | body links on ivory         | **6.6:1**                                 |
| `--color-teal-tint` | `#e4f0ef` | eyebrow chips, event chips  | teal text **5.2:1**                       |

Gold is retained as a decorative-only accent (dividers, portrait frame, logo mark) — it no longer
carries any text or button label, which is what made the old buttons read as muddy brown.

## Content expansion (2026-08-02)

10 new pages: the big three, elements & modalities, retrogrades, eclipses, lunar nodes, moon
phases, Saturn return, misconceptions, questions to bring, and The Sky in 2026. Explore hub
restructured into Foundations / Timing / In Practice. Site now 112 pages.
axe WCAG 2.2 AA on all new pages: **0 violations**. 0 broken links. See
docs/research/content-strategy.md for the research basis and the next recommended round.

## Content round 2 (2026-08-02)

Reference library rebuilt: 39 backbone pages deepened from ~300-word stubs to 520–660 words
each with epistemic labeling (astronomy / traditional / modern / Mo / where schools differ /
misconception). Six new reference pages plus a nine-step Start Here curriculum. Site now
**118 pages, ~71,000 words**. axe WCAG 2.2 AA across 16 representative pages: 0 violations.
0 broken links. 0px overflow down to 320px (wide dignity table uses an accessible scroll
region).

## Blog section (2026-08-02)

`/blog/` added to primary navigation and footer. `/articles/` folded in (one home for Mo's
writing, not two) with redirects. Category filtering, hero images, related posts, Blog +
BlogPosting schema, RSS updated. Desktop nav verified single-row at 1024–1600px with the new
item; axe WCAG 2.2 AA clean; 0px overflow at 320/390px.

**Caught during this round:** several earlier `navigation.ts` edits had silently failed because
Prettier had converted the file to double quotes while the edits used single quotes. The nav is
now authored directly rather than patched, and Start Here / Big Three / Dignities / Saturn Return
entries are present as intended. Worth re-verifying nav contents visually after any future
scripted edit.

## Full site audit — round 3 (2026-08-02)

Three tools were built for this and live in `scripts/`: `audit.mjs` (structure, SEO metadata,
heading order, internal link graph, orphan/click-depth analysis, word counts), `lh-audit.mjs`
(Lighthouse, mobile + desktop), `lh-detail.mjs` (per-audit drill-down), and `axe-sweep.mjs`
(axe-core WCAG 2.2 across a page sample at two viewports). Run them against a fresh `dist/`.

### Structural / SEO — before → after fixes

| Check                                            | Before                         | After                         |
| ------------------------------------------------ | ------------------------------ | ----------------------------- |
| Duplicate `<title>` / duplicate meta description | 0 / 0                          | 0 / 0                         |
| Titles over 60 chars (truncate in results)       | 69                             | **0**                         |
| Meta descriptions outside 70–160 chars           | 71                             | **0**                         |
| Pages without exactly one H1                     | 0                              | 0                             |
| Heading-level skips                              | 1                              | **0**                         |
| Images missing alt / missing width+height        | 0 / 0                          | 0 / 0                         |
| Pages without JSON-LD / without canonical        | 0 / 0                          | 0 / 0                         |
| Thin pages (< 350 words)                         | 1 (`/videos/`)                 | 1 (`/videos/`, owner-blocked) |
| Orphan pages (no inbound links)                  | 1 (`/courses/`)                | **0**                         |
| Pages more than 3 clicks from home               | 3 (courses, guides, resources) | **0**                         |
| Pages with fewer than 3 inbound links            | 18                             | 13                            |

The orphan/click-depth finding was the genuinely valuable one: `/courses/`, `/guides/` and
`/resources/` were fully built but reachable from nowhere in the navigation. They are now in the
footer Site group. The remaining 13 low-inbound pages are dated sky-event permalinks, which is
normal for archive content and not worth forcing links to.

### Lighthouse (localhost, throttled) — after fixes

| Page          | Mobile                                                          | Desktop                          |
| ------------- | --------------------------------------------------------------- | -------------------------------- |
| Homepage      | P 99 · A11y 100 · BP 100 · SEO 100 · LCP 2.3s · CLS 0 · TBT 0ms | 100 / 100 / 100 / 100 · LCP 0.5s |
| Readings hub  | 99 / 100 / 100 / 100 · LCP 2.1s                                 | 100 / 100 / 100 / 100 · LCP 0.5s |
| Natal service | 99 / 100 / 100 / 100 · LCP 2.0s                                 | 100 / 100 / 100 / 100 · LCP 0.4s |
| Sign page     | 100 / 100 / 100 / 100 · LCP 1.1s                                | 100 / 100 / 100 / 100 · LCP 0.3s |
| Blog          | 99 / 100 / 100 / 100 · LCP 2.2s                                 | 100 / 100 / 100 / 100 · LCP 0.6s |
| Start Here    | 99 / 100 / 100 / 100 · LCP 2.3s                                 | 100 / 100 / 100 / 100 · LCP 0.5s |

Homepage mobile was P 96 / A11y 98 with LCP 2.6s before this round. The a11y gain came from
fixing a heading-order skip; the LCP gain from serving the homepage portrait at 420/760/1000px
via `srcset` instead of shipping the 174KB original to phones. Remaining flagged item is ~14KB
of unused CSS on first paint — real but small, and splitting the token/base sheet per route
would cost more in maintainability than it returns.

### Accessibility

axe-core, WCAG 2.0/2.1/2.2 A + AA plus best-practice rules, 20 representative pages
(home, readings hub, a service, book, explore hub, sign, planet, house, dignities, start here,
blog, current sky, chart tool, reading finder, about, contact, videos, FAQs, glossary, 404)
at 390px and 1440px: **0 violations, 40 page-viewport combinations.**

### What this audit cannot tell you

These numbers come from a local production build. Real-world Core Web Vitals depend on
Cloudflare's edge, the visitor's device and network, and any third-party scripts added later
(Cal.com, GA4, MailerLite are not yet wired in and will change the picture). Automated
accessibility testing catches roughly a third to a half of real barriers — the keyboard-only
pass and screen-reader spot-check listed below are still required, and no automated result
here should be described as proof of legal compliance.

## Audit fixes round 1 — AEO / GEO / Schema / ADA (2026-08-03)

Items 1–6 of `docs/audit-2026-08-03-website-auditor.md` implemented.

| Signal                                               | Before         | After                                             |
| ---------------------------------------------------- | -------------- | ------------------------------------------------- |
| Pages with `dateModified` / `datePublished`          | 19 / 118 (16%) | **117 / 117 (100%)**                              |
| Pages with `FAQPage` schema                          | 1              | **8** (28 previously unmarked Q&A pairs)          |
| Pages with `Article` / `BlogPosting` schema          | 18             | **87**                                            |
| `llms.txt`                                           | 404            | **present, generated from the real service list** |
| Security headers / HTML cache policy                 | none           | **`public/_headers`**                             |
| Booking radio group with programmatic name           | no             | **yes (`fieldset` + `legend`)**                   |
| `Person` entity with `url` / `sameAs` / `knowsAbout` | no             | **yes**                                           |

Dates come from git history via `scripts/gen-page-dates.mjs`, wired to npm `prebuild`. Nothing is
invented: static pages take the last commit date of their own file, dynamic route families take the
newest of their template and data file, content frontmatter always wins, and a route git cannot date
ships with no date rather than a fabricated one. The generated map is committed so a shallow clone
on the build host cannot wipe it.

Reference and editorial pages emit `Article`; service, booking and legal pages emit `WebPage`
instead, because calling a booking page an article would be a misdescription.

**Regression check after all changes:** 118 pages build clean, `astro check` 0 errors, 0 broken
internal links across 235 URLs, axe-core 0 violations across 20 pages × 2 viewports, Lighthouse
mobile 99–100 and desktop 100 on all six page types, CLS 0.000 throughout.

**Not yet done** — items 7 and 8 from the audit: question-format headings on the 13 sign pages, and
visible source citations on the reference library. Both touch published wording and are held for
Mo's review. Zero of 118 pages currently cite a source.

## Legal documents rewritten (2026-08-03)

All five expanded and every `[OWNER CONFIRM]` placeholder resolved; review banners removed at the
owner side's request. Privacy now covers CCPA/CPRA and GDPR/UK-GDPR. Booking policy states a
48-hour window with credit inside it. Terms name Texas / Collin County.

Also corrected: the booking policy documented a horary email reading service that does not exist,
and `/how-readings-work/` implied the same in prose. Both removed — horary remains only as a
credential and a glossary term.

**No attorney has reviewed these documents.** See `docs/legal-review-status.md` for what that leaves
exposed and which three clauses actually matter.

## Still to run before launch (needs owner inputs)

- Lighthouse on Cloudflare staging (target ≥90/95/95/95) — run on real hosting, not localhost
- Full keyboard-only manual pass and screen-reader spot-check (NVDA/VoiceOver)
- Redirect testing against Cloudflare (curl -I each row of _redirects)
- Social metadata preview (opengraph.xyz) once staging URL exists
- Real booking end-to-end with Stripe test mode
- pa11y-ci/axe run against staging

## Known gaps (owner inputs)

Prices unconfirmed · no approved testimonials · no video IDs · booking policy windows unconfirmed · legal drafts await attorney review · lead magnet file not yet produced.
