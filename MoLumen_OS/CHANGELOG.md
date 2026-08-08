# AI Project Changelog

### 2026-08-08 (funnel) — Conversion-funnel repair, Phase 1 and 2

Prompted by a conversion-funnel audit that agreed with a separate independent audit: the
funnel, voice, Reading Finder and booking architecture are strong, and the problems are
concentrated at the bottom of the funnel. No redesign; the Finder, the embed, the collapse,
`mlTrack`, Consent Mode, open pricing and the header CTA are all untouched in substance.

**The default reading on a bare `/book/` was the $275 Relationship Consultation.**

`natal.json` and `relationship.json` both carry `featured: true`, the sort
(`Number(b.featured) - Number(a.featured)`) is a no-op on a tie, and `firstReadings[0]` took
whatever collection order produced. The header CTA is on all 174 pages and points at bare
`/book/`, so the site's most-clicked route into the funnel opened on its most expensive
reading — one that requires a second attendee. `test:booking` could not see it: the suite
checks the `natal-90` radio itself before asserting anything, so it was 18/18 green
throughout.

`src/config/booking.ts` now states `DEFAULT_BOOKING_EVENT` and `READING_ORDER` explicitly.
`book.astro` throws at build time if the default is not a real bookable event, and
`test:content` fails if `READING_ORDER` and the services collection disagree, or if the
default belongs to an established-clients-only reading.

**Two "Book this reading" buttons on one page went to two different prices.**

On `/readings/want-more-clarity/` the hero passed `bookingEventId` (`clarity`, $130) and the
CTA band passed `slug` (`want-more-clarity` → `clarity-3mo`, $100). `test:finder` passed
because it asserts each mapping in isolation, never that one page's two CTAs agree.

`bookingActions()` in `src/config/booking.ts` is now the only source of booking links, used
by the hero, the option cards, the CTA band, both hub grids and the comparison table. The
rule: a single-option reading deep-links to its canonical event; a multi-option reading
offers one priced action per option and never picks for the customer. Where options share a
duration the option label distinguishes them, because two buttons both reading "Book 1 hour"
at different prices is the same defect from the other direction.

**Analytics went dark at the Cal.com boundary.** `booking_complete` now fires from Cal's
`bookingSuccessfulV2` callback through `mlTrack`. The callback payload is never read — it
carries the attendee's name, email, phone, the booking UID, the appointment time and any
birth data typed into the notes — so the service key comes from the selected radio instead.
The test hands the callback a payload containing all of it and asserts none reaches
`dataLayer`.

**The mobile consent banner covered the homepage's primary actions.** Measured at 375x812:
398px tall, 49% of the viewport, and `elementFromPoint()` on both hero buttons returned the
banner. The arithmetic is why this needed a copy change and not only CSS — at 375x667 the
hero buttons sit 159px from the bottom, and a title, paragraph, disclosure control and two
48px buttons do not fit in 159px at any padding. The phone banner is now one line plus the
two buttons at 146px; desktop is unchanged at 194px with the full explanation. Both choices
stay identical in size, Consent Mode defaults are untouched, and the privacy link is in the
line that always shows.

**Everything else, briefly.** Navigation regrouped to Readings / Explore Astrology / Current
Sky / From Mo with the Book CTA separate — no URL changed. Readings hub split into "New to
Mo? Start here" and "Already had your natal reading?" with a "Who can book" column, because
five of seven readings follow on from a natal reading and the hub presented all seven
identically. `/current-sky/` closed by pointing at Monthly Personal Transits, an
established-client reading, on the site's biggest free search entry point; it now points at
the Reading Finder. `CTABand` gained a Reading Finder secondary action, which reaches all 48
pages that use it — measured before: zero of ~140 educational pages linked to the Finder at
all. One matched testimonial per reading page, matched strictly on the `service` field with
no fallback. Six service-scoped FAQs, all answerable from existing service records. Homepage
welcome-video slot, guarded on the ID exactly as `/about/` is. `reading_finder_step` events
carrying only a step id and number. The newsletter as a nurture exit for the "still
deciding" answer only, never as a gate.

