# Session handoff

Written 2026-08-04. Read this first if you are picking this repo up in a new session.

Everything below is context that existed only in a conversation and would otherwise be lost. The
code is in git; the _reasons_ are here.

## The hard rules, restated

These came from the owner's brief and are not negotiable. Breaking any of them is worse than
shipping nothing.

- **Do not invent** biographical facts, credentials, memberships, prices, policies, testimonials,
  experience, qualifications, or client outcomes.
- **Do not create new reading services.** Only services that exist on molumen.com or were supplied
  directly by the owner.
- **No artificial portraits of Mo.** Do not generate or depict an invented person as Mo.
- **No AggregateRating or Review schema** unless the reviews are genuine and attributed.
- **Never claim** perfect accessibility, legal compliance, or guaranteed search rankings.
- **No birth data** stored in the repo, analytics, localStorage, or URL parameters.
- **Never commit secrets.**
- **Do not deploy over the live molumen.com** until staging is reviewed and approved.

The nine testimonials in `src/content/testimonials/testimonials.json` are real client words,
confirmed by Shane on 2026-08-04. Three earlier sets were declined or withdrawn before that. Do not
add, edit, or embellish a testimonial. The FTC Consumer Reviews and Testimonials Rule (effective
21 Oct 2024) makes fabricated testimonials illegal, with civil penalties, and it applies to
one-person businesses.

## Where things are

- Repo: `github.com/Shanenh22/MoLumenSite`, branch `main`
- Staging: `https://molumen.shanenh.workers.dev/`
- Production: molumen.com still serves the old Squarespace site. Nothing here is live yet.
- Deploy: GitHub Actions (`.github/workflows/`) → Cloudflare Workers static assets. Cloudflare's own
  Workers Builds was abandoned after it failed repeatedly; do not go back to it.

## Traps that already cost time

**Wrangler 3 silently ignores the `assets` block in `wrangler.jsonc`.** It does not error. It
deploys an empty Worker over a working site. `wrangler@4` is pinned deliberately — do not relax it.

**A PAT cannot write `.github/workflows/` without the `workflow` scope.** GitHub rejects the push
with a confusing message. Shane added those files through the web UI.

**`npm ci` fails hard on a package.json / package-lock.json mismatch.** If you touch dependencies,
regenerate the lockfile in the same commit.

**Prettier rewrites quotes on format.** Any scripted find-and-replace against source files must be
re-verified after `npm run format`, because the string you matched may no longer exist. This broke
edits twice.

**`npm install --no-save X` prunes the other `--no-save` packages.** The audit tools must be
installed together: `npm run audit:install`.

**Cal.com's `embed.js` does not define `window.Cal`.** You must create the queue stub first. The
official loader snippet is in `src/components/BookingEmbed.astro` — leave it alone.

**Absolutely-positioned children resolve against the nearest _positioned_ ancestor.** Making
`.hero--split .container` positioned shrinks the hero photo to the container box instead of letting
it fill the band. There is a comment in `global.css` saying so. It is not an oversight.

**CSS source order decides ties.** The mobile hero scrim override lives at the _end_ of
`global.css` on purpose, with a comment. Moving it up loses it to a later equal-specificity rule.

**The `hidden` attribute does not hide anything a component has given a `display` to.** Browsers
implement it as `[hidden] { display: none }` in the _user-agent_ stylesheet, and any author rule
setting `display` on the same element beats it — author styles win over UA styles regardless of
specificity. `.card { display: flex }` therefore silently defeated `card.hidden = true`, and the
blog category filter set the attribute on ten of thirteen posts while all thirteen stayed on
screen. Its `aria-live` status even announced "3 posts shown" to screen readers, which was worse
than the visual bug. Every `hidden` toggle in the codebase had it: the blog filter, the video
filter, the Current Sky event filter, and the Reading Finder's Back/Restart buttons
(`.btn { display: inline-flex }`), which showed on step one. Fixed once, globally, with
`[hidden] { display: none !important }` near the top of `global.css`. The `!important` is
load-bearing — it is what makes the rule immune to source order and to whatever `display` any
future component sets. Do not remove it, and do not "fix" a filter by reaching for a `.is-hidden`
class instead; `hidden` is the accessible primitive and it now works.

**axe cannot evaluate contrast of text over a photograph.** It reported zero violations while nine
of ten heroes were failing on mobile, one at 2.28:1. That is what
`npm run check:hero-contrast` exists for — it pixel-samples the worst case behind the text.
**Run it after any hero image or scrim change.** It is the single most valuable script here.

**A lazy-loaded image is not on screen when you screenshot it.** The same script reported the new
interlude bands at 15:1 for a while, because `loading="lazy"` means scrolling to a band only starts
its fetch. It was measuring an empty band. It now waits for load and decode — but the general lesson
is that a green check on a photograph you never confirmed was painted is worth nothing. Three
different images reporting an identical worst pixel is the tell.

## Verification tools

Run `npm run audit:install` first (installs lighthouse, playwright, pngjs without saving).

| Command                       | What it catches                                       |
| ----------------------------- | ----------------------------------------------------- |
| `npm run check`               | TypeScript / Astro errors                             |
| `npm run audit`               | structure, SEO, link graph, title/description lengths |
| `npm run audit:a11y`          | axe, 20 pages × 2 viewports                           |
| `npm run check:hero-contrast` | **text over photos** — the one axe cannot do          |
| `npm run check:contrast`      | computed ratios for chips and prices, with numbers    |
| `npm run measure:heroes`      | hero height as % of the fold, 30 pages                |
| `npm run test:booking`        | 18 assertions on the Cal.com embed                    |
| `npm run test:finder`         | 11 Reading Finder → /book/ handoff cases              |
| `npm run audit:lh`            | Lighthouse                                            |
| `npm run shot /book/ /about/` | full-page screenshots into `shots/`                   |
| `npm run images:variants`     | rebuilds the responsive copies of every band image    |

**These scripts now run on Windows and macOS, not only in the Linux container.** Every one of them
used to hard-code `executablePath: "/opt/pw-browsers/chromium"`, so on any other machine the entire
suite died at browser launch before asserting anything. They share
`scripts/lib/chromium-path.mjs` instead. Read the comment in that file before changing it — the
short version is that handing Playwright an explicit path to its _own_ default browser fails on
Windows with `spawn UNKNOWN`, while passing nothing at all works on the identical binary.

