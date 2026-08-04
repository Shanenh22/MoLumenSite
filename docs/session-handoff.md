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
