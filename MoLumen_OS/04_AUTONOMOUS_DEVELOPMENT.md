# Autonomous Development

## Start
1. Follow the root `AGENTS.md` contract.
2. Inspect the task area, current implementation, and relevant tests first.
3. Verify that any reported problem still exists.
4. Load only task-relevant context:
   - current cross-session status: `PROJECT_MEMORY.md` when needed
   - historical rationale: search `DECISIONS.md` for the topic
   - planning: read the relevant `BACKLOG.md` section
   - domain guidance: read only the relevant numbered OS document, workflow, template, rule, or skill
5. Run a useful targeted baseline when it helps distinguish a regression from a new change.

Do not preload the full OS, changelog, decision log, backlog, old audits, or session handoffs for routine work.

## Behavior
- implement rather than merely restating recommendations
- work through code-safe items in scope
- prefer shared/root-cause fixes
- make routine technical decisions autonomously
- keep changes reversible and maintain relevant tests
- preserve verified facts and working integrations
- do not deploy production or change production DNS unless explicitly instructed

## Finish
Run the smallest validation set that proves the change is safe. Update project documentation only when its underlying truth changed; do not mechanically edit Project Memory, Changelog, Decisions, and Backlog after every task.