Last known-good state at commit `b420aa5` (`main`): 129 pages, `astro check` 0 errors, audit clean on
13 checks, axe 0 violations, every hero and interlude band above 4.5:1 at its worst pixel — 32 blocks
× 2 viewports, worst 5.75:1 — `check:contrast` all pass, booking 18/18, finder 11/11. Lighthouse was
not re-run on this machine; the last figures are 97–100 mobile / 100 desktop, CLS 0, from `74826a3`.

Previous known-good was `74826a3`, measured in the Linux container: same suite, worst block 6.42:1.
Before that, `83e5dd5`, where the worst desktop hero was 4.60:1.

**A number in this file is only comparable to another number measured the same way.** The responsive
image pass below re-ran `check:hero-contrast` on Windows and got a worst block of **5.75:1** where
the container had reported 6.42:1. Nothing regressed: the same build measured with and without
srcset produced an identical 5.75:1 minimum across all 64 block/viewport pairs. Chromium build and
font rasterisation differ between machines, and the sampler reads pixels behind _rendered glyph
boxes_, so the box moves a little. If you see a figure here you cannot reproduce, measure the
before-state on your own machine before concluding anything broke.

## Vocabulary drift — the bug that will come back

The Reading Finder emits **service slugs**. The booking page radios are keyed by **Cal.com event
keys**. They are not the same vocabulary and they drifted apart once multi-price readings became
separate rows — `want-more-clarity` was selecting a $200 natal-90. `src/pages/book.astro` emits a
`serviceToEvent` map to bridge them, and `npm run test:finder` asserts every path. If you add a
service or a Cal.com event, update the map and run that test.

## Design decisions the owner made, not me

- No dome/arch frame on images. It was my addition; Shane removed it.
- No clamped ledes. "Reads as broken."
- Mo's portraits do not go in hero bands under a scrim. They go in the page body, in
  `.portrait-card`.
- Homepage has no testimonials section.

## Open, blocked on the owner

- Mo confirming testimonial attributions before production launch
- Stripe app install in Cal.com
- DFW service-area / address decision for `LocalBusiness` schema
- Attorney review of the five legal documents — three clauses flagged in `docs/legal-review-status.md`
- Four terms I chose rather than Mo: 12-month credit validity, 15-minute late grace, 5–10 business
  day refunds, liability cap
- Mo reading the 13 blog posts published under her byline
- Video IDs for `/videos/` — 338 words, the only thin page on the site
- GSC and Bing verification tokens → `src/config/site.ts`
- Revoke the old GitHub tokens

## Open, code work

- ~~In progress: ocean imagery.~~ **Done 2026-08-04** — see "Ocean imagery, as shipped" below.
- Deferred audit items 7 and 8: question-format headings on the 13 sign pages; visible source
  citations across the reference library — **0 of 129 pages currently cite a source**.
- `docs/organic-growth-plan.md` ranks the next pages by impact ÷ effort.

## Provenance note on the ocean images — read before using them

All 16 arrived as identical 1536×1024 files. That uniformity, and their subject matter, is
consistent with stock or generated imagery rather than photographs Mo took. This matters because
the site's whole position is that it does not fake things.

Constraints that follow:

- Alt text must describe what is in the frame. It must not imply Mo took the picture, that it is a
  particular place she goes, or that it depicts her.
- **Superseded in part — see "Ocean imagery, as shipped" at the end of this file.**
  `ocean-waterline.webp` is held back entirely and is not registered, and `ocean-releasing-water.webp`
  (a pair of cupped hands, which this note missed) is held back too.
- `ocean-waterline.webp` and `ocean-floating-in-trust.webp` contain a woman. In both she is
  unidentifiable — turned away in one, a distant aerial speck in the other — so neither reads as a
  portrait, which is what makes them usable at all. They still must never be captioned, framed, or
  placed so a reader would take the figure for Mo. Never use either on `/about/` or `/credentials/`.
- Do not add photo credits or location captions that were not supplied.
- Confirm with Shane that Mo is comfortable publishing these as decorative imagery.

## Ocean imagery, as shipped (2026-08-04)

### What the actual problem was

The brief was "the internal pages feel bland next to the homepage." The cause was not missing
imagery. Every inner page already had a photographic hero. The cause was that **23 scene images
were serving 44 pages** — `chart-detail.webp` was the hero on six of them, `birth-chart-basics.webp`
on four — and the hero was the _only_ image on the page, so everything below the fold was an
unbroken text column while the homepage alternated bands. Four sibling reference pages looked like
the same page.

So the fix was two things, not one: spend the ocean images on de-duplicating heroes, and add a
mid-page band so long pages have a visual beat.

### Scope

`/explore/**` plus `/start-here/`. Deliberately not the funnel (`/readings/`, `/book/`,
`/reading-finder/`, `/about/`, `/approach/`, `/credentials/`) — those pages have passing booking and
finder tests and there was no reason to put imagery risk near them for a cosmetic win. If you extend
this to the funnel, re-run `test:booking` and `test:finder` as well as the contrast checks.

### 14 of 16 images are registered, not 16

`ocean-waterline.webp` and `ocean-releasing-water.webp` are **not** in `src/config/images.ts` and
should not be added without asking Shane again. Reasoning, because it will look like an oversight
otherwise:

- `ocean-waterline.webp` is a woman in a white dress standing in the surf. The earlier handoff note
  described her as unidentifiable because she is turned away. Having looked at the frame: she is a
  large, central, clearly-rendered figure, not a distant speck. On an astrologer's site a lone woman
  by the sea gets read as the astrologer whichever way she faces, and that is exactly the inference
  the no-invented-portraits rule exists to prevent.
- `ocean-releasing-water.webp` is a close-up of a pair of cupped hands. The earlier note did not
  flag it at all — it only mentioned the two images with a whole person. Hands are the same problem
  in miniature: on `/prepare-for-your-reading/` or `/approach/` they would read as Mo's hands.

`ocean-floating-in-trust.webp` **is** used, on `/explore/personal-purpose/`, and its crop is tuned
to `object-position: center 22%` — which frames the sunset and puts the distant swimmer outside the
visible band entirely.

### Hero assignments

