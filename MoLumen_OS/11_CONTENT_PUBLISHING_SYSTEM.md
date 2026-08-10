# Content Publishing System

## Policy
Pages CMS is Mo's normal day-to-day publishing interface for supported content. GitHub remains the source of truth; Claude Publisher is the structure/quality layer and Claude Editor is the substantive research/voice layer when assistance is needed.

Mo-facing instructions live in:
- `docs/pages-cms-for-mo.md`
- `docs/how-to-write-and-publish-articles.md`

## Sources of truth
- `src/content.config.ts` — live content schemas.
- `.pages.yml` — fields/content surfaces exposed in Pages CMS.
- `src/content/` — collection content.
- `MoLumen_OS/02_BRAND_AND_EDITORIAL_GUIDE.md` — canonical voice, framing, page-role, and CTA guidance.
- `MoLumen_OS/templates/` and `workflows/` — on-demand publishing aids; they must follow the live schema/CMS and canonical editorial guide rather than override them.

## Routine CMS scope
Pages CMS supports configured routine content such as blog posts, Current Sky, videos, FAQs, glossary, testimonials, and approved editable reading/service copy. A content area is not CMS-editable merely because documentation says it is; the collection/config must exist.

Draft-capable content stays unpublished while its `draft` flag is enabled. Review staging/quality checks before publishing when appropriate.

## Editorial consistency
Routine CMS editing does not relax Mo's editorial standards. Public copy should remain warm, intelligent, grounded, candid, curious, conversational, technically informed in plain language, and agency-first.

Protect these boundaries:
- Explore teaches language, structure, and limits.
- Current Sky interprets shared cycles and keeps fact distinct from interpretation.
- Horoscopes provide a broad rising-sign whole-sign-house lens, not an individualized forecast.
- Blog develops durable ideas and shows Mo's reasoning.
- Newsletter is broader monthly correspondence; "The Sky This Month" is one recurring section.
- Paid readings provide individualized synthesis, judgment, application, and conversation.

Do not turn CMS convenience into a free automated personal astrology system.

## Page-role and CTA quality
Publishing QA includes the page's next step. Match the CTA/internal-link path to visitor intent instead of appending Book everywhere.

Typical paths:
- learning → deeper Explore / Start Here / Current Sky
- shared sky → related event / calendar / horoscopes / newsletter
- evaluating Mo → Approach / How Readings Work / Reading Finder
- comparing services → details / Reading Finder / booking once fit is clear
- personal question emerging from free content → Reading Finder

Avoid visitor-facing copy that narrates implementation details such as mobile/desktop behavior when the interface itself is clear.

## Protected/code-managed scope
Do not expose high-risk or tightly coupled fields merely for convenience. Keep booking/integration internals, analytics, schema architecture, legal controls, navigation/layout code, tightly coupled verified homepage/About structure, and Birth Time worksheet/PDF generation under code/developer review.

The `/explore/` reference library remains code-managed unless a deliberate content-backed migration is implemented and tested.

Business-critical facts remain owner-verified: service names, prices, durations, eligibility, policies, credentials, legal identity, and vendor/account configuration. The public brand is **Mo Lumen Astrology**; the confirmed legal name is **Mo Lumen Astrological Services**.

## Skill ownership
- `molumen-editor` — substantive research/prose/voice.
- `molumen-publisher` — content structure, frontmatter/fields, metadata, internal links, CMS compatibility, migrations, CTA/page-role fit, and publication QA.
- `molumen-developer` — components/layout/schema architecture/performance/site-owned behavior.
- `molumen-integrations` — vendor/account integration code/configuration.
- `molumen-strategist` — journey, prioritization, CRO, information architecture, and evidence-based recommendations.

## Maintenance rule
If routine supported content requires editing an Astro component, improve the publishing architecture rather than normalizing manual page coding. When schema/file structure changes, update `src/content.config.ts` and `.pages.yml` together and run relevant content/build/link checks.

When editorial strategy changes materially, update the canonical OS guidance and Claude skills in the same pass so CMS instructions, agents, and the public site do not drift apart.
