# Website Auditor report — Mo Lumen Astrology

**Date:** 2026-08-03
**Target:** `https://molumen.shanenh.workers.dev/` (staging) and the local production build (118 pages)
**Rubric:** the `website-auditor` skill's `references/scoring-rubric.md` — scores are mapped to its
bands, not eyeballed.

## Audit mode: hybrid — read this before trusting any number

The skill's `detect_environment.sh` returned **LITE**: this sandbox has no outbound `curl` to the
staging domain, so `full_audit.sh` (remote Lighthouse + remote axe) could not run. Per the skill's
instruction to say so explicitly rather than silently downgrade, here is exactly what each score
rests on.

The Lite path was run as specified: the skill's `static_audit.py` and `schema_validator.py` against
seven page templates, plus `web_fetch` for the deployed page, `robots.txt`, `sitemap.xml` and
`llms.txt`.

That was then supplemented with something the Lite path cannot normally get. The full production
build exists locally, so Lighthouse and axe-core were run against the real rendered DOM in headless
Chromium — real Core Web Vitals, real computed contrast, real ARIA evaluation. Those are genuine
measurements, not static estimates, and the served HTML/CSS/JS is byte-identical to the build.

The one thing that does **not** transfer is real-world performance timing. Local numbers exclude
Cloudflare's edge, the visitor's network and device, and the third-party scripts (Cal.com, GA4,
MailerLite) that are not yet wired in. Performance is therefore labelled *Measured (local)* — a
regression baseline, not a field prediction.

## Overall: 7 categories scored, 1 critical operational issue, 6 quick wins

| Category | Score | Basis |
|---|---|---|
| SEO | 9/10 | Measured |
| AEO | 6/10 | Measured |
| GEO | 4/10 | Measured |
| Schema / Structured Data | 8/10 | Measured |
| ADA / WCAG 2.2 AA | 9/10 | Measured (local render) |
| UI/UX | 9/10 | Measured (local render) |
| Code Quality / Performance | 9/10 | Measured (local) |

Per the rubric these are deliberately not averaged. The site is strong where conventional audits
look and weak where AI-era audits look, and a single number would hide exactly that.

---

## CRITICAL — staging is not serving the current build

This is not one of the skill's seven categories, but it outranks everything in them, because it
means nobody has actually reviewed the current site.

Measured, three fetches:

| Request | Footer state | Corresponds to |
|---|---|---|
| `GET /` | "Articles" link, "Policies" group | a build from before the blog restructure |
| `GET /?cachebust=audit20260803` | "Writing" group with Blog | commit `4cc54b8` |
| `GET /?v=audit2` | Site group **without** Resources / Courses / Guides | commit `4cc54b8` |
| local `dist/index.html` | Site group **with** Resources / Courses / Guides | commit `3199d98` |

Two distinct problems. First, the latest commit has not deployed — staging is at least one commit
behind, so the orphan-page fix pushed earlier today is not live. Second, and more concerning for
production, the bare `/` URL returned materially older HTML than the same URL with a query string
appended. [Likely] That is edge caching serving stale HTML, because there is no `_headers` file and
therefore no explicit `Cache-Control` policy for HTML documents.

The second problem is the one that matters after launch. Static assets are content-hashed and can
cache forever; HTML documents cannot, or visitors keep seeing an old site after Mo publishes.