| Page                           | was                              | now                                              |
| ------------------------------ | -------------------------------- | ------------------------------------------------ |
| `/start-here/`                 | birth-chart-basics (1 of 4 uses) | ocean-dawn-wave                                  |
| `/explore/`                    | birth-chart-basics               | ocean-light-rays                                 |
| `/explore/angles/`             | birth-chart-basics               | ocean-cliffs-sea-fog _(mirrored)_                |
| `/explore/the-big-three/`      | birth-chart-basics               | ocean-ripples-sunset                             |
| `/explore/birth-chart-basics/` | chart-detail (1 of 6)            | birth-chart-basics — its namesake, now used once |
| `/explore/transits/`           | current-transits                 | ocean-currents                                   |
| `/explore/retrogrades/`        | current-transits                 | ocean-glass-wave                                 |
| `/explore/moon-phases/`        | monthly-transits                 | ocean-sea-stack-moonrise                         |
| `/explore/eclipses/`           | current-sky-wide                 | ocean-light-breaking-storm                       |
| `/explore/lunar-nodes/`        | chart-detail                     | ocean-whale-tail-stars _(crop 76%)_              |
| `/explore/saturn-return/`      | dusk-mountains                   | ocean-solitary-buoy _(mirrored)_                 |
| `/explore/house-systems/`      | houses-library                   | ocean-coral-reef-blue-hour                       |
| `/explore/chart-patterns/`     | aspects-library                  | ocean-shells-before-tide                         |
| `/explore/personal-purpose/`   | dusk-mountains                   | ocean-floating-in-trust _(crop 22%)_             |
| `/explore/schools/`            | approach-philosophy              | ocean-meeting-waves                              |

Images are matched to the page's subject where the metaphor is real — currents for transits, a
moonrise for moon phases, a shell spiral for chart patterns, a reef split at the waterline for house
systems. No image is used more than twice site-wide, and no page shows the same image twice.

### The new `<Interlude>` band

`src/components/Interlude.astro` + `.interlude` in `global.css`. A full-bleed image band with a
centred line, placed mid-page on six pages: `/start-here/`, `/explore/transits/`,
`/explore/moon-phases/`, `/explore/misconceptions/`, `/explore/dignities/`,
`/explore/questions-to-bring/`.

Two rules about it:

1. **Its scrim is uniform, not directional.** `.hero--split` uses a `100deg` gradient because its
   text sits in a left column — which is precisely why it needed a separate mobile override once
   that column went full-width. Interlude text is centred at every width, so a vertical scrim means
   there is no breakpoint at which the text drifts into a lighter stop. Floor alpha is 0.72, which
   composites to 5.9:1 against a _pure white_ pixel. That headroom is the point. Do not trade it
   away to make a photograph read more clearly — change the image instead.
2. **Every line in a band is drawn from copy already on that page.** They are pull-quotes, not new
   claims. If you add a band, distil a sentence the page already makes.

### Two things that had to change underneath

**The `.hero--split` desktop scrim was strengthened, and it was not cosmetic.** The old ramp
(0.9 at 40%, 0.52 at 66%) interpolated to about 0.58 alpha at the 62% mark where the h1 and lede
boxes end. That was fine for muted studio photographs and failed immediately on brighter imagery:
`/explore/schools/` measured **4.12:1** with ocean-meeting-waves behind it, and `/explore/eclipses/`
sat on exactly 4.50. The new ramp holds 0.8 out to 62% before falling off. Side effect worth
knowing: this lifted _every_ existing hero too — the site's worst desktop hero went from 4.60:1
(`/blog/`) to 8.12:1. The arithmetic is in a comment above the rule.

**`check:hero-contrast` was measuring ten pages and is now measuring twenty-six, plus every
interlude band.** Three fixes went into that script, and the second one is the cautionary tale:

- The page list was hard-coded and did not include a single page this work touched.
- It sampled one `.hero--split` per page. It now walks every `.hero--split, .interlude`.
- **It initially reported the interlude bands at 15:1 — because the band's image is `loading="lazy"`,
  scrolling to it only _starts_ the fetch, and the screenshot caught a band with no photograph in it
  at all.** Three different images reported an identical worst pixel, which is what gave it away. It
  now waits for every image in the block to load and decode before sampling. A check that passes
  because it is measuring nothing is worse than no check.
- `:root { scroll-behavior: smooth }` also meant `scrollIntoView` animated and every rect was read
  pre-scroll. The script forces instant scrolling now.

### Crop tuning, and the thing that is counter-intuitive about it

Four heroes carry an inline `style` on the `<img>`. The reason is worth writing down because the
obvious diagnosis is wrong.

The band is wider than 3:2, so `object-fit: cover` crops **vertically only** — the full width of the
image is always on screen, and the left ~62% is under the heavy end of the scrim. So a band reads as
flat navy when the image's subject is on the _left_, or above/below the visible horizontal slice —
not when the image is dark. `ocean-cliffs-sea-fog` measures brighter than most of the set (mean 132)
but has a standard deviation of 12 on its right half: featureless fog. Mirroring it with
`transform: scaleX(-1)` puts the cliffs where they can actually be seen. Same for the buoy.
`ocean-whale-tail-stars` needed `object-position: center 76%` because the whale is low in the frame
and the default 42% slice was empty starfield.

If a new band looks empty, measure the standard deviation of the right half of the image before
assuming you need a brighter picture.

### Verified state

`astro check` 0 errors. Audit clean on 13 checks (`/videos/` still the one thin page, 338 words —
pre-existing). axe 0 violations, 20 pages × 2 viewports. **Hero contrast: 26 pages, 32 blocks,
2 viewports, all pass — worst is now 6.42:1, up from 4.60:1.** `check:contrast` all pass.
Booking 18/18, finder 11/11. Lighthouse 97–100 mobile / 100 desktop, CLS 0. 129 pages.

### Still open on this

- Mo has not seen these. Shane approved publishing them as decorative imagery on 2026-08-04; Mo's
  own sign-off is still outstanding, as it is for the testimonials.
- ~~Hero images have no `srcset`.~~ **Done 2026-08-04** — see "Responsive band images" below.
- The remaining scene images are still shared: `newsletter-letters.webp` covers four pages,
  `reading-process.webp` three. The funnel has the same duplication problem the reference library
  just had.

## Responsive band images (2026-08-04)

The follow-up the ocean pass left behind: every hero and interlude is one `<img>` stretched across
100vw, and each shipped exactly one file at its authored width — 1536px for the ocean set, 1200px
for the older scene art — no matter what was asking for it. `/explore/transits/` was the worst case
at 161KB.

`scripts/gen-image-variants.mjs` (`npm run images:variants`) now writes 640 / 960 / 1280 copies
beside each source, and `band()` in `src/config/images.ts` attaches the matching `srcset`. The
markup pairs it with `sizes="100vw"`. What a 2x phone actually fetches:

