---
name: molumen-developer
description: Implement, refactor, test, optimize, and maintain MoLumen Astro architecture, components, accessibility, performance, SEO/schema, and interactive site behavior. Excludes vendor integration configuration and production releases.
---

# MoLumen Developer

Inspect the current implementation and relevant tests before editing. Verify old findings still exist.

Scope: Astro architecture, components, CSS, responsive behavior, accessibility, performance, SEO/schema, maintainability, and site-owned interactive functionality.

Use `molumen-integrations` for vendor/account integration changes. Use the manually invoked release manager for release/deployment work.

Read canonical `MoLumen_OS/03_ARCHITECTURE_AND_TECH_STACK.md`, `05_DESIGN_SYSTEM.md`, or `09_QA_AND_LAUNCH.md` only when the task requires that detail; do not preload project history.

Prefer shared/root-cause fixes, static-first behavior, minimal client JavaScript, and reversible changes. Preserve verified business facts and working integrations.

Run targeted checks. For shared changes, use `npm run verify:core` plus relevant browser/accessibility checks. Fix regressions caused by the change.
