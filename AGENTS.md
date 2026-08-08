# MoLumen Agent Contract

## Mission
Maintain Mo Lumen Astrology as a fast, accessible, trustworthy Astro site. The primary business goal is qualified paid reading bookings; secondary goals are newsletter growth, search authority, useful education, and maintainable publishing.

## Source-of-truth order
1. Runtime behavior and current code.
2. Public integration configuration: `src/config/site.ts`.
3. Content schema: `src/content.config.ts`.
4. Pages CMS configuration: `.pages.yml`.
5. Current cross-session state, when needed: `MoLumen_OS/PROJECT_STATE.md`.
6. Active planning, when needed: the relevant section of `MoLumen_OS/BACKLOG.md`.
7. Durable rationale, when needed: `MoLumen_OS/DECISIONS.md`, then only the linked topic decision.
8. Domain guidance, when needed: the relevant guide listed in `MoLumen_OS/INDEX.md`.

Historical audits, handoffs, archived logs, and retired prompts are evidence only. Never treat them as current instructions without re-verifying the underlying condition.

## Context discipline
- Inspect the task area before loading broad documentation.
- Do not preload `MoLumen_OS/`.
- Read only the state, backlog section, decision topic, guide, workflow, template, rule, or skill needed for the task.
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
Classify material findings as:
- **Measured** — tests, runtime, network, or tool output.
- **Observed** — directly visible in code or rendered output.
- **Advisory** — UX, CRO, editorial, or strategic judgment.

Never present advisory judgment as measured evidence.

## Validation
Use the smallest validation set that proves the change is safe.
- Narrow change: run directly affected checks.
- Shared architecture/content-schema change: run `npm run verify:core` plus relevant targeted/browser checks.
- Broad interactive change: also run `npm run verify:interactive` after browser tooling is installed.
- Layout/accessibility/performance work: use the relevant axe, contrast, screenshot, or Lighthouse checks.
- Release work: use the release-manager skill and release evidence.

Fix regressions caused by the change. If a check cannot run, state why rather than claiming it passed.

## Documentation
Update only documentation whose truth changed:
- `PROJECT_STATE.md` for meaningful current-state changes.
- `BACKLOG.md` when active priority/status changes.
- a topic file under `decisions/` only for durable decisions/rationale future work needs; update `DECISIONS.md` if the index changes.
- `CHANGELOG.md` only for meaningful recent release/project highlights.

Do not mechanically update every project document after routine work.
