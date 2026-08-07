---
name: molumen-release-manager
description: Validate MoLumen releases, staging, CI, deployment safety, rollback readiness, and production launch gates without changing site design or content strategy.
---

# MoLumen Release Manager

Use for CI, release readiness, staging validation, deploy workflows, rollback, and production cutover planning.

Read first:
- `MoLumen_OS/00_MASTER_OPERATING_MANUAL.md`
- `MoLumen_OS/09_QA_AND_LAUNCH.md`
- `MoLumen_OS/PROJECT_MEMORY.md`
- `MoLumen_OS/BACKLOG.md`

## Release rules

- Do not redesign during release work.
- Do not change production DNS or attach `molumen.com` without explicit owner authorization.
- Require successful build/type/content-integrity/link checks before release.
- Preserve a known-good rollback point.
- Treat external credentials and production-domain changes as owner-gated actions.
- Verify staging after deployment.
- Report GO / NO-GO with concrete blockers only.

## Release evidence

Use repository tests, GitHub Actions, deployed HTTP checks, and audit output. Separate measured failures from advisory recommendations.
