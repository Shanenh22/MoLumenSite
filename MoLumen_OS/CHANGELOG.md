# AI Project Changelog

### 2026-08-07 — Repository hardening v3

**Changed**
- Replaced remaining MailerLite repository integration/configuration with the owner-supplied Kit embed.
- Added the official MoLumen YouTube channel to centralized site configuration.
- Added `scripts/content-integrity.mjs` and wired it into Pages CMS, PR validation and deploy validation.
- Added pull-request CI for Astro/type checks, content integrity, build, links, booking handoff and Reading Finder handoff; formatting is currently advisory because legacy files are not normalized.
- Added weekly Dependabot monitoring for npm and GitHub Actions.
- Added CodeQL JavaScript/TypeScript scanning.
- Added scheduled staging and external-integration health checks.
- Pinned the deployment workflow to an explicit Wrangler release and refreshed the Workers compatibility date/config schema.
- Added `molumen-integrations` and `molumen-release-manager` Claude Code skills.
- Updated project memory, decisions and backlog to reflect the new operating model.

**Validated**
- Astro/type check passed on the hardening PR.
- MoLumen content-integrity check passed with 0 errors and 0 warnings.
- Production build generated 130 pages successfully.
- CodeQL passed on the prior hardening revision; final PR checks rerun after the latest documentation updates.

**External actions still needed**
- Submit a real test newsletter address through Kit to verify account-side signup/confirmation/delivery behavior.
- Review/resolve dependency advisories through normal Dependabot updates rather than force-upgrading blindly.
- Staging noindex/search protection is intentionally deferred by owner request.

---

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

**External actions still needed**
- Mo should refresh/open the connected repository in Pages CMS and verify the new menus render as expected.

---

## Future session format

### YYYY-MM-DD — Session title

**Changed**
- ...

**Validated**
- ...

**External actions still needed**
- ...
