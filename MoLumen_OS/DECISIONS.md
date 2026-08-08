# MoLumen Decision Index

Use this as a topic router. Open only the decision file relevant to the current question. The superseded cumulative decision log is preserved at `archive/DECISIONS-through-2026-08-08.md` for historical research.

## Active decision topics
- [`decisions/architecture-and-cms.md`](decisions/architecture-and-cms.md) — static-first Astro architecture, source-of-truth hierarchy, Pages CMS boundaries, and no-backend-by-default policy.
- [`decisions/integrations-and-privacy.md`](decisions/integrations-and-privacy.md) — integration IDs/config, consent-aware analytics, lazy third parties, and YouTube privacy behavior.
- [`decisions/content-and-current-sky.md`](decisions/content-and-current-sky.md) — content ownership, Current Sky sourcing/horizon, and Birth Time editorial/toolkit separation.
- [`decisions/interactive-tools.md`](decisions/interactive-tools.md) — sky calendar, birth-time confidence, rising-sign preference, schema, and CMS boundaries.
- [`decisions/deployment-and-release.md`](decisions/deployment-and-release.md) — staging/production separation, production owner gates, rollback, and evidence requirements.

## Adding a decision
Create or update the smallest topic file that owns the rationale. Add a new topic only when a durable decision does not fit an existing one. Do not append routine implementation history here.
