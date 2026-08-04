# Organic growth plan

Written 2026-08-04. The goal is impressions → clicks → bookings, with no ad budget.

## Where the site actually stands

Technical SEO is not the bottleneck. The audit scored SEO 9/10: zero duplicate titles, every title
within length, every page with a canonical and structured data, 129 pages, no broken links,
Lighthouse 99–100. Piling on more technical work has small returns.

The bottleneck is that **the site is not live on molumen.com yet**, and that its content covers what
Mo wants to say more than what people actually search for. Those are the two things worth attacking.

## Done this round

**Search engine verification.** `src/config/site.ts` has a `verification` block for Google, Bing and
Pinterest. Paste the token value only, not the whole meta tag; each renders only when non-empty.
Bing Webmaster Tools can import directly from Search Console, so do Google first and save a step.

**Share images — this was a bug.** `og:image` pointed at an SVG, and Facebook, LinkedIn, X, WhatsApp
and Slack all refuse to render SVG. Every share of this site appeared with no picture at all, which
silently suppressed click-through on every link anyone posted. There is now a branded 1200×630 PNG
(`npm run og:generate` rebuilds it), and blog and service pages use their own photograph instead.

**Sitemap `lastmod` and `priority`.** 100 of 128 URLs now carry a real last-modified date, taken from
the same git history used for `dateModified` — nothing invented. Without it, every URL looks equally
stale and a 129-page site gets crawled slowly. Priority marks the readings and booking pages as the
commercial ones.

**`Event` schema on all 15 sky events.** Dated astronomical events are eligible for Event rich
results — the surface that answers "when is the next full moon". Marked online and free, because
that is what the sky is.

**IndexNow.** `npm run seo:ping` pushes the sitemap's URLs to Bing, Yandex, Seznam and Naver
directly, rather than waiting to be crawled. Free, no account. Run it after a production deploy. It
refuses to run against staging. Google does not participate — that is what `lastmod` is for.

## The biggest unexploited opportunity: local

Mo offers in-person readings in Dallas–Fort Worth, and the site says so exactly once, in passing.

Local search has the highest commercial intent and the least competition of anything available here.
"astrologer in Dallas" is a query with a person on the other end who is ready to book, and it is
contested by a handful of local practitioners rather than by every astrology site on the internet.

What that needs, in order:

1. **A Google Business Profile.** Free, and it is the single highest-return thing on this entire
   document. It is not a code task, and no amount of code substitutes for it.
2. **`LocalBusiness` schema with a real address and service area.** The site currently emits
   `ProfessionalService` with no address, because none was supplied. A service-area business can
   list a city without publishing a home address — Mo should decide what she is comfortable with.
3. **One genuine local page**, not a doorway page per suburb. Something that says what in-person
   readings actually involve, where she meets clients, and what the DFW area means to her practice.

Blocked on Mo confirming her service area and what address detail she will publish.

## New pages worth building, ranked by impact ÷ effort

### 1. Rising sign pages — 12 pages

"Scorpio rising", "what does my rising sign mean" are high-volume, and the site already explains the
ascendant well without having a page per sign. Every ingredient exists in `src/data/signs.ts`:
ruling planet, element, modality, dignities. These are genuinely derivable rather than padded.

Highest confidence recommendation on this list.

### 2. Commercial-intent pages — about 6 pages

Low volume, very high intent, almost no competition:

- How much does an astrology reading cost?
- What to expect from your first astrology reading
- Natal chart vs birth chart — is there a difference? (there isn't; saying so plainly ranks)
- How to choose between a 60- and 90-minute reading
- Is an astrology reading worth it?
- What to ask an astrologer

These convert far better than reference traffic, because the person is already shopping.

### 3. Planet-in-sign pages — 120 pages

The largest volume on this list. "Venus in Scorpio", "Mars in Cancer" and their siblings are
searched constantly, and the site has the data to answer them properly — dignities, rulership,
sect, element and modality are all in `src/data/planets.ts` and `src/data/signs.ts`. Venus in
Scorpio being in detriment is a fact the repo already knows.

**The risk, stated plainly.** 120 template-filled pages is exactly the pattern Google's helpful
content system was built to demote, and doing this badly would damage the whole domain rather than
just fail. The difference between an asset and a liability is whether each page says something
specific and true that a reader could not get from the sign page alone.

If we do it: build 12 first (one planet across all signs), leave them up for a month, and look at
whether they earn impressions before generating the other 108. Do not ship 120 at once.

### 4. Planet-in-house pages — 120 pages

Same shape, same volume, same risk as above. Only worth starting after planet-in-sign has proven
itself.

### 5. Monthly sky pages — 12 a year

"August 2026 astrology" is searched every month and the traffic renews. The `sky-events` collection
and Current Sky already hold the data. This becomes worthwhile once Mo is publishing regularly,
because a stale monthly page is worse than none.

## What I would not do

**Sun-sign compatibility pages.** High volume, but they require asserting that Leo and Scorpio are
or are not compatible, which the site's own relationship blog post explicitly says astrology cannot
determine. Ranking for them would mean contradicting the position that makes this site
trustworthy.

**Birthday pages** ("born on 21 March"). 366 near-identical pages, thin by construction, and the
clearest possible doorway-page signal.

**Daily horoscopes.** Enormous volume, but it means publishing something every day forever, and the
site's own content argues that sun-sign forecasts are the least useful form of astrology.

## The uncomfortable part

Every item above is worth less than two things that are not code.

**The site is not live.** Nothing indexes, nothing accumulates authority, and every day of delay is a
day the domain is not aging. The current molumen.com still serves the Squarespace site.

**Nobody links to it.** Organic ranking is substantially about other sites vouching for yours, and
this domain has almost nothing pointing at it. For an astrologer, the realistic sources are the
professional bodies Mo already belongs to — NCGR, OPA, ISAR all have member directories — plus
podcast appearances, guest posts, and the astrologers she trained with. A handful of those is worth
more than another hundred pages.

I can build pages. I cannot make anyone link to them, and no amount of schema substitutes for that.

## Suggested order

1. Get the site live on molumen.com. Everything else compounds from that date.
2. Google Search Console and Bing Webmaster Tools; paste the tokens into `site.ts`.
3. Google Business Profile, and decide the address question.
4. Rising sign pages (12) and the commercial-intent pages (6).
5. Mo requests listings in the NCGR, OPA and ISAR member directories.
6. Measure for a month. Then decide about planet-in-sign on evidence rather than on hope.