**Owner-side, and blocking launch:** `docs/calcom-owner-actions.md`. All nine Cal.com event
types have `locations: [{"type":"somewhereElse"}]`, so the last required question before
payment is a free-text box labelled "Somewhere else" while the site says Zoom · Phone. And
no event type has a single custom booking question, so the intake form four surfaces promise
does not exist. Both are settings in Mo's account; the document gives the measured current
state and click-by-click instructions rather than a faked repository fix.

### 2026-08-08 (follow-up) — Two capabilities the repository claimed and did not have

Both were found while building the interactive tools and are unrelated to them. Neither
was a bug in code that ran; both were declarations of things that did not exist.

**The "Astrology reference library" CMS editor was never real.**

An `explore` content collection was declared in `content.config.ts` and mapped in
`.pages.yml` as an editable collection. `src/content/explore/` has never existed — not on
disk, not anywhere in git history — and `getCollection('explore')` is called nowhere. The
effects: a build warning on every build, a Pages CMS section Mo could open and find empty,
and **step-by-step instructions in `docs/pages-cms-for-mo.md` for editing pages through
it**. Five documents repeated the claim.

Removed rather than pointed at an empty directory: an empty CMS editor is worse than an
absent one, because it reads as something the owner did wrong. The reference library is 25
hand-written `.astro` pages under `src/pages/explore/`; making them genuinely editable is a
migration carrying components, per-page structured data and hand-placed inline links, and
it is now on the backlog as its own task with its own verification pass. **The `.pages.yml`
block goes back in the same change that creates the content, never before.**

Corrected in `.pages.yml`, `content.config.ts`, `docs/pages-cms-for-mo.md`,
`docs/content-editing.md`, `PROJECT_MEMORY.md` and `BACKLOG.md`.

**`npm run test:a11y` could never have run.**

It invoked `pa11y-ci`, which is not in `devDependencies` and is not installed. Removed
rather than given a config: pa11y and axe wrap overlapping rule sets, so configuring it
would have meant a new dependency, a second page list to keep in step, and two places to
look when something failed — for coverage the existing run already provides.

`npm run audit:a11y` is the accessibility gate and is the only one. A note saying so now
sits at the top of `scripts/axe-sweep.mjs`, along with what it does **not** cover: text
over photographs, which axe cannot sample and which `check:hero-contrast` owns.

**Also changed**

- **`privacy.md` approved, after the wording was tightened to meet the condition attached
  to that approval.** Shane approved describing the rising sign as local device storage
  *provided the text stated it is not transmitted as birth data and not used to identify
  the visitor*. The draft did neither explicitly — the paragraph contained no mention of
  birth data and none of identification; it only implied both with "not a login and not a
  profile". Two paragraphs were added:

  - **Not birth data.** Choosing a rising sign never asks for birth date, birth time or
    birth place; none is requested, stored or sent; and the site does not derive the sign
    from them because it holds none of them. This is the accurate claim — the picker is
    twelve buttons, and a sign the visitor states themselves is not a birth detail the
    site has collected.
  - **Not an identifier.** Not a login, account or profile; not used to recognise the
    visitor, tell them apart from anyone else, or build a record of visits; never sent to
    us, to analytics, or into a web address.

  `updatedDate` moved 2026-08-03 → 2026-08-08 because the policy text materially changed
  and the page displays that date. `reviewStatus` stays `owner-approved` — it was never
  altered.

**Validated**

- Astro check 0 errors. Build 174 pages, and the `explore` glob-loader warning is gone.
- Content integrity 0/0. Internal links 174 files, 0 failures.
- axe 0 violations, 25 pages × 2 viewports. Hero contrast 172 pages, 0 failures.
  `check:contrast` 13/13.
- Booking 18/18, Finder 11/11, Calendar 36/36, Birth Time 36/36, Rising 43/43 — the three
  new tools were not touched.

**Left alone deliberately**

- The `courses` and `guides` collections warn about missing directories too, but the schema
  comment says explicitly they are "defined now, populated only when real offerings exist",
  and neither is exposed in `.pages.yml`. That is a documented placeholder, not a false
  claim of capability.

### 2026-08-08 (later) — Three interactive tools: sky calendar, birth-time confidence check, rising-sign preference

**Added**