| image                        | was   | now @960 | @640 |
| ---------------------------- | ----- | -------- | ---- |
| `ocean-shells-before-tide`   | 179KB | 84KB     | 44KB |
| `birth-chart-basics`         | 181KB | 93KB     | 46KB |
| `ocean-currents`             | 161KB | 73KB     | 37KB |
| `reading-process`            | 156KB | 74KB     | 35KB |
| `ocean-coral-reef-blue-hour` | 154KB | 83KB     | 47KB |

Four things worth knowing before you touch this:

1. **It covers all 44 band images, not just the ocean ones.** The gap was never specific to the
   ocean work — every hero on the site had it. Fixing fourteen of them and leaving thirty would have
   guaranteed a second pass over the same files.
2. **`sharp` is not a new dependency.** Astro already ships it, so the generator imports it and
   `package.json` is unchanged apart from the new script entry. Do not add it explicitly; that means
   a lockfile regeneration, and `npm ci` fails hard on a mismatch.
3. **`VARIANT_WIDTHS` is exported from `images.ts` and imported by the generator.** One list, two
   consumers. If they ever disagreed the markup would advertise files nothing had written, and a
   browser that picked one would show an empty band — which no check here would catch, because the
   contrast sampler waits for `load` and a 404 fires `error`.
4. **Portraits are deliberately excluded.** They are laid out at a fixed column width rather than
   full-bleed, so they need their own `sizes`, and the three that matter already carry hand-written
   srcsets in `index.astro`. They are also the only images that depict a real person.

Verified: `astro check` 0 errors, 129 pages, audit clean on 13 checks (`/videos/` still the one thin
page at 338 words), axe 0 violations across 20 pages × 2 viewports, `check:contrast` all pass,
booking 18/18, finder 11/11. Hero contrast: 32 blocks × 2 viewports all pass, and — measured on the
same machine, with and without srcset — an identical 5.75:1 worst case either way.

### The trap this pass walked into

`npm run format` is `prettier --write .`, and `.` is the whole repo. Running it after a source edit
also reformatted 39 unrelated files: every `*emphasis*` in `docs/research/` became `_emphasis_`, and
**`wrangler.jsonc` gained trailing commas**. That last one is a deploy config, in a repo whose worst
outage came from a Wrangler behaviour change. All of it was reverted; the commit is only the 57
files this work actually touched. Either format specific paths, or check `git diff --stat` before
committing and put back anything you did not mean to change.

Related: `git status` on this repo lists files as modified that have no content diff at all.
`core.autocrlf` is `true` and there is no `.gitattributes`, so anything Prettier rewrites comes back
with LF against a CRLF working tree. `git diff --stat` is the honest view; `git status` is not.

## Making the internal pages immersive (2026-08-04)

### What was actually wrong, measured

The brief was "the internal pages are a wall of text — make them soothing." The numbers, taken from
the built output rather than by eye:

- **64 of 129 pages carried no image at all.** Every sign, planet, house, aspect and sky-event page
  had no hero image, no body art, nothing. They used `.hero` rather than `.hero--split`, which is
  why the previous ocean pass never touched them and why `check:hero-contrast` had never heard of
  them.
- **51 more had only a hero.** So ~115 pages were pure text below the fold.
- A reference page was **one `<section>` holding every heading**, and `.flow > * + *` gives every
  sibling the same 1rem gap — so an `h2` opening a new idea sat as close to the paragraph above it
  as two paragraphs of the same thought. Nothing for the eye to catch on for 1000px of scroll.

### The system

Not 129 one-off edits. Four pieces, and 74 of the pages are reached through seven `[slug].astro`
templates:

- **`src/components/SeaBreak.astro`** — a short full-bleed ocean band. Two variants, and _the
  difference between them is the scrim, not the height_. `--rest` carries no text, so there is no
  contrast obligation and the scrim is deliberately light (0.30 floor) — a band you cannot see
  through is just a dark stripe, which is the opposite of the point. `--quote` carries a line and
  jumps to the same 0.72 floor `.interlude` uses.
- **Prose rhythm** — real space before each `h2` plus a small teal tide-line, so sections separate.
  These rules are written `.prose.flow > h2` because they have to out-specify `.flow > * + *`.
- **`.section--sea`** — a soft ocean wash, alternated down a page so the background breathes.
- **`oceanFor(slug)` in `src/config/images.ts`** — a deterministic picker. Twelve sign pages needed
  twelve _different_ images without twelve judgement calls, and the choice must be stable across
  builds or screenshot diffs and contrast runs become meaningless.

Signs, planets, houses, aspects and sky events were also converted to `hero--split`, which is what
gave 54 previously image-less pages an immersive opening.

Every `line` on a band is still drawn from copy already on that page. They are pull-quotes, not new
claims — the `<Interlude>` rule, unchanged.

### Where the bands do NOT go — Shane's call, 2026-08-04

Blog posts and Current Sky event pages had a `<SeaBreak>` added and then **removed at Shane's
request**. His words: immersive, not busy for no reason. He is right, and the reason is worth
keeping because it is the rule for anything added here later.

On an `/explore/` page a band sits **between two ideas** and is chosen for what the page is about —
it does a job. On a blog post there is no seam: the body is one `<Content />` block, so the only
place a band could go was between the finished article and the related-posts cards. On a sky-event
page there is barely a body at all — three paragraphs and a source line. In both cases the image was
picked by hash, so it was decoration with no relationship to the page, placed where nobody was still
reading.

**A long-form post does not want breaking up.** What breaks those pages up is the heading rhythm in
`.prose.flow > h2` plus the bold lead-ins the posts already use, and both cost nothing.

The test to apply before adding any device to a page: does it sit between two ideas, and does it
have a reason to be that particular image? If not, leave the page alone.

Sky-event heroes were also re-keyed at the same time. They had been hashed off the slug, so a page
about an eclipse could open on an arbitrary wave — the same "picture for no reason" problem in a
quieter form. Each `eventType` now has a small pool (`HERO_BY_TYPE`) and the slug picks within it,
so the hero is always about the right kind of event **and** no two of the ten lunation pages look
alike. A single image per type would have re-created the sibling-duplication problem this imagery
work existed to fix.

### Two things that were tried and removed

**A scroll-reveal fade.** It looked right in principle and rendered the bands as blank white gaps in
the very first screenshot — the images are `loading="lazy"`, so a band that had not been scrolled to
had nothing in it, and `opacity: 0` meant it never appeared. This is the same trap already recorded
above about lazy images and screenshots, arrived at from a different direction. Hiding content
behind a script to make it feel calmer is a bad trade; it is gone.

