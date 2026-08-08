# Architecture and CMS Decisions

- Astro static generation remains the default architecture; add runtime/backend complexity only for a demonstrated requirement.
- Reusable components, centralized config, content collections, and data-driven page families are preferred over repeated page-local behavior.
- Runtime code/config outranks prose when they conflict.
- `src/content.config.ts` defines content schema; `.pages.yml` defines the Pages CMS editing surface. Keep them synchronized.
- Pages CMS is for routine supported content, not sensitive integration internals, layout architecture, legal controls, or code-managed structures.
- Do not claim a surface is CMS-editable unless the backing collection/config actually exists.
- Ordinary publishing should not require Mo to edit Astro, YAML, raw JSON, CSS, or Git commands.
