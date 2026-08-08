---
name: molumen-release-manager
description: Validate MoLumen release readiness, staging, CI, deployment safety, rollback, and production cutover gates.
disable-model-invocation: true
context: fork
---

# MoLumen Release Manager

Use only when the owner deliberately invokes this skill for CI/release readiness, staging validation, deploy workflows, rollback, or production cutover planning.

Read `MoLumen_OS/09_QA_AND_LAUNCH.md` and current project state/backlog only as needed for this release.

Rules:
- no redesign or content-strategy expansion during release work
- no production DNS/domain cutover without explicit owner authorization
- require successful relevant build/type/content/link/interactive checks
- preserve a known-good rollback point
- treat credentials and external production changes as owner-gated
- verify staging after deployment
- report GO / NO-GO with concrete blockers only

Use repository tests, GitHub Actions, deployed HTTP checks, and audit output as evidence. Separate measured failures from advisory recommendations.
