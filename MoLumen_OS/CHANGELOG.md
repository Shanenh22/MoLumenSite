# MoLumen Recent Changelog

This file contains only recent, human-useful project highlights. Git history is the complete implementation record. Older accumulated notes are preserved at `archive/CHANGELOG-through-2026-08-08.md` and are not current instructions.

## 2026-08-08 — agent context architecture
- Added a shared root agent contract and a small Claude router.
- Added path-scoped Claude rules, narrower skills, manual/forked release handling, and a read-only QA subagent.
- Removed copied skill resources and redirected skills to canonical sources.
- Reorganized the MoLumen OS around a compact state file, active-only backlog, topic decision index, and explicit history/archive areas.
- Added automated agent-document integrity checks to prevent common context regressions.

Keep this file short. Archive older entries rather than allowing it to become a second Git log.
