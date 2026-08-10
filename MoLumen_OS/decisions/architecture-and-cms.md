# Architecture and CMS Decisions

- Astro static generation remains the default architecture; add runtime/backend complexity only for a demonstrated requirement.
- Reusable components, centralized config, content collections, and data-driven page families are preferred over repeated page-local behavior.
- Runtime code/config outranks prose when they conflict.
- `src/content.config.ts` defines content schema; `.pages.yml` defines the Pages CMS editing surface. Keep them synchronized with `docs/pages-cms-for-mo.md`.
- Pages CMS is for routine supported content, not sensitive integration internals, booking mappings, layout/schema architecture, legal controls, or tightly coupled code-managed structures.
- The Explore Astrology reference library remains code-managed until a deliberate content-backed migration is implemented and regression-tested. Do not restore an empty or pretend CMS editor.
- Birth Time guide/toolkit/worksheet-PDF structures remain code-managed while their layout/tool/PDF behavior is coupled.
- Ordinary publishing should not require Mo to edit Astro, YAML, raw JSON, CSS, or Git commands.
- Business-critical facts remain owner-verified even when editable fields exist: service names, prices, durations, eligibility, policies, credentials, legal identity, and vendor/account configuration.
- Public brand is **Mo Lumen Astrology**; confirmed legal name is **Mo Lumen Astrological Services**.
- When editorial strategy changes materially, update the canonical OS guidance, relevant Claude skills/rules, and owner-facing CMS instructions together so the publishing system does not drift.
