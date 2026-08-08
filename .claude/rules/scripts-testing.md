---
paths:
  - "scripts/**/*"
  - "package.json"
  - ".github/workflows/ci.yml"
---

# Scripts and testing

- Keep tests deterministic and useful on both CI and local Windows checkouts where practical.
- Normalize line endings before parsing line-oriented source; CRLF previously caused false content-integrity failures.
- Reuse the repository's manifest-backed dist-server helper rather than mapping request URLs directly to filesystem paths.
- A check that cannot measure its target must fail or report that limitation clearly; do not print a false all-clear.
- Prefer targeted tests for narrow changes and `npm run verify:core` for shared changes.
- `npm run verify:interactive` requires the repository's browser tooling to be installed first.
- Preserve specialized regression checks for booking, Reading Finder, Current Sky calendar time zones, Birth Time Confidence, and rising-sign preference when their code changes.
