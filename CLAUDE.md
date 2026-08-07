# MoLumen Claude Code Instructions

This repository uses the MoLumen AI Operating System in `MoLumen_OS/`.

At the beginning of substantive work read:
1. `MoLumen_OS/00_MASTER_OPERATING_MANUAL.md`
2. `MoLumen_OS/PROJECT_MEMORY.md`
3. `MoLumen_OS/DECISIONS.md`
4. `MoLumen_OS/BACKLOG.md`

Use project skills from `.claude/skills/` when relevant.

## Publishing interface

Pages CMS is Mo's primary day-to-day editing and publishing interface. Its repository configuration is `.pages.yml`.

When changing content schemas, file locations, draft behavior, media paths, or editable business fields:
- inspect `.pages.yml`
- keep the CMS configuration synchronized
- preserve `settings.content.merge: true` unless there is a deliberate migration plan
- do not expose secrets or fragile integration fields merely for convenience
- preserve a no-code path for ordinary blogs, Current Sky, videos, FAQs, glossary and existing content edits

Rules:
- Make routine implementation decisions autonomously.
- Inspect before editing.
- Do not repeat completed work.
- Preserve verified business facts.
- Do not invent prices/services/credentials/testimonials/legal facts.
- Research future astronomical events only with reliable sources and cross-checking.
- Keep ordinary publishing no-code for Mo.
- Fix shared architecture before page symptoms.
- Run relevant tests.
- Do not deploy production without explicit instruction.

At the end update project memory, changelog, decisions if needed, and backlog.
