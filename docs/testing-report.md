# Testing Report — staging build (2026-08-02)

Environment: Astro 5.18.2 static build, 100 pages. Tests run in the development container (Chromium via Playwright).

## Automated
| Check | Result |
|---|---|
| `astro check` (TypeScript + templates) | 0 errors, 0 warnings |
| Production build | 100/100 pages, no errors |
| Internal link validation (script over dist/) | 0 broken links |
| Console errors (home, readings, natal, finder, explorer, sky, about, book) | none |
| Mobile horizontal overflow at 375px | none |
| Sitemap generation | sitemap-index.xml present |
| RSS | /rss.xml valid, 15 items |

## Interactive
| Test | Result |
|---|---|
| Reading Finder full flow (3 questions → result) | Pass — correct recommendation, focus moves to result |
| Reading Finder no-JS | Pass — noscript fallback with comparison guidance |
| Mobile nav open/close, Escape, backdrop click | Pass (native dialog: focus trap + scroll lock) |
| Chart explorer select (mouse) | Pass |
| Current Sky filters | Pass |
| Video facade | Not yet testable — awaiting real video IDs |
| Booking embed | Fallback state verified; live embed awaits Cal.com account |

## Staging verification (2026-08-02, https://molumen.shanenh.workers.dev/)
| Check | Result |
|---|---|
| Homepage renders with styles, nav, services, prices | Pass |
| /readings/ shows all 7 services with confirmed prices | Pass |
| Legacy redirect /services-2 → /readings/ | Pass (301 followed) |
| Unknown URL returns 404 status | Pass |
| sitemap-index.xml served | Pass |

## Accessibility & design audit (2026-08-02, post-redesign)
| Check | Result |
|---|---|
| axe-core WCAG 2.0/2.1/2.2 A+AA, 13 representative pages | **0 violations** (after fixes below) |
| Horizontal overflow at 320/360/375/390/430px | 0px at every width |
| Fixed: night-band gold buttons inherited gold link color (unreadable "Book a Reading") | `.section--night a.btn--*` explicit colors |
| Fixed: footer prose links indistinguishable from text (WCAG 1.4.1) | underlined |
| Fixed: gold accent text 3.96–4.13:1 on tinted backgrounds | `--accent-ink` darkened to #6f5626 (≥4.9:1) |
| Fixed: decorative logo SVG announced with empty label | aria-hidden when unlabeled |
| Logo | Owner PNG traced to optimized SVG symbol (14KB, one copy/page, currentColor) — crisp at all sizes |

## Still to run before launch (needs owner inputs)
- Lighthouse on Cloudflare staging (target ≥90/95/95/95) — run on real hosting, not localhost
- Full keyboard-only manual pass and screen-reader spot-check (NVDA/VoiceOver)
- Redirect testing against Cloudflare (curl -I each row of _redirects)
- Social metadata preview (opengraph.xyz) once staging URL exists
- Real booking end-to-end with Stripe test mode
- pa11y-ci/axe run against staging

## Known gaps (owner inputs)
Prices unconfirmed · no approved testimonials · no photos of Mo · no video IDs · booking policy windows unconfirmed · legal drafts await attorney review · lead magnet file not yet produced.
