# Update Current Sky

Events live in `src/content/sky-events/`, one Markdown file each, named `YYYY-MM-DD-short-name.md`.

## Add an event

```markdown
---
title: "New Moon in Capricorn"
eventType: lunation # lunation | eclipse | retrograde | ingress | aspect | other
start: 2027-01-07
timezone: "America/Chicago"
planets: ["Sun", "Moon"]
sign: "Capricorn"
summary: "One or two sentences shown on the timeline."
featured: false
sourceNote: "Where you verified the date (site + date checked)."
lastVerified: 2026-12-28
---

Optional longer letter in Markdown — your interpretation, rising-sign guidance, etc.
```

**Verify dates against a reliable ephemeris before publishing, and record the source in `sourceNote`.** The timeline automatically separates your interpretation from the factual data line.

## Retire old events

Nothing to do — past events drop off the main timeline automatically and remain in the archive. Delete a file only if it was wrong.

## The event type now does three jobs

`eventType` used to control only which coloured label appeared beside an event in the
timeline. It now also decides:

- which **filter button** the event appears under on `/current-sky/` and on the new
  `/current-sky/calendar/` — the filters are built from the types actually in use, so
  picking a type nothing else uses will create a filter button of its own;
- the **colour and short label** on the calendar grid.

Nothing breaks if you pick the wrong one — the event still publishes and still links
correctly — but it will be filed under the wrong heading in two places. `New or Full
Moon`, `Eclipse`, `Retrograde / station` and `Ingress` are the four in use.

Stations that turn a planet **direct** are filed under `Retrograde / station`, the same
as the station that began the retrograde. That is deliberate and is why the label says
"station".

## Where an event shows up once it is published

- `/current-sky/` — the timeline, with your summary underneath it
- `/current-sky/calendar/` — the month grid, title and date only
- `/current-sky/archive/` — everything, newest first
- `/horoscopes/` — new moons and eclipses only, with rising-sign guidance
- the homepage — the next three

You do not have to do anything for those; they all read the same file.