- **`/current-sky/calendar/`** — a month grid on desktop, an agenda list below 768px, over the same 55 verified events the timeline already carries. Filters derive from the event types actually present (four of the six the schema allows), month navigation has a jump-to-month picker, and `?m=YYYY-MM` deep-links. Every month is server-rendered and visible; the single-month view is applied by an inline bootstrap, so without JavaScript the page is a complete stacked calendar rather than an empty one. Carries **no summary text**, so the overlap with `/current-sky/` is titles and dates and there is no duplicated prose — both pages stay self-canonical.
- **The Birth Time Confidence check** on `/birth-time-toolkit/#confidence-check` — three questions returning one of the **five labels the toolkit already publishes** (Documented / Strongly remembered / Approximate / Conflicting / Unknown), verbatim from worksheet §5. Each result gives what the evidence suggests, what is still uncertain, one next step, the matching worksheet section, whether a reading is still possible (always yes, with stated limits) and the sentence to send Mo. All five panels are server-rendered, so `internal-link-check.mjs` sees every link the tool can produce.
- **A rising-sign display preference** — one key, `ml-rising-v1`, holding one word from a list of twelve. It moves the reader's card to the front of the twelve already shown on every lunation and eclipse page, and drives a new `/horoscopes/` module showing the next three lunations with the house each falls in for every sign. Derived entirely from the whole-sign arithmetic already in `lunation-guidance.ts`.
- Three test scripts — `test:calendar` (36), `test:birthtime` (36), `test:rising` (43) — all wired into CI.

**Changed**

- `privacy.md` now names both browser-stored items instead of one. The previous sentence ("One small item is stored in your browser either way") became false the moment a second key existed. **Approved by Shane on 2026-08-08**, on condition the wording state explicitly that the preference is not transmitted as birth data and is not used to identify the visitor — see the follow-up entry above for the two paragraphs that were added to meet it. `updatedDate` bumped to 2026-08-08; `reviewStatus` remains `owner-approved`.
- Worksheet headings gained `id` attributes so results can deep-link to a section rather than to the top of a thirteen-page document.
- `/horoscopes/` gained real rising-sign content; it previously promised guidance for all twelve signs and showed eight cards of titles and dates.
- Reading Finder's `approx` and `no` birth-time branches link to the confidence check. **One direction only** — the check never recommends a reading, because that is the finder's job and two tools answering the same question differently is worse than either alone.
- Calendar linked from the homepage sky band, the footer's Writing column and the archive, so it is not a one-inbound-link orphan.

**Fixed, found by the checks rather than by eye**

- **`explore-your-chart.astro` and `current-sky/index.astro` called `window.gtag` directly**, bypassing `mlTrack`'s sanitiser — the exact violation `DECISIONS.md` records, and three events (`chart_explorer_start`, `chart_explorer_interaction`, `current_sky_filter`) were firing outside it. Moved to `mlTrack`.
- **The confidence tool scrolled every visitor past the hero on load.** Its first render focused the first radio, and focusing scrolls. `check:hero-contrast` caught it by reporting the h1 at 1.00:1 — the heading was at `y=-94` by the time the page settled. Focus now moves only when the reader acts.
- **The WCAG 2.2 target-size rule stopped at `h3`.** `/horoscopes/` nests sign cards one level deeper (section h2 → lunation h3 → sign h4), which is the correct heading order and therefore the one the rule did not reach; 36 links went back under 24px. Extended to h4–h6.

**Decisions worth keeping**

- **Retrograde spans mark the start day only.** Ten events carry an `end`, all retrogrades — and a station-direct is *also* published as its own event, so a continuous bar would render it twice. The span is carried as text on the entry ("October 24 – November 13") instead.
- **The calendar is UTC everywhere.** Events are date-only strings parsed as UTC midnight and every existing render path formats them with `timeZone: 'UTC'`. A browser-timezone conversion has nothing to be more accurate about — there are no clock times — so it would introduce error, not remove it. The only local value is which day is "today", compared as a `YYYY-MM-DD` string.
- **Calendar window capped at 24 months** ending at the last published event. The full record runs to November 2024, but the two pre-2026 events sit beyond a seventeen-month gap; rendering the whole span meant seventeen empty grids and 1,596 cells. The archive remains the complete record and is linked.
- **A fourth confidence question was built and removed.** It asked "have you actually seen the document?" to gate the *Documented* label — but the first question's options already draw that distinction, and being conditional it made the counter read "1 of 3" then "2 of 4", which is the behaviour the Reading Finder's own notes call out as reading like a trick.
- **No new structured data.** `Event` schema describes something with a location and an organiser that a person attends; an eclipse is not one, and every sky event already carries `Article` on its own page.
- **No CMS fields for any of the three.** Nothing here is an editorial decision Mo should be making: the sign list is arithmetic, the calendar reads fields that are already CMS-editable, and the confidence copy must stay in step with `/birth-time/`, the worksheets and the PDF.

