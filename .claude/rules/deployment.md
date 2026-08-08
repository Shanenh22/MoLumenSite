---
paths:
  - ".github/workflows/**/*"
  - "wrangler.jsonc"
  - "public/_headers"
  - "public/_redirects"
---

# Deployment and CI

- Do not deploy production, change production DNS, or attach `molumen.com` without explicit owner authorization.
- Preserve the known-good rollback path and staging verification.
- Keep Cloudflare/Wrangler versions explicitly pinned where the deployment workflow depends on them.
- Treat credentials, production-domain changes, and external-account actions as owner-gated.
- CI failures are evidence; separate blocking failures from advisory checks.
- Do not weaken a gate merely to make a run green. Fix the cause or document why the gate itself is wrong.
