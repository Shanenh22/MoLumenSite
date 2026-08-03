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