**Validated**

- Astro check 0 errors. Build 174 pages.
- Content integrity 0 errors, 0 warnings. Horizon 506 days.
- Internal links 174 files, 0 failures.
- axe **0 violations across 25 pages × 2 viewports** (was 20 pages), including target size.
- Hero contrast 172 pages discovered, 0 failures. `check:contrast` 13/13 including five new calendar pairings.
- Booking 18/18. Finder 11/11. Calendar 36/36. Birth Time 36/36 (all 125 answer combinations). Rising 43/43.
- Audit: 0 duplicate titles or descriptions, 0 thin, 0 orphans, 0 heading skips, 0 missing alt.

**Not done, with reasons**

- **Kit's embed script throws in storage-denied browsers.** `f.convertkit.com/ckjs/ck.5.js` responds to unavailable storage by attempting `window.localStorage = …`, which throws because the property has only a getter. Third-party, pre-dates this work, nothing here can fix it. `test:rising` filters third-party frames so it asserts our own code degrades quietly rather than swallowing everything.
- **`src/content/explore/` is declared in `content.config.ts` and mapped in `.pages.yml` but does not exist on disk.** The Pages CMS "Astrology reference library" editor points at a missing path. Pre-existing; not touched here.
- No `.pa11yci` config exists, so `npm run test:a11y` has nothing to run. `audit:a11y` is the live gate. **Resolved in the follow-up below.**

### 2026-08-08 — Birth-time funnel split into two layers

**Added**

- `/birth-time/` — the public, ungated, evergreen resource. The page built to rank, holding nothing back. Answers "how accurate does it need to be?" with the real answer (depends on proximity to a cusp or angle) rather than the widely repeated "four minutes changes everything", and treats vital-records process as jurisdiction-dependent rather than describing one country as universal.
- `/birth-time-toolkit/worksheets/` — the toolkit: eight sections including a record search checklist, two family interview sheets, a competing-times comparison table, a five-label confidence scale, and a reading preparation summary. `noindex`, so it does not compete with `/birth-time/` for the same queries.
- 13-page PDF generated from the worksheets page by `npm run toolkit:pdf`, so the download cannot drift from the site.

**Changed**

- `/birth-time-toolkit/` is now a landing page for the worksheets rather than the guide itself, and says openly that the information is free on `/birth-time/`. What is exchanged is the format, not access.
- Contextual links added where the question arises: the Big Three callout, the angles page (beside its own four-minute claim, now with the nuance), birth chart basics, both birth-time blog posts, prepare, resources, guides, newsletter.
- Mo-facing docs: adding a YouTube video, editing a service FAQ, replacing the toolkit PDF, and why the birth-time pages are not in Pages CMS.

**Not done, with reasons**

- **Birth-time pages are not Pages CMS-editable.** The worksheets are printable forms — ruled lines, checkboxes, comparison tables — and exposing that structure as editable fields is exactly the fragile-technical-field case the CMS rules exclude. The article body is a fair candidate for extraction into a content collection, but it carries hand-placed inline links and schema passages that must stay in step with the prose, so it needs its own verification pass rather than being rushed. The existing `guides` collection is a catalogue schema (name/status/file) and not a fit.
- Testimonial surfacing, Courses/Guides de-emphasis and the service-FAQ architecture were not reached in this pass.

**Validated**

- Astro check 0 errors. Build 173 pages.
- Content integrity 0 errors, 0 warnings. Horizon 507 days.
- Internal links 173 files, 0 failures.
- axe 0 violations across 20 pages x 2 viewports, including the target-size check.
- Hero contrast 171 pages discovered, 0 failures. `check:contrast` 8/8.
- Booking 18/18. Finder 11/11. Audit clean: 0 duplicate titles, 0 thin, 0 orphans.

