# Owner Guide — running your website

This site is built so you (Mo/Shane) can update everything that changes often by editing simple text files — no redesign, no HTML surgery. Every page's chrome (header, nav, footer) comes from shared components, so nothing repeats.

## The 60-second mental model

- **`src/content/`** — your content: services, sky events, articles, FAQs, glossary, testimonials, videos, legal pages. Each is a small text file (JSON or Markdown).
- **`src/config/`** — your settings: site facts (`site.ts`), menus (`navigation.ts`).
- **`src/data/`** — the educational reference (signs, planets, houses, aspects). Edit text freely; keep the field structure.
- **`.env` / Cloudflare env vars** — integration IDs (analytics, booking, newsletter). The site runs fine with none set.

Change a file → commit → Cloudflare Pages rebuilds and deploys automatically (~1 minute).

## Common tasks
| Task | See |
|---|---|
| Change a price or service detail | docs/add-a-service.md |
| Add/remove a sky event | docs/update-current-sky.md |
| Publish an article | docs/add-an-article.md |
| Add a video | docs/add-a-video.md |
| Edit menus/footer | docs/manage-navigation.md |
| Add a testimonial | edit `src/content/testimonials/testimonials.json`; set `approved: true` only with the client's permission (unapproved entries never appear) |
| Edit a policy page | edit the matching file in `src/content/legal/`; change `reviewStatus` once attorney-approved to remove the draft banner |
| Deploy / go live | docs/deployment.md, docs/domain-migration.md |

## Rules the site enforces for you
- Services with `priceConfirmed: false` show "pricing confirmed at booking" instead of a number — no accidental fake prices.
- Testimonials with `approved: false` never render in production.
- Legal pages marked `attorney-review-required` display a draft banner.
- Google Analytics loads only when its ID is set, and never receives names, emails, or birth data.
