# Deployment — Cloudflare (Workers static assets)

**Live setup (2026-08-02):** the repo deploys through Cloudflare's Workers Git integration
using `wrangler.jsonc` (static assets from `dist/`, custom 404). Staging URL:
https://molumen.shanenh.workers.dev/

## Settings in use

- Build command: `npm run build` · Deploy command: `npx wrangler deploy` · Path: `/`
- Non-production branches build with `npx wrangler versions upload` (preview deploys).
- Every push to `main` auto-deploys staging.
- The deploy workflow also rebuilds every July 1 so owner-reviewed future Current Sky content can cross a scheduled publication gate without requiring a manual content edit that morning.

## Environment variables

Do **not** set `PUBLIC_SITE_URL` for staging — canonicals should keep pointing at
https://molumen.com so search engines never treat the workers.dev URL as the real site.
Set `PUBLIC_SITE_URL=https://molumen.com` (plus the other `PUBLIC_*` vars from
`.env.example` as integrations go live) only when configuring the production domain.

## Environments and indexing

- **Staging** = https://molumen.shanenh.workers.dev/ — review happens here.
- **Production** = molumen.com, attached to this same Worker as a custom domain only after
  approval — see docs/domain-migration.md.
- `public/_headers` sends `X-Robots-Tag: noindex` only for the workers.dev staging hostname. This is deliberately host-specific so the same static build can become indexable on the approved production domain without removing a global noindex rule.
- Verify staging protection after deploy with `curl -I https://molumen.shanenh.workers.dev/` and confirm the response contains `X-Robots-Tag: noindex`.

## Redirects

`public/_redirects` ships with the build and is the deploy source of truth for Cloudflare Workers Static Assets redirects. Keep `docs/research/url-inventory-redirect-map.md` synchronized with it. Test after each deploy: `curl -I https://<site>/services-2` should return 301 → `/readings/`.

## Rollback

Cloudflare keeps every deployment. Dashboard → the project → Deployments → pick a previous one → "Rollback to this deployment." Instant.