**An "On this page" sidebar nav.** Deliberately deferred, not forgotten. It is the strongest
remaining answer to "easy to navigate" and it would fill the dead desktop margin, but doing it
without layout shift needs the headings known at build time, and they are inline in 62 files.

### check:hero-contrast no longer has a hand-written page list

This mattered more than the cosmetics. The list named 27 pages; this work added roughly ninety
text-over-photo blocks, none of which would have been measured. **A contrast check whose coverage
depends on somebody remembering to append a path is a check that silently shrinks.** It now scans
`dist` for `.hero--split`, `.interlude` and `.seabreak--quote` and measures whatever is really
there, printing the page count so a drop in coverage is visible rather than silent.

`.seabreak--rest` is excluded on purpose: nothing sits on it, so there is no ratio to measure.

### Verified state

`astro check` 0 errors, 129 pages. **Hero contrast: 118 pages discovered, every block above 4.5:1,
worst 5.14:1** (was 27 pages checked). axe 0 violations across 20 pages x 2 viewports.
`check:contrast` all pass. Audit clean on 13 checks (`/videos/` still the one thin page). Booking
18/18, finder 11/11.

## Imagery of people — Shane's decision, 2026-08-04

Shane supplied a second image set (celestial and metaphorical rather than ocean: a bowl of moon
phases, an hourglass, a tide pool holding a galaxy, a lighthouse, a moth at the full moon, and
others). Four of them contain a person or a pair of hands — a woman seen from behind at an open
door, weathered hands holding a seed, hands stitching constellations, a hand holding a key.

Those four are the same category this file previously said to hold back. **Shane was asked directly
and approved using them on 2026-08-04.** So the no-invented-portraits rule is about generated
pictures presented _as Mo_, not about any human presence in decorative art.

What that does and does not change:

- It does **not** relax any other rule. Alt text still describes only what is in the frame, never
  implies who took the picture, and never implies the figure is Mo. Still no captions, credits or
  locations. Still nothing of this kind on `/about/` or `/credentials/`, where proximity to Mo's
  real biography is what would make a reader draw the wrong conclusion.
- `ocean-waterline.webp` and `ocean-releasing-water.webp` were **not** named in that approval, so
  they stay unregistered until Shane says otherwise. The reasoning above probably extends to them —
  ask, do not assume.
- Mo has still not seen any of this. Her sign-off remains outstanding, as it does for the
  testimonials.

All nineteen are registered as `celestial` in `src/config/images.ts` and their variants are built.

### These are placed by meaning, not by hash

The ocean set is decorative and interchangeable, so `bandFor()` hashes a slug into it and the
result means nothing in particular. The celestial set is different — it has real subject matter, so
placing it at random would waste it and, worse, would invite a reader to find significance that was
never intended. Where a page has an honest match it is placed by hand:

| page                           | image                           | why                            |
| ------------------------------ | ------------------------------- | ------------------------------ |
| `/explore/saturn-return/`      | cracked sphere repaired in gold | breaks, then rebuilds          |
| `/explore/moon-phases/`        | moon phases in a water bowl     | literal                        |
| `/explore/angles/`             | a figure at an open doorway     | the Ascendant is a threshold   |
| `/explore/house-systems/`      | a ring of many keys             | many keys, one lock            |
| `/explore/schools/`            | a paper boat at a river fork    | the tradition divides          |
| `/explore/birth-chart-basics/` | a tide pool holding a galaxy    | the whole sky in one small map |
| `/explore/chart-patterns/`     | constellations being stitched   | pattern made by hand           |
| `/explore/retrogrades/`        | a coat on an empty chair        | the backward look              |

`bandFor()` now draws from ocean **plus** celestial, which is why the pool comment says the order of
that array is fixed: it is hashed into, so reordering it silently reshuffles the band on seventy-four
pages.

**Nothing from the celestial set appears on `/about/` or `/credentials/`**, and the build is checked
for it. That is the one placement rule that is not aesthetic.

## E-E-A-T and voice pass (2026-08-05)

Prompted by a strategy review of the live site. The full memo is not in the repo; what mattered is
below.

### The seam problem, closed

Four kinds of build note were visible to visitors on the live site: the "Photo of Mo to be placed
here" line on `/about/`, an "Owner action: supply YouTube channel/video IDs" callout on `/videos/`,
an "Owner action: guide file not yet supplied" callout on `/newsletter/`, and an "(owner review)"
italic on thirteen `/current-sky/events/` pages. All removed. Where the underlying content genuinely
does not exist yet — video — the page now says so in Mo's own voice and points at something real
instead of describing the build.

**The lesson worth keeping: a note addressed to the owner has no business rendering in `<main>`.**
Owner instructions belong in `docs/`, which is where they now are. `isDev &&` is the right guard if
something truly must appear during development, as `/testimonials/` already does correctly.

### `/horoscopes/` now keeps its promise

The page said Mo writes guidance for all twelve rising signs with each lunation. Clicking any
lunation gave two general sentences. That is the worst class of trust problem on a site like this:
a claim the reader can disprove in one click.

`src/data/lunation-guidance.ts` fixes it by **calculating** rather than fabricating. In whole-sign
houses — the system `/explore/house-systems/` already documents as the classical default — a
lunation's sign falls in a fixed house per rising sign. A Virgo new moon is the 6th house for Aries
rising and the 1st for Virgo rising, always. That is arithmetic. The interpretation is then written
once per house per phase (12 x 3 = 36 passages) rather than twelve times per event forever.

Why that trade is right: a one-person practice cannot sustain twelve fresh paragraphs per lunation,
and the version that quietly stops being written is worse than the version that is honest about its
method. **`RisingSignGuidance.astro` states the method on the page**, so nobody is led to believe
each paragraph was composed for that specific lunation.

Retrogrades and ingresses render nothing — they have no lunation sign, so there is no house to
count to. Verified: 12 cards on lunations and eclipses, 0 on retrogrades.

### E-E-A-T changes

- **`AuthorNote.astro`** — author plus named, verifiable credentials at the end of blog posts, sky
  events, and the sign/planet/house/aspect templates. Someone arriving from a search result never
  saw `/credentials/`, which is the strongest trust page here. Nothing in it is inflated, and there
  is deliberately no "20 years of experience" line because no such figure has been supplied.
- **`/explore/sources/`** — the reference library separated traditional from modern from Mo's
  synthesis without ever attributing the traditional column. "The ancients believed" is an authority
  claim a reader cannot check. The page names the actual canon: Dorotheus, Ptolemy, Valens,
  Firmicus, Abu Ma'shar, Bonatti, Lilly, and the modern recovery through Project Hindsight and
  Brennan. `Layers.astro` now links the "Traditional view" and "Modern view" labels to it, so every
  doctrine block on the site carries attribution with no per-page authoring. The other four labels
  deliberately do not link — astronomy needs no citation and "Mo's synthesis" is explicitly opinion.
