# Service Inventory — CONFIRMED (from live Acuity scheduler)

Confirmed by owner 2026-08-02 (pasted from molumen.com/appointments scheduler). This supersedes
both the marketing-page list and the Mo1 prototype list. Mo1's "Horary", "Further Out in the
Sky", and "Gift" offerings do NOT exist in the live scheduler and were removed from the build.

| Scheduler appointment type | Duration | Price | Site page |
|---|---|---|---|
| New Client Natal Chart Reading — 90 min | 1 h 30 m | $200 | /readings/natal/ (option) |
| New Client Natal Chart Reading — 60 min | 1 h | $150 | /readings/natal/ (option) |
| Want More Clarity — Estab. Client within 3 months | 1 h | $100 | /readings/want-more-clarity/ (option) |
| Want More Clarity — Estab. Client | 1 h | $130 | /readings/want-more-clarity/ (option) |
| Life Changes Astrological Consultation | 1 h | $130 | /readings/life-changes/ |
| Solar Return Reading | 1 h | $130 | /readings/solar-return/ |
| 1-on-1 Individualized Monthly Personal Transits | 30 m | $75/mo | /readings/monthly-transits/ |
| Relationship Astrology Consultation | 1 h 30 m | $275 | /readings/relationship/ |
| Quick Check-In — One Topic Only | 30 m | $60 | /readings/quick-check-in/ |

Modeling notes: appointment-type variants (natal 60/90; clarity ≤3 months / after) are one
service page each with an `options` array. `audience` field gates messaging: `new`
(natal), `established` (clarity, life-changes, solar-return, monthly-transits,
quick-check-in), `any` (relationship). Descriptions on the site are rewritten from the
scheduler's own copy. Cal.com event types should be created 1:1 with the scheduler rows,
using the `bookingEventId` slugs in `src/content/services/*.json`.

Remaining owner items: cancellation/rescheduling windows (booking policy), whether in-person
DFW sessions are still offered, and gift-reading mechanics (site currently routes gifting
through email).