### 2026-08-07 (later) — Video architecture, Birth Time Toolkit, CSP and target size

**Added**

- `src/components/YouTubeFacade.astro` — click-to-load player that requests **nothing** from Google until the play button is pressed, including the poster. The conventional facade uses an `i.ytimg.com` still, which is Google infrastructure, so the visitor's IP reaches Google on load anyway; `/privacy/` says video players "load only when you interact with them", and that has to be true. Uses the uploaded thumbnail or a branded CSS placeholder.
- **The Birth Time Toolkit** at `/birth-time-toolkit/` — the first rung below $150. Free to read in full; the PDF is what arrives by email. Assembled from the two existing birth-time blog posts and `/prepare-for-your-reading/` rather than authored fresh, so it cannot contradict them. FAQPage + Article schema on five genuinely-asked questions.
- `scripts/gen-toolkit-pdf.mjs` (`npm run toolkit:pdf`) — renders the real page to `public/downloads/birth-time-toolkit.pdf` so the download cannot drift from the web version. Manual, like `og:generate`, because Playwright is a `--no-save` audit dependency.
- Print stylesheet in `global.css`, used by readers and by the PDF generator.
- `Content-Security-Policy-Report-Only` in `public/_headers`, with origins read off the built output rather than guessed — including the two Kit hosts the embed pulls in at runtime.
- Target-size checking in `scripts/axe-sweep.mjs`. axe cannot test SC 2.5.8, because the criterion turns on whether a link sits inside a sentence.

**Changed**

- `/videos/` moved onto the shared facade; its bespoke copy built the iframe by string concatenation and omitted fullscreen and captions. Empty state now points at the real YouTube channel. `VideoObject` per real published video, from fields the collection already requires.
- Welcome video centralized: `welcomeVideoId` in `site.ts`. `/about/` renders it above the credentials; nothing renders while it is blank. `VideoObject` additionally waits for a real `uploadDate` rather than inventing one.
- `/guides/` and `/newsletter/` stopped promising "Reading the Road Ahead" as the headline. `/guides/` had listed "a birth-time hunting checklist" under consideration — that is the one that got written, so it leads now, and the unwritten guide is named as an intention with no date attached.
- 36 standalone links were under 24px at 390px. Fixed with `padding-block`, which extends an inline element's hit region without touching the line box. Links inside prose deliberately untouched.
- `/images/*` cache 1 day → 30 days with a week of stale-while-revalidate (~193KB of repeat-visit waste). `/downloads/*` keeps the shorter window, because a PDF Mo corrects should not be stale for a month.

**Reverted, with the measurement**

- An LCP `<link rel="preload">` for the homepage hero. Measured on one machine: **without** preload mobile P:94 / LCP 3.0s, **with** preload mobile P:93 / LCP 3.2s. It did not help. The reasoning is kept in `BaseLayout.astro` so nobody rebuilds it.

**Validated**

- Astro check 0 errors, 34 hints. Build 171 pages.
- axe **0 violations** across 20 pages × 2 viewports, now including target size (was 52 target-size failures when the check was first added, including one false positive of its own — a link wrapped in `<strong>` mid-sentence — which the detector now climbs past).
- Hero contrast: **170 pages discovered**, 0 failures.
- Content integrity 0 errors, 0 warnings. Horizon 507 days.
- Links 171 files, 0 failures. Booking 18/18. Finder 11/11. Contrast 8/8.
- Lighthouse: every page 98–100 mobile except the homepage at 94; desktop 99–100. CLS 0 everywhere.
- Facade verified in-browser: 0 Google requests before click, 16:9 held, document height unchanged after activation, focus moves into the player.

**Known, measured, not fixed**

- Homepage mobile LCP ~3.0s against 1.7–2.3s everywhere else. Next thing to try is viewport-based hero background variants; the 640/960/1280 copies already exist.
- Lighthouse Best Practices is 77 on every page. Worth re-checking now that the Kit `mailto:` is gone — the cause may have changed.

**Still not done**

