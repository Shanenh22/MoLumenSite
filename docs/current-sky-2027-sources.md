# Current Sky 2027 — sources and verification method

Written 2026-08-07, when the 2027 window was researched and published. Read this
before extending the calendar into 2028, because the method matters more than
the dates.

## Why this file exists

`/current-sky/` is the one asset on this site that no comparable astrologer
publishes: a dated, sourced calendar with rising-sign guidance on every
lunation. Its value is entirely in being right. A single wrong date does more
damage than a missing month, because the whole position of the site is that it
does not fake things and that a reader can check it.

So every entry has a `sourceNote` naming where the figure came from and a
`lastVerified` date, and this file records what was cross-checked against what.

## What was published

40 events covering 2027 end to end:

| Kind | Count | Notes |
| --- | ---: | --- |
| Lunations | 20 | New and full moons that are not eclipses |
| Eclipses | 5 | 2 solar, 3 lunar |
| Mercury retrogrades | 3 | Stations only, with `end` set to the direct station |
| Mars retrograde | 1 | Jan 10 – Apr 1, the only one until 2029 |
| Outer-planet stations | 10 | Jupiter, Saturn, Uranus, Neptune, Pluto |
| Ingresses | 1 | Jupiter into Virgo, 26 July |

Deliberately **not** included: minor aspects, Moon void-of-course periods, and
personal-planet ingresses. The editorial model is collective sky events a reader
could reasonably plan around, not an ephemeris dump. Adding every square and
trine would bury the events that matter and would be volume for its own sake.

## Sources

| Data | Source | Cross-check |
| --- | --- | --- |
| Lunation dates, times, degrees, signs | cafeastrology.com 2027 moon phases (ET) | astro-seek.com and truenortharts.com 2027 lunar calendars |
| Eclipse types and magnitudes | NASA GSFC eclipse catalogue | timeanddate.com 2027 eclipse list |
| Planetary stations and ingress | cafeastrology.com 2027 planetary overview (ET) | — |

Cafe Astrology and TrueNorth were already the sources cited by the 2026 entries,
so this window stays consistent with what the site has published before.

## Cross-check performed

Every lunation date, degree and sign in the first five months was compared
across two independent sources and agreed in all cases — for example 7 Jan at
17°18′ Capricorn, 22 Jan at 2°15′ Leo, 6 Feb at 17°38′ Aquarius, 20 Feb at
2°05′ Virgo, 6 May at 15°43′ Taurus. Because the two tables agreed everywhere
they overlapped, the remainder of the Cafe Astrology table was accepted.

**Time zone.** The sources publish in Eastern Time; the site presents dates in
`America/Chicago`. The only case that would change a calendar date is an event
timed between 00:00 and 00:59 ET, which falls on the previous day in Central. No
2027 lunation falls in that window — the earliest is 8 March at 04:29 ET — so
every published date is identical in both zones. **This does not hold
automatically for a future window. Check it again.**

## One conflict, and how it was resolved

The 18 July 2027 lunar eclipse is listed differently by different sources.
timeanddate.com calls it an "almost" eclipse and states it is not visible from
anywhere on Earth; NASA's catalogue classifies it as penumbral with a magnitude
of **0.0014**, meaning the Moon grazes the very outermost edge of Earth's
shadow.

Both are correct, and the disagreement is a labelling one. The entry says so
explicitly rather than picking a side, because astrological calendars will list
this as an eclipse and it is astronomically almost nothing — which is exactly
the fact-versus-doctrine distinction the reference library is built on.

## Editorial notes for 2027

Two facts shaped the writing and are worth carrying forward:

1. **No outer planet changes sign all year.** Saturn and Neptune are both in
   Aries, Uranus in Gemini, Pluto in Aquarius, for the whole of 2027. Jupiter
   entering Virgo on 26 July is the only ingress of any slow planet. After
   several years of thresholds this is a genuinely settled sky, and several
   entries say so.
2. **All three Mercury retrogrades cross a sign boundary backwards** — Pisces
   into Aquarius, Cancer into Gemini, Scorpio into Libra. A real pattern, worth
   naming once rather than in all three entries.

Saturn and Neptune sharing Aries all year is unusual and interesting. The
entries note it and deliberately stop short of interpreting it heavily, because
that is Mo's call, not the researcher's.

## Maintenance

`npm run test:content` now enforces the horizon: it **fails** below 90 days of
future coverage and **warns** below 365. At publication this window reported 507
days. The next research pass should begin when the warning appears, not when the
failure does.

## Still needs Mo

All 40 entries carry `ownerReview: true`. They are drafted from verified data in
her established voice, but they are interpretive content published under her
byline and belong on the same review list as the blog posts and the rising-sign
lunation guidance.
