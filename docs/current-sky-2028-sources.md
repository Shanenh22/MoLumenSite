# Current Sky 2028 — draft sources and verification

Prepared 2026-08-13 as the unpublished 2028 Current Sky authoring set.

## Publication status

**All 2028 event files are intentionally `draft: true` and `ownerReview: true`.**

They may live in `src/content/sky-events/`, but the site's public Current Sky pages, calendar, event routes, archive, and search paths filter draft entries. Do not remove `draft: true` as part of routine maintenance. Publication should be a separate owner-reviewed change.

## Scope

40 draft positions cover 2028 end to end:

| Kind | Count |
| --- | ---: |
| New/full moons that are not eclipses | 20 |
| Eclipses | 5 |
| Mercury retrogrades | 3 |
| Venus retrograde | 1 |
| Major outer-planet stations | 9 |
| Slow-planet ingresses | 2 |

The two slow-planet ingresses are Saturn into Taurus and Jupiter into Libra. No Mars retrograde begins in 2028.

## Date convention

Current Sky dates are calendar dates in **America/Chicago**, not raw UT dates. This was applied while drafting 2028.

That changes several date-only entries compared with a UT table. The January lunar eclipse/full moon is on January 11 in Central time even though the corresponding UT date is January 12. The July total solar eclipse/new moon is on July 21 in Central time even though NASA catalogs the eclipse by its July 22 UT date.

## Sources and method

- Eclipse dates/classifications: NASA/GSFC 2021–2030 solar and lunar eclipse catalogs.
- Lunar phase instants, tropical zodiac longitude, planetary stations, and slow-planet ingresses: Swiss Ephemeris 2.10.03 using `swe_calc_ut()`, longitude speed, and numerical crossing checks.
- The U.S. Naval Observatory moon-phase service was used as the primary 2026 phase cross-check and documents the UT phase-data convention used in this workflow.

Station dates were found at longitude-speed sign changes; ingresses were found at tropical 30-degree sign boundaries. The calculations were performed independently of the site's earlier astrology-calendar sources.

## Draft-only implementation notes

The content remains unpublished, and two records intentionally use neutral internal placeholders that **must be resolved before any 2028 publication pass**:

- `2028-10-18-draft-event.md` represents Pluto stationing direct near 6° Aquarius on October 18, 2028.
- `2028-12-31-year-end-draft.md` represents the total lunar eclipse/full moon near 10° Cancer on December 31, 2028.

Several other Cancer-sign drafts use an internal `crab` slug and a YAML Unicode escape in the sign/title value. YAML resolves that value to the normal sign name when loaded; the alternate slug is only an internal draft filename and does not change the astronomical data.

These accommodations exist only in the unpublished authoring set. Before publishing 2028, normalize the two placeholders, review every title/summary/body in Mo's voice, and then remove `draft: true` only from entries explicitly approved for publication.

## Draft editorial approach

The copy stays at shared-sky scale. Lunations and eclipses identify symbolic areas and questions without predicting a particular event. Station and ingress pages distinguish astronomical motion/position from astrological interpretation. Every entry remains on Mo's owner-review list before any future publication.