- Per-service FAQ architecture (needs Mo's answers to be worth building).
- Testimonial surfacing into the shared CTA band.
- Inline-style consolidation beyond what was touched in passing.



### 2026-08-07 — Analytics, consent, booking conversion and the 2027 sky window

**Changed**

- GA4 measurement ID configured (`G-64N9EPKNTR`, defaulted in `src/config/site.ts`). Analytics had never run: the ID was empty, the gtag block sits behind an `ga4Id &&` guard, and the deploy workflow passes no env — so 130 pages shipped with no measurement while every check stayed green.
- Google Consent Mode v2 with a first-party consent banner. Everything denied by default; no cookie is written until a visitor agrees. Reopenable from the footer on every page.
- Removed `anonymize_ip` (a Universal Analytics parameter, inert in GA4) and replaced it with `allow_google_signals: false` and `allow_ad_personalization_signals: false`, which take effect.
- `window.mlTrack` is now the single analytics entry point, with a sanitiser that drops anything resembling an email, date or time before it can reach GA. All call sites migrated; the Reading Finder's four events fire for the first time.
- `booking_cta_click` added as one delegated listener rather than per-page wiring.
- Mobile header exposes a Book action at every width (was `display: none` below 479px). Label shortens to "Book"; `aria-label` keeps the full accessible name.
- `/readings/` cards, compare cards and table rows deep-link to `/book/?service=<bookingEventId>`; cards now show price.
- `/book/` collapses the returning-clients group on phones. Availability moved from 2,368px to 1,503px. Deep links into that group open it.
- Published 40 researched 2027 Current Sky events. Horizon 139 → 507 days.
- Current Sky horizon validation added to `content-integrity.mjs`: fails under 90 days, warns under 365.
- `/horoscopes/` split into "Coming up" and "Recent lunation letters", both filtered on today. It previously headed six future lunations as "recent".
- Sky-event page titles now carry month and year, resolving ten duplicate titles caused by annually repeating event names.
- `Service` schema gained `url`; `Offer` gained the deep-linked booking URL; multi-price readings emit `AggregateOffer` instead of a single price contradicting the visible page.
- `privacy.md` named MailerLite as the newsletter processor. Corrected to Kit, with Google Analytics added and the analytics/cookie sections rewritten to describe what the site actually does.
- Fixed stale copy: an owner note rendering in `<main>` on `/readings/gift/`, third-person voice on the same page, and "Three questions" on `/resources/` and `/readings/` for a five-question finder.

**Fixed**

- `scripts/content-integrity.mjs` reported 45 false errors on any CRLF checkout. In JavaScript `.` excludes line terminators and `\r` is one, so no frontmatter line parsed and `frontmatter()` returned `{}` for every file — which also silently disabled the draft skip. CI on Linux passed the same commit. This repo sets `core.autocrlf=true`, so it affected every Windows working copy including the owner's.
- `scripts/check-hero-contrast.mjs`: three defects. No exclusion for fixed bottom overlays (the consent banner produced ten false failures at 1.00–1.15:1); `.seabreak--quote` mislabelled as "hero"; and its `.seabreak__line` text missing from the sampled selector, so the site's one sea break had never been measured. It reads 7.94:1 desktop / 6.19:1 mobile. An unmeasurable block now fails instead of printing a note inside a run that ends "Every hero passes".

**Validated**

- Astro check 0 errors. Build 170 pages.
- Content integrity 0 errors, 0 warnings. Horizon 507 days.
- Internal links 170 files, 0 failures.
- axe 0 violations across 20 pages × 2 viewports.
- `check:contrast` 8/8. `check:hero-contrast` 129 pages discovered, 0 failures.
- Booking 18/18. Reading Finder 11/11.
- `audit.mjs` clean on 12 checks: 0 duplicate titles or descriptions, 0 thin, 0 orphans, 0 missing alt, 0 heading skips.
- Consent verified in-browser: pre-consent zero cookies and `gcs=G100`; post-accept `_ga` written and consent update pushed; decline stores the choice and writes nothing.
- Kit verified in-browser: one script tag across two hosts on a page, second host falls back to `/newsletter/`, no console errors, no failed requests.

**Deferred**

- Staging noindex / search-engine protection — deferred by owner. Not implemented.

**Not completed this pass**

- YouTube facade component, `/videos/` hub rebuild and welcome-video slot.
- Birth Time Toolkit lead magnet.
- CSP report-only, hero/LCP preload, WCAG 2.2 target-size sweep, testimonial surfacing, courses/guides de-emphasis, per-service FAQ architecture.



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
