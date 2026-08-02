# Service Inventory — Requires Owner Confirmation

Two conflicting owner-originated service lists exist. **No new services will be invented; the canonical list below must be confirmed by the owner before launch.** Until then the build uses the Mo1 list (most recent owner-supplied direction) with prices marked as unconfirmed placeholders, never displayed as final.

## A. Live site (molumen.com/services-2) — no prices published

1. Natal Chart Astrological Consultation — 90 min recommended; dominant life themes + current triggers
2. Solar Return Astrological Consultation — recommended after a natal reading; the year ahead from the solar return
3. Life Changes Astrological Consultation — career, family, residence transitions
4. Relationship Astrological Consultation — synastry + composite, two people

## B. Mo1 reference (owner-built prototype) — placeholder prices

| Service | Slug | Duration | Price* | Birth data | Notes |
|---|---|---|---|---|---|
| Natal Reading | natal | 90 min | $225 | date/time/place | "start here"; recording + printed chart; Zoom/phone/in-person DFW by inquiry |
| Transit Reading | transit | 60–75 min | $185 | yes | timing / year ahead |
| Relationship Reading (Synastry) | synastry | 90 min | $245 | both people | couples, family, business |
| Horary — One Question | horary | written, within a week | $125 | none | traditional horary; no birth data |
| Further Out in the Sky | further-out-in-the-sky | 75 min | $205 | yes | dwarf-planet signature work |
| Gift a Reading | gift | — | — | — | gifting mechanics page |

*Mo1 marks all prices "Placeholder prices for design review — final pricing confirmed at booking."

## C. Reconciliation questions (blockers for service-page finalization)

1. Is the canonical list A, B, or a merge? (Does "Transit Reading" replace/absorb "Solar Return" and "Life Changes"? Mo1's natal page still mentions "an annual solar-return check-in" as a follow-up.)
2. Real prices for every service.
3. Cancellation/rescheduling windows (live ToS has only a 30-day refund clause).
4. Session platform (Zoom?), recording delivery method, printed-chart delivery method.
5. Horary scope/turnaround and whether it's async-only.
6. In-person DFW offering: real, and under what conditions?
7. Gift readings: mechanics (voucher? scheduling by recipient?).

## D. Data model

Every confirmed service will be stored in `src/content/services/*.json` conforming to the schema in `docs/plan/architecture.md` §Content models, covering all fields required by the brief (name, shortName, slug, purpose, method, bestFor, notFor, duration, price, currency, format, birthDataRequired, intake, includes, deliverables, preparation, cancellationPolicy, reschedulingPolicy, bookingEventId, related, relatedLearn, featured, available).
