# Deployment — Cloudflare (Workers static assets)

**Live setup (2026-08-02):** the repo deploys through Cloudflare's Workers Git integration
using `wrangler.jsonc` (static assets from `dist/`, custom 404). Staging URL:
https://molumen.shanenh.workers.dev/

## Settings in use
- Build command: `npm run build` · Deploy command: `npx wrangler deploy` · Path: `/`
- Non-production branches build with `npx wrangler versions upload` (preview deploys).
- Every push to `main` auto-deploys staging.

## Environment variables
Do **not** set `PUBLIC_SITE_URL` for staging — canonicals should keep pointing at
https://molumen.com so search engines never treat the workers.dev URL as the real site.
Set `PUBLIC_SITE_URL=https://molumen.com` (plus the other `PUBLIC_*` vars from
`.env.example` as integrations go live) only when configuring the production domain.

## Environments
- **Staging** = https://molumen.shanenh.workers.dev/ — review happens here.
- **Production** = molumen.com, attached to this same Worker as a custom domain only after
  approval — see docs/domain-migration.md.

## Redirects
`public/_redirects` ships with the build; Cloudflare Pages applies it automatically. Test after each deploy: `curl -I https://<site>/services-2` should return 301 → `/readings/`.

## Rollback
Cloudflare keeps every deployment. Dashboard → the project → Deployments → pick a previous one → "Rollback to this deployment." Instant.