- **`FurtherReading.astro`** + `src/data/further-reading.ts` — nine of thirteen blog posts had fewer
  than three inbound internal links; the library and the blog covered the same topics without
  acknowledging each other. Now **zero** posts are under-linked. The component is self-locating: it
  looks up `Astro.url.pathname` and renders nothing without a genuine subject match, so it can be
  dropped into a template without deciding anything at the call site.
- FAQPage structured data was **already implemented** and emitting ten Question entities. The
  strategy memo was wrong about this; no change was needed.

### Marketing line and Current Sky

Astrology is unregulated, so "certified" alone is worth little. The differentiator is that Mo's
credentials are _named_ and that she invites you to check them — so that invitation is now the
hero line on the homepage rather than something buried three clicks deep.

Current Sky was a bare list of links in half a night band. It is the one asset no comparable
astrologer's site has (a dated, sourced calendar, now with rising-sign guidance on every lunation),
so the band says what it is and why it is different. An asset nobody understands is not an asset.

### Voice

The site drifted into third person — "Mo writes", "she reads every message". Mo's own writing at
molumen.com/services-2 is first person and warm: _"I would love to work with you"_, _"I am not a
'fortune teller'"_, astrology as _"a tool to use like a mirror or a planner"_. Fifteen passages moved
into her voice across contact, FAQs, horoscopes, newsletter, courses, reading-finder, start-here,
testimonials, videos, glossary, schools, house-systems, dignities and the explore hub.

Two things stay third person on purpose: the `AuthorNote` byline ("Written by Maureen 'Mo' Lumen"),
because a byline is not speech, and the `Layers` label "Mo's synthesis", because it is a category
name in a legend rather than a sentence.

### Verified state

`astro check` 0 errors, **130 pages** (`/explore/sources/` is new). Audit: **0 thin pages** (was 1 —
`/videos/` now has real copy), 0 orphans, 0 missing alt, 0 heading skips, 0 pages without JSON-LD.
**0 blog posts under three inbound links** (was 9). Hero contrast: 119 pages discovered, every block
above 4.5:1, worst 5.14:1. axe 0 violations across 20 pages x 2 viewports. `check:contrast` all
pass. Booking 18/18, finder 11/11.

### Still open

- **Mo has not read the rising-sign guidance.** It is derived from standard whole-sign technique and
  her stated approach, but it is interpretive content published under her byline and belongs on the
  same review list as the thirteen blog posts.
- `/videos/` is still empty. The empty state is now honest rather than a build note, and
  `/testimonials/` no longer advertises video as "the most honest preview" while pointing at a blank
  page — it points at `/explore/sources/` instead. Swap both back once there is something to watch.
- Exact clock times for sky events were never supplied. The build note claiming they were coming is
  gone; the dates and signs remain sourced and verified, which is what the pages actually assert.

## Tagline, credentials, and a real mobile bug on the homepage (2026-08-05)

### Credentials came back out

Shane removed the credentials-forward material added earlier the same day: the hero line
("Certified — and I'd rather you checked") and the `AuthorNote` block on every article page. His
reasoning: a growing part of the astrology audience prefers younger and self-taught practitioners,
and heavy credentialism reads to them as gatekeeping rather than reassurance.

`src/components/AuthorNote.astro` is deleted, along with its CSS and the `.hero__verify` styles.

**Authorship was not removed, and should not be.** Twenty-nine pages still carry a plain "by Mo
Lumen" byline in their header, and the `author` field is still in the Article/BlogPosting JSON-LD on
every post and sky event. That is the part search quality guidance actually weights; the recitation
of certificates was additive. `/credentials/` still exists in full for anyone who goes looking.

### New brand tagline

`site.tagline` is now **"There is fate and there is choice."** — Shane's choice, and taken from Mo's
own words on `/about/` rather than invented: _"There is fate and there is choice — and a good reading
helps you tell the difference."_ The full sentence is the hero line; the short form is the tagline
that appears in the homepage `<title>`.

`"See yourself in a new light."` stays as the homepage h1. The tagline is the brand statement and the
h1 is the invitation — they are allowed to differ, and both are hers.

### Ocean imagery: left alone, deliberately

Shane asked whether the ocean set should be swapped for astrological imagery, and decided against it
for now. The measurement that informed it, for whoever revisits this:

| set       | distinct images | page uses |
| --------- | --------------- | --------- |
| celestial | 19              | 82        |
| ocean     | 14              | 61        |
| scene art | 23              | 68        |

The swap is already about 60% done — the celestial set carries more of the site than the ocean set
does. The reason not to finish it mechanically: seventy-four pages draw from one shared pool via
`bandFor()`. Dropping all fourteen ocean images takes that pool from 33 to 19 and makes repetition
_worse_, not better. A full swap needs roughly 15–20 new images first.

### The bug this uncovered — worth reading

Adding a tagline to the homepage hero meant putting text on a photograph, so it needed
`check:hero-contrast`. It turned out **the homepage had never been in that check at all**: the block
selector matched `.hero--split`, and the homepage uses `.hero--home`.

It was failing. On mobile, measured: **lede 2.48:1, reassurance line 3.20:1, tagline 2.89:1** — all
under 4.5:1, on the most important page of the site, for an unknown length of time.

The cause is the trap already documented above for `.hero--split`, in a second place nobody looked.
`.hero--home::after` is a `100deg` gradient running 0.92 → 0.72 at 45% → **0.25 at the right edge**.
That is fine on desktop, where the text sits in a left column and never reaches the transparent end.
On mobile the column goes full-width and runs straight into it. `.hero--split` got a mobile override
for exactly this reason; `.hero--home` never did. It has one now, at the end of `global.css`, using a
**uniform vertical scrim** — because when text is full-width there is no width at which it can drift
into a lighter stop. After: lede 6.35:1, reassurance 6.52:1, tagline 5.21:1.

**The general lesson, again: the check only protects what it looks at.** Three separate coverage
gaps were found in one sitting.

### Three fixes to check:hero-contrast itself

1. **`.hero--home` added** — to the block selector _and_ to the discovery regex. They are separate
   (one is a CSS selector, one matches raw HTML) and they drifted immediately: adding it to only the
   selector left the homepage out of the run while the printed page count looked unchanged. If you
   add a block class, add it in both places.
