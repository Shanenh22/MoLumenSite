# MoLumen Agent Contract

## Mission
Maintain Mo Lumen Astrology as a fast, accessible, trustworthy Astro site. The primary business goal is qualified paid reading bookings; secondary goals include newsletter growth, search authority, useful education, and maintainable publishing.

## Sources of truth
- Runtime behavior and live code beat prose documentation when they conflict.
- Public integration configuration: `src/config/site.ts`.
- Content schema: `src/content.config.ts`.
- Pages CMS configuration: `.pages.yml`.
- Current cross-session project state, when needed: `MoLumen_OS/PROJECT_MEMORY.md`.
- Historical rationale: search `MoLumen_OS/DECISIONS.md` for the relevant topic; do not read it wholesale by default.
- Planning: read only the relevant section of `MoLumen_OS/BACKLOG.md`.
- Do not use old audit reports, session handoffs, changelogs, or completed prompts as current truth unless the task specifically requires history.

## Context discipline
- Inspect the task area before loading broad project documentation.
- Do not preload the `MoLumen_OS/` directory.
- Read only the guide, skill, rule, workflow, or template relevant to the current task.
- Verify that an old finding still exists before fixing it.
- Do not repeat completed work unless evidence shows a regression.
- Prefer canonical repository files over copied instructions or remembered values.

## Engineering rules
- Fix shared/root causes before page-specific symptoms.
- Prefer static-first, reusable, accessible implementations with minimal client JavaScript.
- Preserve working booking, analytics, privacy, content, CMS, schema, and deployment behavior.
- Make routine implementation decisions autonomously; do not stop for technically equivalent choices.
- Keep ordinary publishing no-code for Mo through Pages CMS.
- Never expose secrets in public source.
- Never invent services, prices, durations, credentials, testimonials, client outcomes, policies, legal facts, products, event dates, astronomical facts, verification status, analytics results, account IDs, or source citations.
- Do not deploy production, change production DNS, or attach `molumen.com` without explicit owner authorization.

## Evidence
When reporting findings, distinguish:
- **Measured** — tests, runtime, network, or tool output.
- **Observed** — directly visible in code or rendered output.
- **Advisory** — UX, CRO, editorial, or strategic judgment.

Never present advisory judgment as measured evidence.

## Validation
Use the smallest validation set that can prove the change is safe.
- Narrow change: run the directly affected check(s).
- Shared architecture/content-schema change: run `npm run verify:core` plus relevant targeted/browser checks.
- Broad interactive change: also run `npm run verify:interactive` after browser tooling is installed.
- Layout/accessibility/performance work: use the relevant axe, contrast, screenshot, or Lighthouse checks.
- Release work: use the release-manager skill and release evidence, not assumptions.

Fix regressions caused by the change. If a check cannot run, state why rather than claiming it passed.

## Documentation
Update documentation only when its truth changed:
- `PROJECT_MEMORY.md` for meaningful current-state changes.
- `DECISIONS.md` only for durable decisions or rationale future work needs.
- `BACKLOG.md` only when priority/status changed.
- `CHANGELOG.md` only for meaningful project changes.

Do not edit all four mechanically after routine work.
