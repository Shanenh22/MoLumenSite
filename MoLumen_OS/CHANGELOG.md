# AI Project Changelog

### 2026-08-07 — Pages CMS publishing layer

**Changed**
- Added repository-root `.pages.yml` for Mo-friendly content editing.
- Added grouped CMS editors for Blog, Current Sky, Videos, existing Readings/services, existing reference pages, FAQs, Glossary and Testimonials.
- Added Pages CMS media sources for content images and PDF downloads.
- Added draft-safe publishing for Current Sky and Videos; Blog already supported drafts.
- Updated homepage, Current Sky routes/archive and Videos page so drafts are excluded from generated public pages.
- Added a Pages CMS `Run site quality check` action backed by `.github/workflows/pages-cms-quality.yml`.
- Replaced raw-GitHub editing instructions with Pages CMS as the normal workflow.
- Added `docs/pages-cms-for-mo.md` as Mo's operating guide.
- Updated the MoLumen OS, Publisher skill and root `CLAUDE.md` so future schema changes preserve Pages CMS compatibility.

**Guardrails**
- `settings.content.merge: true` preserves technical fields hidden from the CMS.
- Service/reference create, rename and delete actions are restricted.
- Booking integration fields, legal content, analytics, schema architecture and credentials remain protected from routine CMS editing.
- Homepage/About structural copy remains code-managed for now to avoid exposing tightly coupled conversion/trust logic.

**Validation**
- Pages CMS configuration follows the current `.pages.yml` configuration model.
- Repository quality action runs Astro/type/content checks, production build and internal-link checks.
- Final GitHub Actions status should be checked after this change set.

**External actions still needed**
- Mo should refresh/open the connected repository in Pages CMS and verify the new menus render as expected.
- The broader launch backlog (Kit, GA4, booking, 2027 Current Sky, Birth Time Toolkit, launch QA) remains separate.

---

## Future session format

### YYYY-MM-DD — Session title

**Changed**
- ...

**Validated**
- ...

**External actions still needed**
- ...
