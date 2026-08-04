# Session handoff

Written 2026-08-04. Read this first if you are picking this repo up in a new session.

Everything below is context that existed only in a conversation and would otherwise be lost. The
code is in git; the *reasons* are here.

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

**Absolutely-positioned children resolve against the nearest *positioned* ancestor.** Making
`.hero--split .container` positioned shrinks the hero photo to the container box instead of letting
it fill the band. There is a comment in `global.css` saying so. It is not an oversight.

**CSS source order decides ties.** The mobile hero scrim override lives at the *end* of
`global.css` on purpose, with a comment. Moving it up loses it to a later equal-specificity rule.

**axe cannot evaluate contrast of text over a photograph.** It reported zero violations while nine
of ten heroes were failing on mobile, one at 2.28:1. That is what
`npm run check:hero-contrast` exists for — it pixel-samples the worst case behind the text.
**Run it after any hero image or scrim change.** It is the single most valuable script here.

## Verification tools

Run `npm run audit:install` first (installs lighthouse, playwright, pngjs without saving).

| Command | What it catches |
|---|---|
| `npm run check` | TypeScript / Astro errors |
| `npm run audit` | structure, SEO, link graph, title/description lengths |
| `npm run audit:a11y` | axe, 20 pages × 2 viewports |
| `npm run check:hero-contrast` | **text over photos** — the one axe cannot do |
| `npm run check:contrast` | computed ratios for chips and prices, with numbers |
| `npm run measure:heroes` | hero height as % of the fold, 30 pages |
| `npm run test:booking` | 18 assertions on the Cal.com embed |
| `npm run test:finder` | 11 Reading Finder → /book/ handoff cases |
| `npm run audit:lh` | Lighthouse |
| `npm run shot /book/ /about/` | full-page screenshots into `shots/` |

Last known-good state at commit `83e5dd5`: 129 pages, `astro check` clean, audit clean on 13
checks, axe 0 violations, every hero above 4.5:1 at its worst pixel, booking 18/18, finder 11/11,
Lighthouse 99–100 mobile / 100 desktop, CLS 0.

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

- **In progress: ocean imagery.** 16 images are committed to `public/images/ocean-*.webp`. They are
  not yet registered in `src/config/images.ts` and not yet used. See the provenance note below.
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
- `ocean-waterline.webp` and `ocean-floating-in-trust.webp` contain a woman. In both she is
  unidentifiable — turned away in one, a distant aerial speck in the other — so neither reads as a
  portrait, which is what makes them usable at all. They still must never be captioned, framed, or
  placed so a reader would take the figure for Mo. Never use either on `/about/` or `/credentials/`.
- Do not add photo credits or location captions that were not supplied.
- Confirm with Shane that Mo is comfortable publishing these as decorative imagery.