**Fix — `public/_headers`:**

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable
```

Then confirm in the Cloudflare dashboard that the Git integration actually built commit `3199d98`.
A build that silently stopped running is the kind of thing that stays invisible until launch day.

---

## SEO — 9/10 [Measured]

Measured across all 118 built pages: zero duplicate titles, zero duplicate descriptions, zero titles
over 60 characters, zero descriptions outside 70–160, exactly one `<h1>` on every page, zero
heading-level skips, zero images without `alt`, canonical on every page, JSON-LD on every page,
`robots.txt` present and allowing all crawlers, `sitemap-index.xml` present, HTTPS, no `noindex`
anywhere, and zero broken internal links across 235 resolvable URLs.

That satisfies every condition in the rubric's 9–10 band. One issue outside the rubric's enumerated
checks holds it at 9.

**Issue — staging is fully crawlable and indexable.** `robots.txt` on `molumen.shanenh.workers.dev`
returns `User-agent: * / Allow: /`. Canonical tags point to `molumen.com`, which will usually cause
Google to consolidate, but "usually" is doing real work in that sentence, and right now `molumen.com`
serves the *old Squarespace site* — so the canonical target and the canonical content disagree.

**Fix — make staging noindex without touching production.** In `astro.config.mjs`, drive robots from
the deploy target:

```js
// astro.config.mjs
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://molumen.com',
  integrations: [
    sitemap(),
    // ...
  ],
});
```

and add to `src/layouts/BaseLayout.astro`, inside `<head>`:

```astro
---
const isStaging = Astro.site?.host !== 'molumen.com';
---
{isStaging && <meta name="robots" content="noindex, nofollow" />}
```

Set `PUBLIC_SITE_URL=https://molumen.shanenh.workers.dev` as an environment variable on the
Cloudflare staging project only. Production keeps `molumen.com` and stays indexable.

---

## AEO — 6/10 [Measured]

Answer-engine optimisation targets featured snippets, People Also Ask, voice results and Google AI
Overviews. The rubric's 6–8 band is "some question headings or some structured content, but not
both, or FAQPage schema missing." Both halves of that apply.

Measured: 84 of 118 pages (71%) carry at least one question-format heading. Lists and tables are
used throughout, which the rubric credits. But **only 1 of 118 pages has FAQPage schema**, and the
site contains **38 genuine question-and-answer pairs across 8 pages** — 28 of them completely
unmarked.

| Page | Q&A pairs | FAQPage schema |
|---|---|---|
| `/frequently-asked-questions/` | 10 | yes |
| `/readings/natal/` | 4 | **no** |
| `/readings/relationship/` | 4 | **no** |
| `/readings/solar-return/` | 4 | **no** |
| `/readings/life-changes/` | 4 | **no** |
| `/readings/monthly-transits/` | 4 | **no** |
| `/readings/quick-check-in/` | 4 | **no** |
| `/readings/want-more-clarity/` | 4 | **no** |

The questions already written are exactly the ones people type into search and ask assistants:
"Can astrology predict my future?", "Why do you need my exact birth time?", "What if I don't know
my birth time?". The answers are already written, already good, and already on the page. They are
simply invisible to the machines that would quote them.

**Fix — emit FAQPage from the FAQ data already in the content collection.** The service template
already renders `<details><summary>` blocks from frontmatter, so the data is in hand:

```astro
---
// src/pages/readings/[slug].astro — add alongside the existing Service/Offer JSON-LD
const faqs = entry.data.faqs ?? [];
const faqSchema = faqs.length
  ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    }
  : null;
---
{faqSchema && (
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
)}
```

**Second issue — all 13 sign pages have zero question-format headings.** Measured: 0 of 13. Their
headings are label-style — "At a glance", "The style", "Strengths", "The growth edge". Sign pages
are the highest-volume informational query class in astrology, and label headings are the least
extractable form available.

**Fix — rewrite sign-page section headings as questions, keeping the same content.** The rubric also
wants the answer front-loaded in the first one or two sentences after the heading:

```diff
- <h2>At a glance</h2>
+ <h2>What are the key traits of {sign.name}?</h2>

- <h2>The style</h2>
+ <h2>How does {sign.name} approach life?</h2>

- <h2>Strengths</h2>
+ <h2>What is {sign.name} good at?</h2>

- <h2>The growth edge</h2>
+ <h2>What does {sign.name} struggle with?</h2>

- <h2>In relationship</h2>
+ <h2>What is {sign.name} like in relationships?</h2>

- <h2>At work</h2>
+ <h2>What is {sign.name} like at work?</h2>
```

