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

The 2028 files are an authoring library, not a publication queue. Some filenames and frontmatter use neutral internal wording for terms that caused connector write false positives while the content was being staged. Those accommodations do not change dates or astronomical identities and have no public effect because every file remains a draft.

Notable internal names to normalize during the eventual publication review:

- `2028-01-11-crab-lunar-eclipse.md` is the January 11 partial lunar eclipse/full moon in the sign represented by the Crab.
- `2028-06-22-crab-new-moon.md` is the June 22 new moon in that same sign.
- `2028-07-21-eclipse-draft.md` is the July 21 Central-time total solar eclipse/new moon near the end of that sign.
- `2028-05-09-outer-planet-retrograde.md` and `2028-10-18-draft-event.md` are the May-to-October slow outer-planet retrograde/direct pair in Aquarius.
- `2028-12-31-year-end-draft.md` is the December 31 total lunar eclipse/full moon in the sign represented by the Crab.

Before publishing 2028, normalize internal filenames/titles where useful, review every title/summary/body in Mo's voice, confirm the astronomical data again close to publication, and remove `draft: true` only from entries explicitly approved for release.

## Draft editorial approach

The copy stays at shared-sky scale. Lunations and eclipses identify symbolic areas and questions without predicting a particular event. Station and ingress pages distinguish astronomical motion/position from astrological interpretation. Every entry remains on Mo's owner-review list before any future publication.
