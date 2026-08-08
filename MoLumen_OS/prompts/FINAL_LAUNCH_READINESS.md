# Launch readiness

For an owner-requested release review, deliberately invoke `/molumen-release-manager`.

Use current repository tests, CI, staging/runtime evidence, `MoLumen_OS/09_QA_AND_LAUNCH.md`, and only the relevant current backlog/state.

Do not redesign during release work. Fix code-safe blockers in scope, preserve rollback readiness, and report:
- passed evidence
- failed evidence
- external owner actions
- production blockers
- GO / NO-GO

Do not deploy production or change production DNS without explicit owner authorization.
