@AGENTS.md

# Claude Code

Use the most relevant project skill in `.claude/skills/` and path-scoped rules in `.claude/rules/`.

Do not preload `MoLumen_OS/`. Use `MoLumen_OS/INDEX.md` only when you need to locate deeper guidance.

For current status, read `MoLumen_OS/PROJECT_STATE.md` only when the task depends on cross-session state. For planning, read only the relevant `BACKLOG.md` section. For rationale, open `DECISIONS.md` and then only the linked topic decision.

Delegate noisy verification to the `molumen-qa` project subagent when useful.

Production/release work is owner-gated. Invoke `/molumen-release-manager` deliberately; Claude must not trigger it automatically.