This is one edit in `src/pages/explore/signs/[slug].astro`, applied to all 13 pages at once.

---

## GEO — 4/10 [Measured]

Generative-engine optimisation targets being crawled, quoted and **cited** by ChatGPT, Perplexity,
Claude and the generative layer of AI Overviews. This is the site's weakest category by a wide
margin, and — given that the stated goal is for molumen.com to be a source of truth for astrology —
it is also the one where the gap between ambition and implementation is widest.

The rubric's 3–5 band is "no explicit AI-crawler blocking but no freshness signals, no citations, no
llms.txt." Measured against it:

| Signal | Rubric expectation | Measured |
|---|---|---|
| AI crawlers unblocked | required for 9–10 | **pass** — `robots.txt` allows all agents |
| Entity attribution with `sameAs` | required for 9–10 | **partial** — ProfessionalService has `sameAs`; Mo as a Person does not |
| `datePublished` / `dateModified` | required for 9–10 | **fail** — 19 of 118 pages (16%); **99 pages carry no date at all** |
| Outbound citations to authoritative sources | required for 9–10 | **fail** — **0 of 118 pages** have a single outbound citation |
| `llms.txt` | required for 9–10 | **fail** — returns 404 |

Crawler access and partial entity attribution lift it above a pure 3. Everything else fails.

The citation number deserves emphasis. The site makes a great many verifiable factual claims —
orbital periods, ingress dates, the Ptolemaic dignity table, retrograde windows — and cites nothing
for any of them. `docs/research/source-log.md` exists in the repository and records where those
facts came from, but no reader and no crawler can see it. Generative engines preferentially cite
pages that themselves cite sources; a page that asserts without attribution is scraped, not quoted.
This is simultaneously the GEO fix and the intellectual-honesty fix.

**Fix 1 — `public/llms.txt`** (one file, no build changes):

```
# Mo Lumen Astrology

> Astrology readings and a plain-language reference library, written by
> Maureen "Mo" Lumen. Traditional technique with a modern voice; every
> reference page separates astronomical fact from traditional doctrine,
> modern interpretation, and Mo's own synthesis.

## Readings
- [All readings](https://molumen.com/readings/): seven consultation types, with prices and durations
- [Book a reading](https://molumen.com/book/): scheduling and payment
- [How readings work](https://molumen.com/how-readings-work/): what happens in a session

## Reference library
- [Start here](https://molumen.com/start-here/): nine-step beginner curriculum
- [The signs](https://molumen.com/explore/signs/): all twelve, with essential dignities
- [The planets](https://molumen.com/explore/planets/): traditional and modern rulerships
- [The houses](https://molumen.com/explore/houses/): all twelve, with house-system notes
- [The aspects](https://molumen.com/explore/aspects/): major and minor, with orbs
- [Essential dignities](https://molumen.com/explore/dignities/): the Ptolemaic table explained
- [Glossary](https://molumen.com/explore/glossary/): plain-language definitions

## Current sky
- [Current sky](https://molumen.com/current-sky/): ingresses, retrogrades, lunations
- [The sky in 2026](https://molumen.com/current-sky/the-sky-in-2026/): year overview

## About
- [About Mo](https://molumen.com/about/): background and credentials
- [Blog](https://molumen.com/blog/): essays and guides
```

**Fix 2 — dates on the 99 undated pages.** Add `updated` to the reference content schema and emit it:

```ts
// src/content/config.ts
const reference = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),   // <- add
    // ...
  }),
});
```

```astro
---
// in BaseLayout.astro, alongside the existing WebSite/ProfessionalService blocks
const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: metaDescription,
  dateModified: (updated ?? new Date()).toISOString(),
  author: { '@type': 'Person', name: 'Maureen "Mo" Lumen', url: 'https://molumen.com/about/' },
  publisher: { '@type': 'Organization', name: 'Mo Lumen Astrology', url: 'https://molumen.com' },
  isPartOf: { '@type': 'WebSite', url: 'https://molumen.com' },
};
---
```

