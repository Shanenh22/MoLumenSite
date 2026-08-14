# URL Inventory & Redirect Map (molumen.com → new site)

`public/_redirects` is the deploy source of truth for permanent legacy redirects on Cloudflare Workers Static Assets. This file is the human-readable launch inventory. Keep it synchronized with the deployed rules, and verify the legacy URLs that actually appear in Search Console before production cutover.

## Real-content URLs

| Legacy URL | New URL | Note |
|---|---|---|
| `/` | `/` | — |
| `/about` | `/about/` | — |
| `/services-2` | `/readings/` | — |
| `/appointments` | `/book/` | — |
| `/contact` | `/contact/` | — |
| `/blog` | `/blog/` | Real page; there is no blanket `/blog` redirect |
| `/blog/new-moon-in-pisces-3knsx-ty3bb` | `/current-sky/events/2025-02-27-pisces-new-moon/` | Preserves the legacy Pisces article on its matching Current Sky note |
| `/blog/new-moon-in-aqaurius-3knsx` | `/current-sky/archive/` | No matching retained event page; consolidate into archive |
| `/blog/new-moon-in-sagittarius` | `/current-sky/archive/` | No matching retained event page; consolidate into archive |
| `/blog/scorpio-new-moon-november-2024` | `/current-sky/events/2024-11-01-scorpio-new-moon/` | Preserves the legacy Scorpio article on its matching Current Sky note |
| `/blog/libra-new-moon-october-2024-eclipse` | `/current-sky/archive/` | No matching retained event page; consolidate into archive |
| `/blog/virgo-new-moon-september-2024` | `/current-sky/archive/` | No matching retained event page; consolidate into archive |
| `/blog/category/*`, `/blog/tag/*` | `/blog/` | Consolidate old taxonomy URLs onto the blog index |
| `/articles` | `/blog/` | Retired new-site route |
| `/articles/*` | `/blog/:splat` | Preserve article slugs after the collection moved to `/blog/` |
| `/terms-1` | `/terms/` | Legacy duplicate |
| `/cookies-2` | `/privacy/` | Cookie information is handled by the privacy page |
| `/newsletter-landing`, `/newsletter-landing-copy` | `/newsletter/` | Consolidate old signup pages |
| `/waitlist` | `/courses/` | Course-interest destination |
| `/instagram-landing`, `/instagram-landing-copy` | `/videos/` | Video destination |
| `/testimonials`, `/testimonials/` | `/how-readings-work/` | Retired standalone testimonials route |

## Template-junk URLs

The following old Squarespace/template paths redirect to the nearest durable destination rather than remaining as thin or duplicate pages:

| Legacy URL | Destination |
|---|---|
| `/sales-page` | `/readings/` |
| `/lead-generation` | `/newsletter/` |
| `/bonus-pages` | `/` |
| `/thank-you` | `/` |
| `/coming-soon-copy` | `/` |
| `/home-copy-of-mo-lumen` | `/` |
| `/404-copy` | `/404/` |
| `/privacy-copy` | `/privacy/` |
| `/terms-copy` | `/terms/` |
| `/site-credit-copy` | `/` |

## Rules

- `public/_redirects` is authoritative; change this inventory in the same PR whenever a deploy redirect changes.
- New site URLs use trailing slashes as their canonical form.
- Do not redirect a legacy article to a fabricated or obsolete event slug. Use the matching retained event page when one exists; otherwise consolidate it to the Current Sky archive.
- Before production cutover, compare this list with the real indexed legacy set in Search Console and test every relevant redirect end to end.

## Internal restructure — 2026-08-12

`/testimonials/` was retired as a standalone destination. A small set of permissioned, service-matched client quotes remains contextual on the relevant reading pages. Existing links/bookmarks to `/testimonials` or `/testimonials/` permanently redirect to `/how-readings-work/`, the durable page explaining the reading experience.

## Internal restructure — 2026-08-02

`/articles/` was folded into `/blog/` so Mo has one place for written posts. The content collection moved from `src/content/articles/` to `src/content/blog/` and was renamed `articles` → `blog`. Redirects `/articles` → `/blog/` and `/articles/*` → `/blog/:splat` are in place. The old Squarespace `/blog` blanket redirect was removed because `/blog/` is now a real page. Of the six retained legacy lunation-post redirects, two resolve to matching Current Sky event pages and four consolidate to the Current Sky archive.
