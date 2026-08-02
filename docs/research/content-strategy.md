# Content Strategy — becoming a source of truth for astrology

Date: 2026-08-02. Research basis: current astrology-search landscape, competitor topic
coverage, and the content clusters mandated in the project brief §4.

## What separates a reference site from a template site

Reviewing the field, authoritative astrology sites share four traits that template and
marketplace sites lack:

1. **Foundational depth, not just sign pages.** Elements, modalities, the big three, and the
   nodes are what let a reader actually *use* the sign pages. Most sites skip straight to the
   twelve signs and leave the grammar unexplained.
2. **Timing content that is dated and verifiable.** Retrogrades, eclipses, ingresses, Saturn
   returns — with real dates and a stated source. This is where thin sites are thinnest.
3. **Willingness to say what astrology cannot do.** Misconception and ethics pages are rare and
   are a strong differentiator for trust (and for E-E-A-T).
4. **Question-shaped pages.** Search behavior is interrogative ("what is my rising sign",
   "when is my saturn return", "is mercury retrograde bad"). Pages titled and structured as
   answers outperform encyclopedic entries.

## Gaps identified and closed (this round)

| Page | Why it matters |
|---|---|
| `/explore/the-big-three/` | Highest-volume beginner query; also the natural argument for why birth time matters |
| `/explore/elements-and-modalities/` | The missing grammar behind all twelve sign pages |
| `/explore/retrogrades/` | Perennial top-volume topic; our angle (review, not disaster) is a differentiator |
| `/explore/eclipses/` | Recurring seasonal search spike; explains the node connection |
| `/explore/lunar-nodes/` | Was only a glossary entry; underpins eclipses and purpose content |
| `/explore/moon-phases/` | Feeds the lunation letters and the newsletter cadence |
| `/explore/saturn-return/` | Very high volume, and demographically exact for Mo's clientele |
| `/explore/misconceptions/` | Brief §4 requirement; strong trust signal; answers hostile queries honestly |
| `/explore/questions-to-bring/` | Brief §4 requirement; directly improves booked-reading quality |
| `/current-sky/the-sky-in-2026/` | Timely authority: four outer-planet ingresses in one year, verified |

Explore hub restructured into three clusters — Foundations, Timing, Astrology in Practice — so
the library reads as a curriculum rather than a list.

## Verified facts used

2026 ingress dates were cross-checked against two independent astrological sources and are
internally consistent with the retrograde station data already on the site (Neptune and Saturn
retrograding within Aries; Uranus within Gemini; Jupiter within Leo). Recorded on the page with
a visible verification note. **No interpretive claim is presented as fact, and no date was
published from a single source.**

## Round 2 — reference-library depth (2026-08-02, later same day)

The 39 backbone pages (12 signs, 10 planets, 12 houses, 5 aspects) were ~300-word stubs — the
site's weakest asset and precisely what large competitors do best. Rebuilt as structured
reference articles averaging 520–660 words each, with a differentiator no major competitor
offers: **explicit epistemic labeling**.

### The labeling system
`src/components/Layers.astro` renders six visually distinct block types, applied throughout the
reference library:

| Label | Meaning |
|---|---|
| Astronomical fact | Verifiable physical claim (orbital periods, geometry, motion) |
| Traditional view | Pre-modern convention (Hellenistic/medieval), stated as convention |
| Modern view | 20th-century psychological astrology |
| Mo's synthesis | Her own practice and point of view, clearly owned |
| Where astrologers differ | Live disagreements between schools, named honestly |
| Common misconception | What people wrongly believe, corrected |

A reader always knows which kind of claim they are reading. This is the single strongest
trust signal available to an astrology site and it costs nothing to maintain, because the
labels are structural rather than editorial (no "last reviewed" dates to go stale).

### Structural data added
Signs now carry polarity, traditional and modern rulers, exaltation/detriment/fall, opposite
sign, glyph etymology, season, and an "at work" application. Planets carry orbital cycle,
retrograde frequency, sect, classification, full dignities, and planetary joy. Houses carry
angularity, natural sign and ruler, Latin name, opposite house, and joy. Aspects carry exact
degrees, typical orb ranges, and sign relationship.

### New reference pages (round 2)
Essential dignities (with the full Ptolemaic table, cross-verified), the four angles, house
systems compared, chart patterns, schools and traditions, and a nine-step **Start Here**
curriculum for beginners.

**Why dignities matter competitively:** traditional dignity is core to Mo's actual training
(STA horary certificate) and is almost entirely absent from mainstream astrology sites, which
inherited the 20th-century psychological turn away from it. It is genuine expertise the
competition structurally cannot copy without retraining.

## Recommended next round (not yet built)

1. **Chart-shape and dominance page** — stelliums, chart rulers, element balance. Natural
   follow-on to elements/modalities.
2. **Sign-by-sign transit landing pages** for the current era (e.g. "Uranus in Gemini in your
   chart") — high value while these ingresses are fresh, but needs Mo's interpretive voice.
3. **A history-of-astrology page** — Hellenistic → medieval → modern revival. Strong E-E-A-T
   signal; positions Mo's classical training in context.
4. **Per-sign rising-sign pages** — "Aries rising" etc. High volume; currently only covered
   generally.
5. **Annual "The Sky in 2027"** each December, following this year's template.
6. **Video transcripts** once Mo's YouTube list is supplied — searchable text from existing work.

## Standing rules for all new content

Every page must answer a real question, carry Mo's point of view, link to at least two related
pages and one service, avoid guaranteed outcomes and fear framing, and cite or flag any
astronomical date. Interpretation is always distinguishable from astronomy.
