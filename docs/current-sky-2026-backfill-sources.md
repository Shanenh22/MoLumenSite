# Current Sky 2026 backfill — sources and verification

Prepared 2026-08-13 to restore the missing January-through-July 2026 Current Sky record.

## Scope

The backfill adds 26 published events dated from January 3 through July 29, 2026:

- 15 new/full moons, including the February 17 annular solar eclipse and March 3 total lunar eclipse
- 2 Mercury retrograde periods
- 5 major outer-planet stations
- 4 slow-planet sign ingresses

The already-published August 12 Leo solar eclipse is left unchanged.

## Date convention

The website's editorial calendar date is **America/Chicago**. Lunar phase instants were checked in Universal Time and converted to Central time before the date-only `start` value was chosen. This matters for events such as the March Pisces new moon, whose UT date is March 19 but whose Central-time date is March 18.

Every backfilled item sets `displayThrough` to its start date. That keeps the historical backfill in the archive/calendar instead of causing an old station with a long `end` range to reappear in the Current Sky "Next up" cards.

## Sources and method

- Lunar phase dates/times: U.S. Naval Observatory, Astronomical Applications Department, 2026 primary moon-phase table.
- Solar and lunar eclipse classification: NASA/GSFC eclipse catalog.
- Tropical zodiac longitude, planetary stations, and slow-planet ingresses: Swiss Ephemeris 2.10.03, using `swe_calc_ut()` with longitude speed and America/Chicago conversion.

All source details remain in each event's internal `sourceNote`; the public event page presents source-neutral astronomy/interpretation language.

## Editorial status

These entries are published because their purpose is to restore the historical calendar record requested by the owner. They retain `ownerReview: true`, consistent with the existing 2027 Current Sky set.