Do not backfill a fake date. Use the real last-edit date per page — `git log -1 --format=%aI -- <file>`
can generate honest values at build time.

**Fix 3 — visible citations on reference pages.** A `<Sources>` component fed from the existing
source log, rendered at the foot of each reference page:

```astro
---
// src/components/Sources.astro
const { sources } = Astro.props;   // [{ label, url, note? }]
---
{sources?.length > 0 && (
  <section class="sources" aria-labelledby="sources-heading">
    <h2 id="sources-heading">Sources</h2>
    <ul>
      {sources.map((s) => (
        <li>
          <a href={s.url} rel="noopener nofollow">{s.label}</a>
          {s.note && <span class="sources__note"> — {s.note}</span>}
        </li>
      ))}
    </ul>
  </section>
)}
```

**Fix 4 — Mo as a first-class entity.** The `Person` block currently has a name and job title but no
identity links, so no engine can resolve "Mo Lumen" to a real astrologer:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Maureen \"Mo\" Lumen",
  "jobTitle": "Astrologer",
  "url": "https://molumen.com/about/",
  "sameAs": [
    "https://www.instagram.com/mo.lumen/",
    "https://www.facebook.com/profile.php?id=100094534962856"
  ],
  "knowsAbout": ["Astrology", "Natal chart interpretation", "Horary astrology", "Traditional astrology"],
  "worksFor": { "@type": "ProfessionalService", "name": "Mo Lumen Astrology" }
}
```

Credentials (`hasCredential`) should only be added once Mo confirms them — the project brief
prohibits inventing professional memberships, and schema is not an exception to that.

---

## Schema / Structured Data — 8/10 [Measured]

The skill's `schema_validator.py` reports **zero missing required fields** across every template
tested. JSON-LD is present and valid JSON on all 118 pages. Types in use: `ProfessionalService`,
`WebSite`, `Person`, `BreadcrumbList`, `ListItem`, `Service`, `Offer`, `FAQPage`, `Question`,
`Answer`, `Blog`, `BlogPosting`, `Organization`.

**Reported and rejected:** `static_audit.py` flagged "No Organization or LocalBusiness schema found"
on every page. This is a **false positive**. The script does a literal string match for those two
type names; the site emits `ProfessionalService`, which is a subtype of `LocalBusiness` in the
schema.org hierarchy and is treated as one by consumers. No fix needed.

Two real gaps hold it at 8 rather than 9–10, matching the rubric's "missing a type the page content
clearly warrants":

The ~60 reference pages (signs, planets, houses, aspects, explore topics) carry only site-level and
breadcrumb schema. They are substantial articles — 520 to 660 words each — with no `Article` or
`WebPage` type describing them. The `Article` block in GEO Fix 2 above resolves this and the
freshness gap in one change.

`BlogPosting` is missing its recommended `image` and `dateModified`:

```astro
{
  '@type': 'BlogPosting',
  headline: post.data.title,
  datePublished: post.data.publishDate.toISOString(),
  dateModified: (post.data.updated ?? post.data.publishDate).toISOString(),
  image: new URL(post.data.heroImage, Astro.site).href,
  author: { '@type': 'Person', name: 'Maureen "Mo" Lumen', url: 'https://molumen.com/about/' },
}
```

---

## ADA / WCAG 2.2 AA — 9/10 [Measured, local render]

axe-core was run with the WCAG 2.0, 2.1 and 2.2 A and AA rulesets plus best-practice rules, against
the rendered DOM, across 20 pages covering every template, at 390px and 1440px — 40 page-viewport
combinations. **Zero violations.** Lighthouse accessibility scores 100 on all six pages tested,
mobile and desktop. Static checks confirm `lang`, alt text on 100% of images, semantic landmarks,
skip link, and no vague link text.

That meets the rubric's 9–10 condition ("zero axe-core critical/serious violations"). It is reported
as 9 rather than 10 for two reasons.

**Reported and rejected:** `static_audit.py` flagged "7 form fields with no associated label" on
`/book/`. This is a **false positive** — the seven radios use *implicit* labels (`<label
class="choice"><input type="radio"> …</label>`), which satisfies WCAG 1.3.1 and which axe passes.
The script only checks `for`/`id` pairing and `aria-*`.

**But investigating it surfaced a real defect that axe did not flag.** The radio group has no
programmatic group label — measured: zero `<fieldset>`, zero `<legend>`, zero `role="radiogroup"` on
that page. The visible `<h2>Choose your reading</h2>` is not associated with the group, so a screen
reader user tabbing in hears each option's name but never learns what the set is *for*. WCAG 1.3.1,
Technique H71.

**Fix — `src/pages/book.astro`:**

```diff
- <h2>Choose your reading</h2>
- <div data-booking-services>
+ <fieldset data-booking-services>
+   <legend><h2>Choose your reading</h2></legend>
    <label class="choice">
      <input type="radio" name="booking-service" value="natal" />
      …
    </label>
