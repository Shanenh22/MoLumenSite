# Deployment — Cloudflare Pages

## One-time setup (staging)
1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → select the repo.
3. Build settings: framework **Astro**; build command `npm run build`; output directory `dist`.
4. Environment variables (Settings → Environment variables): set `PUBLIC_SITE_URL` to the `*.pages.dev` URL for preview, and the production URL for production. Add other `PUBLIC_*` vars from `.env.example` as integrations go live.
5. Deploy. Every push to `main` auto-deploys; pull requests get preview URLs.

## Environments
- **Staging** = the `*.pages.dev` URL (or a `staging.` subdomain). Review happens here.
- **Production** = molumen.com, attached only after approval — see docs/domain-migration.md.

## Redirects
`public/_redirects` ships with the build; Cloudflare Pages applies it automatically. Test after each deploy: `curl -I https://<site>/services-2` should return 301 → `/readings/`.

## Rollback
Cloudflare keeps every deployment. Dashboard → the project → Deployments → pick a previous one → "Rollback to this deployment." Instant.