2. **Per-element foreground colour.** The sampler read `getComputedStyle(els[0]).color` once and
   measured every box against it. Fine while a block held only ivory headings and a stone lede;
   wrong the moment a gold tagline joined them. It now measures each element against its own colour,
   and prints which element failed — "1.13:1 on `.hero__reassure`" sends you to the line, "1.13:1
   somewhere in this hero" sends you hunting.
3. **Sticky-header exclusion.** `.site-header` is `position: sticky` with a near-ivory background.
   Centring a block taller than the viewport slides its heading underneath it, and the sampler read
   the header's cream pixels — reporting the homepage h1 at 1.13:1 against a background no visitor
   ever sees behind it. Sampling now starts below the header's bottom edge.

`.hero__tagline` and `.hero__reassure` were also added to the sampled elements. Both are real
sentences on a photograph and neither had ever been measured.

### Verified state

`astro check` 0 errors, 130 pages. **Hero contrast: 120 pages discovered** (up from 119 — the
homepage), every block above 4.5:1, worst **5.14:1**. axe 0 violations across 20 pages × 2 viewports.
`check:contrast` all pass. Audit: 0 thin pages, 0 orphans, 0 missing alt, 0 pages without exactly one
h1. Booking 18/18, finder 11/11.

## Reading Finder rebuild and conversion pass (2026-08-05)

Prompted by running the marketing-council skill against the live site.

### The Reading Finder went from 2 questions to 5

The old finder asked "have you had a reading before?" then one need question, and returned a product
name. It now asks five and returns a diagnosis.

Question order is deliberate. It opens with **what brought you here**, not with the
new-or-established split, because the first question decides whether this reads as a form or as the
start of a conversation — and that decides completion. The admin question is now second.

**Only `focus` (relationship) and `depth` / `est-need` change the recommendation.** `birthtime` and
`when` exist to make the readback specific and to weight the closing action. They earn their place
by what the reader gets back, not by segmenting them — a question whose only purpose is marketing
gets smelled out by exactly this audience.

Two of the five are worth defending individually:

- **Birth time** is the single biggest piece of friction in this funnel; there is a whole page about
  tracking one down. Asking inside the finder turns a silent drop-off into a moment of help, and it
  genuinely changes the advice. It is **yes / roughly / no** — never an actual time, per the site
  rule that birth data stays out of analytics, URLs and email.
- **Timing** is the funnel question, framed as service. "In the next few weeks" versus "still
  deciding" is what tells Mo who to book and who to keep warm, without a countdown timer anywhere.

### Three exits, weighted by intent

The result used to have one door: book. Most visitors are not ready today, and they were given
nothing to do but leave. It now offers **book / send this to me first / full details**, and the
primary button swaps based on the timing answer — someone still exploring gets "send this to me
first" as the loud button, and an explicit "don't book anything yet, read the sky letter" line.

### Why the email is a `mailto:` and not a form

There is no server. The site deploys as **static assets only** (`wrangler.jsonc` has an `assets`
block and no fetch handler), `PUBLIC_MAILERLITE_FORM_ID` is unset, and molumen.com is still on
Squarespace so no sending domain could be verified yet. A form backend was not an option.

So "Send this to me first" opens the visitor's own mail client, pre-filled with their answers and
the recommendation, addressed to Mo. It stores nothing — which keeps faith with the promise on the
page — Mo receives a lead **with context**, and the visitor keeps a copy in their Sent folder.

There is also an argument it is simply better here: for a $150–$275 one-to-one service, starting a
conversation with a human beats adding a row to a mailing list. When MailerLite is configured this
can upgrade using the same `formId ? … : mailto` pattern `NewsletterForm` already uses.

**The page's promise was updated to match.** It used to say "nothing you answer here is stored or
sent anywhere". It now says answers stay in the browser and nothing is sent unless you choose to
send it. If the finder ever gains a real backend, that sentence has to change again first.

### The vocabulary trap, avoided

`recommend()` returns `primary` (a **service** slug, used for the `services` lookup and
`/readings/<slug>/`) and an optional `book` (a **Cal.com event** key, used only in
`/book/?service=`). They are separate fields on purpose. Routing the 60/90 split needed `natal-60`
and `natal-90`, which are event keys — `services['natal-60']` is undefined and would have thrown.
This is the same drift documented above under "Vocabulary drift"; it has now bitten twice.

Side benefit: the finder used to send every new client to `natal` (which maps to the $200
ninety-minute event). It now routes to the duration they actually chose.

### Council recommendations 1, 2 and 5

- **Three testimonials on the homepage.** Chosen by which objection they answer — "will this mean
  anything", "will she just tell me what to do", "I know nothing about astrology" — not by which is
  most flattering. Filtered on `approved` like every other surface.
- **Assurances strip beside the prices.** 48-hour reschedule, fee held as credit, full refund if Mo
  cancels, recording yours, birth data never sold. Every line was already true and already written
  in `/booking-policy/` — which is exactly where nobody reads it while deciding whether to spend
  $150 on a stranger. **Nothing was invented; if the policy changes, change both.**
- **Closing CTA.** Was "Whenever you're ready, the sky's not going anywhere / Take your time" — an
  instruction to leave, directly above the only button. Now "Bring me your real question."

### The dream outcome, and its ceiling

"Just perspective you can use" was a texture, not an outcome. But this site **cannot** promise what
will happen in someone's life: the disclaimer says astrology offers perspective rather than
certainty, and Mo's own words are "I am not a fortune teller."

So the outcome now named in the hero is the one clients actually report, in their own words on
`/testimonials/` — _"things I've felt about myself forever and just never had words for."_ The line
is **"just words for something you've been living for years."** It is honest, specific, and
evidenced. Do not upgrade it into a guarantee.

### A CSS trap worth knowing

`.quote-card blockquote` had to reset `background` and `border-radius` explicitly. There are **two**
bare `blockquote` rules in `global.css` — one sets parchment, a later one overrides it with a blush
tint — and inside a white card that read as a stray highlight. Class specificity won for the
properties that were named and did nothing for the ones that were not. When overriding a bare
element selector, clear every property it sets, not just the ones you happen to think of.

### Verified state

`astro check` 0 errors, 130 pages. Finder handoff 11/11 and booking 18/18 — the finder UI changed
completely and both still pass, because the test asserts `/book/?service=` slugs rather than the
finder's markup. All eight recommendation paths were driven in a real browser and checked. Hero
contrast 120 pages, worst 5.14:1. axe 0 violations across 20 pages × 2 viewports. `check:contrast`
pass. Audit 0 thin, 0 orphans, 0 missing alt.