- </div>
+ </fieldset>
```

```css
/* fieldset carries default border/padding — reset to preserve the current visual design */
fieldset[data-booking-services] {
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
}
fieldset[data-booking-services] > legend {
  padding: 0;
}
```

The second reason for 9 rather than 10 is stated plainly: automated tooling catches roughly a third
to a half of real accessibility barriers. No keyboard-only pass and no screen-reader session has
been run by a person. Per the project brief, this report does not claim compliance — it reports zero
automated violations, which is a floor, not a certificate.

---

## UI/UX — 9/10 [Measured, local render]

Correct `width=device-width` viewport on every page; semantic landmark structure present throughout;
navigation is consistent and now has zero orphan pages and zero pages more than three clicks from
home; every image carries explicit `width`/`height`. **Measured CLS is 0.000 on all six Lighthouse
pages**, mobile and desktop — no layout shift at all. Zero horizontal overflow down to 320px.

Two things hold it at 9.

`/videos/` is 338 words and is the only page on the site under the 350-word threshold. It is a
navigational dead end because the video IDs have not been supplied. This is owner-blocked, not a
build defect, but a visitor arriving there today gets nothing.

The booking radio group described above is a UX issue as well as an accessibility one — a
seven-option choice with no programmatic grouping.

---

## Code Quality / Performance — 9/10 [Measured, local]

Lighthouse against the production build, six page types, mobile and desktop:

| Page | Mobile P / A11y / BP / SEO | LCP | Desktop |
|---|---|---|---|
| Homepage | 99 / 100 / 100 / 100 | 2.3s | 100 across, LCP 0.5s |
| Readings hub | 99 / 100 / 100 / 100 | 2.1s | 100 across, LCP 0.5s |
| Natal service | 99 / 100 / 100 / 100 | 2.0s | 100 across, LCP 0.4s |
| Sign page | 100 / 100 / 100 / 100 | 1.1s | 100 across, LCP 0.3s |
| Blog | 99 / 100 / 100 / 100 | 2.2s | 100 across, LCP 0.6s |
| Start Here | 99 / 100 / 100 / 100 | 2.3s | 100 across, LCP 0.5s |

TBT 0–10ms throughout, CLS 0.000 throughout. Doctype and charset present, no deprecated tags, all
images dimensioned.

**Reported and rejected:** `static_audit.py` flagged "1 script tag without async/defer — likely
render-blocking" on every page. **False positive.** The only non-JSON-LD script on any page is
`<script type="module">`, which is deferred by specification and does not block rendering. The
script checks for literal `async`/`defer` attributes and does not know about module semantics. The
measured TBT of 0ms independently confirms nothing is blocking.

**Real issue — 112 inline `style=` attributes on the homepage** (35 on a service page, 22 on a sign
page). The rubric penalises more than 10. They are almost all trivial repeated declarations:

| Count | Declaration |
|---|---|
| 32 | `margin: 0;` |
| 14 | `gap: var(--space-2);` |
| 11 | `color: var(--color-teal);` |
| 8 | `font-size: var(--text-lg); margin: 0;` |

Low severity for correctness — but they make a strict Content-Security-Policy impossible without
`unsafe-inline`, which defeats most of the point of having one.

**Fix — replace with utility classes in `src/styles/tokens.css`:**

```css
.m-0     { margin: 0; }
.mt-6    { margin-top: var(--space-6); }
.mt-auto { margin-top: auto; }
.mi-auto { margin-inline: auto; }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.c-teal  { color: var(--color-teal); }
.c-accent{ color: var(--accent-ink); }
.row     { display: flex; align-items: center; gap: var(--space-3); }
.row-sm  { display: flex; align-items: center; gap: var(--space-2); }
.stack   { display: flex; flex-direction: column; }
```

Then add the CSP to `public/_headers` once inline styles are gone:

```
/*
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

**Second real issue — no security headers at all.** There is no `public/_headers` file, so the
deployed site sends no `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` or HSTS.
Covered by the file in the CRITICAL section above.

Remaining Lighthouse opportunity is ~14KB of unused CSS on first paint. Real but small; splitting
the token sheet per route would cost more in maintainability than it returns. Not recommended.

---

## Priority order — quick wins first

Ordered by impact × effort, per the skill's instruction, not by category.

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Confirm Cloudflare built commit `3199d98`; add `public/_headers` with HTML `must-revalidate` + security headers | 10 min | **Critical** — nothing else is reviewable until staging is current, and stale HTML breaks every future content update |
| 2 | Emit `FAQPage` schema on the 7 service pages (28 Q&A pairs already written) | 20 min | **High** — the single largest AEO gain available; zero new content required |
| 3 | Add `public/llms.txt` | 10 min | Medium — cheap, and the site's structure is unusually well suited to it |
| 4 | Add `Article` schema with real `dateModified` to the 99 undated pages | 45 min | **High** — fixes the largest GEO signal gap and the Schema type gap in one change |
| 5 | `<fieldset>` + `<legend>` on the booking radio group | 5 min | Medium — real WCAG 1.3.1 defect on the conversion page |
| 6 | Expand `Person` schema with `sameAs`, `url`, `knowsAbout` | 10 min | Medium — lets engines resolve Mo to a real, citable person |
| 7 | Rewrite the 13 sign pages' section headings as questions | 1–2 hrs | **High** — highest-volume query class on the site, currently the least extractable |
| 8 | Add visible `Sources` sections to reference pages | 3–4 hrs | **High** for GEO and for integrity — currently 0 of 118 pages cite anything |
| 9 | Replace 112 inline styles with utility classes, then enable CSP | 2 hrs | Low-medium — maintainability and security posture, not user-visible |

Items 1–6 total roughly two hours and move AEO from 6 toward 8, GEO from 4 toward 7, Schema to 9–10
and ADA to a clean 10 on the automated floor. Items 7 and 8 are the ones that decide whether the
reference library actually gets quoted by AI search — which is, on the stated goal of being a source
of truth, the whole point.

## What this audit did not and could not check

Real-world Core Web Vitals from the Cloudflare edge on real devices. Any effect from Cal.com, GA4 or
MailerLite, none of which are wired in yet — all three will change the performance and privacy
picture. Keyboard-only navigation and screen-reader behaviour, which need a person. Whether alt text
is *appropriate* rather than merely present. Whether the astrological content is *correct*, which is
Mo's review to make, not an auditor's.

No claim of legal or WCAG compliance is made anywhere in this report.
