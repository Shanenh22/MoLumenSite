@AGENTS.md

# Claude Code

Use the most relevant project skill in `.claude/skills/` and path-scoped rules in `.claude/rules/`.

Do not preload `MoLumen_OS/`. Read canonical OS documents only when the task needs them.

For current cross-session status, read `MoLumen_OS/PROJECT_MEMORY.md`. For historical rationale, search `MoLumen_OS/DECISIONS.md` for the topic. For planning, read only the relevant `MoLumen_OS/BACKLOG.md` section.

Delegate noisy verification to the `molumen-qa` project subagent when useful.

Production/release work is owner-gated. Invoke `/molumen-release-manager` deliberately; Claude must not trigger it automatically.