### Still open on this

- Completion rate per step is unmeasured. Going 2 → 5 questions will cost _some_ completion; the
  `reading_finder_intent` GA4 event and the existing step events are there to find out whether the
  trade was worth it. Nobody has looked yet.
- The lead magnet ("Reading the Road Ahead") still does not exist, so there is still no bait rung
  below the $150 natal reading for a cold visitor.

## Every hero has a photo now, and the quote cards are shared (2026-08-05)

Shane flagged two pages with an imageless hero. A scan of the built output found **nine**, so all
nine were done rather than the two that happened to get noticed:

| page                           | image                             | why that one                            |
| ------------------------------ | --------------------------------- | --------------------------------------- |
| `/testimonials/`               | a cleared table, candle still lit | people were here, and have gone         |
| `/tools/explore-your-chart/`   | a tide pool holding a galaxy      | the whole sky in one small readable map |
| `/explore/glossary/`           | shells laid out in a spiral       | a collection put in order               |
| `/frequently-asked-questions/` | sunbeams through water            | questions, answered clearly             |
| the five legal pages           | a buoy holding position           | a fixed marker you can rely on          |

The legal pages share one image on purpose — they are a set and should look like one. They are all
rendered by `LegalPage.astro`, so that was a single edit covering five pages.

**Keep this at zero.** `heroes WITHOUT a photo` is now 0 of 129. A page that ships with a bare
`.hero` will look broken next to its neighbours rather than deliberately plain, because there is no
longer any precedent for a plain one.

### The blush blockquote, second occurrence

The testimonials page was still rendering bare `<blockquote>` elements, which pick up the blush tint
from the global rule and read as highlighted text rather than as somebody speaking — the same defect
fixed on the homepage a commit earlier, in the one place it had not been looked at.

Both surfaces now use the same `.quote-card` / `.quote-grid`, so they cannot drift apart again.
`.quote-grid--wide` gives the testimonials page two columns instead of three, because nine quotes of
seventy-odd words in three columns is a wall.

### Verified

`astro check` 0 errors, 130 pages. **Hero contrast: 129 pages discovered** — up from 120, which is
exactly the nine new heroes — all above 4.5:1, worst 5.14:1 site-wide and the new ones all between
8.77:1 and 11.35:1. axe 0 violations. `check:contrast` pass. Finder 11/11, booking 18/18. Audit 0
thin, 0 orphans, 0 missing alt.

## Messaging & E-E-A-T audit, and the findings acted on (2026-08-05)

Ran the `messaging-eeat-auditor` skill against the site. Scored **Messaging 8.0**, **E-E-A-T 6.7**,
at the **elevated YMYL** tier — the rubric puts astrology alongside medical and financial advice,
not because the subject is verifiable but because the content sits next to real life decisions, so
every band is graded about a point stricter than a standard local business.

`brand-guidelines` was loaded and deliberately **not applied**: it is Anthropic's identity (orange
`#d97757`, Poppins/Lora), meant for Anthropic-branded artifacts. Applying it to a Mo Lumen
deliverable would have been wrong. The audit artifact uses this project's own `tokens.css` palette.

### The finding that mattered most

E-E-A-T is not held back by writing quality. It is held back by one thing: **a skeptical visitor
cannot confirm this business exists in the physical world.** No address, no phone, no service area,
no third-party directory listing. Trustworthiness carries 40% of the composite.

The sharpest form of it: the JSON-LD in `BaseLayout.astro` tells Google
`Dallas–Fort Worth, Texas (in person, by arrangement)`, and the site never tells the reader. Telling
a search engine something you do not tell a visitor is the wrong way round.

### Fixed

- **Entertainment classification is now declarative.** It read "Some jurisdictions require… where
  that classification applies" — a description of a legal situation that never committed to one. A
  reader could finish the sentence without knowing whether it applied to them. Both
  `disclaimer.md` and `terms.md` now state it plainly and say it is applied everywhere rather than
  case by case.
- **Service area, to the extent it is confirmed.** `/contact/` now has a "Where I am" section
  saying readings happen over Zoom or phone so you can book from anywhere. Every service in
  `src/content/services/*.json` lists its format as Zoom or Phone, so that is safe to state.
- **Homepage audience specificity.** The "why people come" paragraph opened with three separate
  "maybe"s across five situations. It now describes one recognisable person — someone mid-decision
  who has already exhausted everyone close to them.
- **Last third-person slip**, on `/contact/`: "get to know Mo's work" → "get a feel for how I work".
- **A path back to the credentials**, on blog posts and sky events: `· how I trained`, linking to
  `/credentials/`. Four words and a link — **not** a re-introduction of the credential block that
  was deliberately removed. Someone landing from search can find out who is talking in one click;
  nobody is lectured. Do not grow this back into a list.

### Deliberately NOT done, and why

**In-person Dallas–Fort Worth sessions are not stated anywhere in visitor copy.**
`docs/plan/open-questions.md` #9 records "still offered by inquiry?" as unresolved. Mo is
demonstrably in DFW — she is treasurer of the NCGR-DFW chapter — but whether in-person is still
offered is a different question, and the schema's `(in person, by arrangement)` claim needs her
answer before it belongs in copy **or in the schema**. That is now the highest-value unanswered
question on the site.

### Still open, needing facts only Mo has

- **Length of practice.** The site never says how long she has been reading charts. The top
  Expertise band explicitly wants years of practice, and it is the cheapest point available on that
  axis — absent purely because nobody wrote the number down. Do not estimate it.
- **Legal entity name.** The footer publishes "Mo Lumen Astrological Services" on all 130 pages
  while `site.ts` carries `// confirm with owner`. If the registered entity differs, every page
  currently misstates it.
- **Local licensing.** Several Texas municipalities license fortune-telling specifically. Flagged to
  verify with the city and county, not asserted.
- **Directory listings.** Board service at OPA and membership of NCGR/OPA/ISAR are real external
  validation presented as unlinked assertions. Link them, and add the practitioner-directory line
  only for organisations where Mo's listing is actually public.
- **A worked example of a reading.** Testimonials say a reading was good; nothing shows the work.
  Needs a real anonymised case from Mo — inventing one would breach the same rule that governs
  testimonials.

### Verified

`astro check` 0 errors, 130 pages. Hero contrast 129 pages, all above 4.5:1. axe 0 violations.
`check:contrast` pass. Finder 11/11, booking 18/18. Audit 0 thin, 0 orphans, 0 missing alt,
descriptions all within range.
