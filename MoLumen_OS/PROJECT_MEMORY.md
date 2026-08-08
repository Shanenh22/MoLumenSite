# Project Memory

## Current known state
- GA4 is live and verified in-browser: measurement ID `G-64N9EPKNTR`, defaulted in `src/config/site.ts` because the deploy workflow passes no env and a missing value fails silently.
- Consent Mode v2 is in place with a first-party banner. Nothing is stored until a visitor agrees; a refusal still yields cookieless page counts.
- `window.mlTrack` is the only analytics entry point. It sanitises anything resembling an email, date or time. Never call `gtag` directly from a component.
- Current Sky is published through 2027-12-27 (507 days of horizon). `test:content` fails under 90 days and warns under 365.
- GA4 account created.
- GBP created; verification pending.
- Stripe registered for booking.
- Cal.com practising name changed to Mo Lumen.
- Kit is the newsletter platform and the repository now uses the owner-supplied Kit embed instead of MailerLite.
- YouTube channel: https://www.youtube.com/@MoLumenAstrology
- 60-second welcome video planned.
- Pages CMS connected to the repository and configured through root `.pages.yml`.
- Pages CMS is the primary routine publishing interface for Mo.
- CMS-editable areas are Blog, Current Sky, Videos, existing Readings/services, FAQs, Glossary and Testimonials.
- The `/explore/` reference library is **not** CMS-editable and never was. A collection and a Pages CMS editor were configured for it, but `src/content/explore/` never existed, so the editor opened empty and the build warned. Both were removed on 2026-08-08. The pages are 25 hand-written `.astro` files; migrating them to markdown is a backlog task with its own verification pass, and the CMS block goes back only in the change that creates the content.
- Blog, Current Sky and Videos have draft-safe publishing behavior.
- Pages CMS includes a one-click repository quality-check action with MoLumen content-integrity validation.
- Pull requests have automated build/type/content/link/booking/Reading Finder validation.
- Dependabot and CodeQL repository security monitoring are configured.
- A scheduled repository-health workflow checks the staging site and key external integration endpoints.
- Cloudflare deploys use an explicitly pinned Wrangler release.
- Claude Code now has dedicated `molumen-integrations` and `molumen-release-manager` skills in addition to Developer, Editor, Strategist and Publisher.

## Current phase
YouTube facade/video hub and welcome-video slot, Birth Time Toolkit, and the
remaining audit fixes (CSP report-only, hero/LCP preload, WCAG 2.2 target size,
testimonial surfacing, courses/guides de-emphasis, per-service FAQs).

GA4/event instrumentation, booking conversion and the 2027 Current Sky window
are done — see the 2026-08-07 changelog entry.

## Interactive tools (added 2026-08-08)
- `/current-sky/calendar/` is a second view over the same 55 events, not a second dataset. It carries no summaries, so it does not compete with the timeline.
- The Birth Time Confidence check lives on `/birth-time-toolkit/#confidence-check` and returns the toolkit's own five labels. Result copy is in `src/lib/birth-time-confidence.ts`; if it changes, `/birth-time/`, the worksheets and the PDF have to agree.
- `ml-rising-v1` is the second and only other localStorage key besides `ml-consent-v1`. One word from a list of twelve. Adding a third key means editing `privacy.md` again.
- Three new gates: `test:calendar`, `test:birthtime`, `test:rising`. All in CI.

## Booking funnel (2026-08-08)
- `src/config/booking.ts` is the single source of truth for two things that used to be
  decided by accident: `DEFAULT_BOOKING_EVENT` (what a bare `/book/` opens on — natal-90)
  and `READING_ORDER` (the order readings appear everywhere). Both are asserted by
  `test:content`; `book.astro` throws at build time on an invalid default.
- `bookingActions()` / `primaryBookingAction()` are the only way to build a `/book/?service=`
  link. Six surfaces call them. Do not hand-write a booking href — that is exactly how the
  hero and the CTA band on `/readings/want-more-clarity/` came to quote different prices.
- `booking_complete` fires from Cal.com's `bookingSuccessfulV2`. **The callback payload is
  never read.** It contains name, email, phone, booking UID, appointment time and whatever
  birth data the client typed into the notes. The service key comes from the checked radio.
- Five of seven readings are `audience: "established"`. Only natal and relationship are
  bookable by a first-time visitor. Any surface listing readings has to say so.

## Traps worth not rediscovering
- **A green test suite can be blind to the default state.** `test:booking` was 18/18 while a
  bare `/book/` opened on the $275 two-person reading, because the suite checked the
  `natal-90` radio itself before asserting anything. It now asserts the untouched default
  first. When a test sets up the state it is measuring, it is measuring the setup.
- **The in-app browser applies mobile emulation *after* the page's modules run.** The
  `/book/` follow-up collapse reported as broken on some loads and working on others, purely
  from that. Anything gated on `matchMedia` at load must be asserted under a real Playwright
  viewport, which is set before navigation — not eyeballed in the preview pane.
- **PowerShell eats `stash@{0}`.** It brace-expands, and `git stash pop` without a ref can
  then apply only part of the entry. Use the Bash tool with the ref quoted for any stash
  operation, and check `git stash list` is empty afterwards.
- **CRLF and `.`** — in JavaScript `.` excludes line terminators including `\r`,
  so `(.*)$` never matches a line on a CRLF checkout. This silently broke the
  whole content-integrity validator on Windows while CI passed. Normalise line
  endings before parsing anything.
- **Focusing an element scrolls it into view.** A step-form's initial render that
  focuses its first input will throw every visitor down the page to wherever the
  form sits. On `/birth-time-toolkit/` this scrolled past the hero and the
  contents list, and the symptom that surfaced it was `check:hero-contrast`
  reporting the h1 at 1.00:1 — because the heading was above the viewport by the
  time the page settled. Move focus when the reader acts, not on load.
- **A hand-maintained selector list stops applying the moment markup nests
  deeper.** The WCAG target-size rule covered `h2`/`h3` heading links; a new
  module with correct heading order (h2 → h3 → h4) put 36 links back under 24px.
  The list is keyed on depth rather than on what the element is for.
- **Inline scripts are template literals.** `set:html={` … `}` cannot contain a
  backtick anywhere, including inside a comment — one closes the string and the
  rest parses as code. And `<script is:inline>{` … `}</script>` emits the braces
  and backticks literally, producing a script that is valid JavaScript and does
  nothing. Both failed silently; verify inline-script behaviour in a browser,
  never by confirming the markup shipped.

## Publishing guardrail
Keep `.pages.yml`, Astro content schemas and the Pages CMS-facing file structure synchronized whenever content architecture changes.

Homepage/About structural copy remains developer/Claude-assisted for now because it is tightly coupled to conversion layout, credentials and other verified business claims. Revisit only if frequent owner editing justifies extracting selected fields.

## Deferred by owner
- Do not change staging indexing/noindex behavior yet. Revisit before production cutover.

## End-of-session update
Record:
- date
- completed
- verified
- pending external actions
- blockers
- next highest-value task
