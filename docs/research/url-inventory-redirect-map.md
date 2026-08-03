# URL Inventory & Redirect Map (molumen.com → new site)

Implement as Cloudflare Pages `_redirects` (301 unless noted). Verify against Search Console's actual indexed set before launch.

## Real-content URLs

| Legacy URL | New URL | Note |
|---|---|---|
| `/` | `/` | — |
| `/about` | `/about/` | — |
| `/services-2` | `/readings/` | — |
| `/appointments` | `/book/` | — |
| `/contact` | `/contact/` | — |
| `/blog` | `/blog/` (real page) | Mo's blog now lives at the same path; individual legacy lunation posts still redirect to Current Sky (below) |
| `/blog/new-moon-in-pisces-3knsx-ty3bb` | `/current-sky/events/new-moon-in-pisces-february-2025/` | clean slug |
| `/blog/new-moon-in-aqaurius-3knsx` | `/current-sky/events/new-moon-in-aquarius-january-2025/` | fixes typo'd slug |
| `/blog/new-moon-in-sagittarius` | `/current-sky/events/new-moon-in-sagittarius-december-2024/` | — |
| `/blog/scorpio-new-moon-november-2024` | `/current-sky/events/new-moon-in-scorpio-november-2024/` | — |
| `/blog/libra-new-moon-october-2024-eclipse` | `/current-sky/events/libra-solar-eclipse-october-2024/` | — |
| `/blog/virgo-new-moon-september-2024` | `/current-sky/events/new-moon-in-virgo-september-2024/` | — |
| `/blog/category/*`, `/blog/tag/*` | `/blog/` | consolidate onto the blog index |
| `/blog/category/Writing+Tips`, `/Freelance`, `/Entrepreneurship`, `/Copywriting` | `/current-sky/archive/` | off-topic template taxonomy; redirect rather than 404 to preserve any stray equity |
| `/terms`, `/terms-1` | `/terms/` | — |
| `/privacy` | `/privacy/` | — |
| `/cookies-2` | `/privacy/#cookies` | — |
| `/courses` | `/courses/` | new interest page (no fake products) |
| `/newsletter-landing` | `/newsletter/` | — |
| `/waitlist` | `/courses/` | waitlist folds into courses interest page |
| `/instagram-landing` | `/videos/` | — |
| `/404` | `/404/` | Squarespace artifact; serve real 404 |

## Template-junk URLs (redirect to nearest real page)

`/sales-page` → `/readings/`; `/lead-generation` → `/newsletter/`; `/bonus-pages` → `/`; `/thank-you` → `/`; `/coming-soon-copy`, `/home-copy-of-mo-lumen`, `/instagram-landing-copy`, `/newsletter-landing-copy`, `/404-copy`, `/privacy-copy`, `/terms-copy`, `/site-credit-copy` → nearest equivalent (`/`, `/newsletter/`, `/videos/`, `/privacy/`, `/terms/`, `/`).

## Rules

- All new URLs use trailing slashes; enforce one canonical form via redirects.
- Mo1's URL design is adopted wholesale (its sitemap already targets molumen.com paths), so no redirects are needed between Mo1 paths and the new site.
- Keep this file in sync with `public/_redirects`; test every row pre-launch (see docs/testing plan).

## Internal restructure (2026-08-02)

`/articles/` was folded into `/blog/` so Mo has exactly one place for written posts. The content
collection moved from `src/content/articles/` to `src/content/blog/` and was renamed `articles` →
`blog`. Redirects `/articles` → `/blog/` and `/articles/*` → `/blog/:splat` are in place. The old
Squarespace `/blog` blanket redirect was removed, since `/blog/` is now a real page; the six
individual legacy lunation-post redirects to `/current-sky/events/` remain.
