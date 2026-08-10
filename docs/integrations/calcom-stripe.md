# Cal.com + Stripe

## Current repository state

The site-side booking integration is built and configured. `src/config/site.ts` defaults the public Cal.com handle to `molumen`, and `src/config/booking.ts` plus the service records own the nine event mappings, prices, durations and visitor eligibility rules. `PUBLIC_CALCOM_USERNAME` remains an optional override for previews/tests.

The remaining launch work is inside the Cal.com and Stripe accounts, not in the booking URL construction. Follow `docs/calcom-setup-for-mo.md` for the current owner-facing Cal.com checklist and `docs/calcom-owner-actions.md` for the evidence/history behind it.

Verify each account setting against the current Cal.com/Stripe UI at setup time; vendor labels can change.

## Required event types

The site expects these exact Cal.com slugs. A mismatch sends the visitor to the wrong or missing event.

| Event slug | Reading | Duration | Price | Who may book |
| --- | --- | --- | --- | --- |
| `natal-90` | Natal Chart Reading — the full tour | 90 min | $200 | new clients |
| `natal-60` | Natal Chart Reading — the essentials | 60 min | $150 | new clients |
| `relationship` | Relationship Astrology Consultation | 90 min | $275 | anyone |
| `clarity-3mo` | Want More Clarity — within 3 months of your natal | 60 min | $100 | established |
| `clarity` | Want More Clarity — more than 3 months after | 60 min | $130 | established |
| `life-changes` | Life Changes Astrological Consultation | 60 min | $130 | established |
| `solar-return` | Solar Return Reading | 60 min | $130 | established |
| `monthly-transits` | Monthly Personal Transits — 1-on-1 | 30 min, monthly | $75 | established |
| `quick-check-in` | Quick Check-In — One Topic | 30 min | $60 | established |

## Account-side launch requirements

1. **Calendar/availability:** connect Mo's real calendar, verify America/Chicago as the organizer timezone, and confirm buffers, minimum notice and rolling availability for every event type.
2. **Locations:** all nine event types must offer **Zoom Video + Attendee phone number**. Remove the current/legacy custom attendee location. Do not expose organizer phone and do not add self-service in-person booking.
3. **Booking questions/intake:** use the service-appropriate question set in `docs/calcom-setup-for-mo.md`. New-client/relationship readings collect the birth details needed to prepare; established-client readings ask only the documented focus question. Hide the stock “What is this meeting about?” field where it is visible. Do not add broader intake fields from historical plans unless Mo deliberately approves them.
4. **Quick Check-In:** verify its Cal.com description matches the Quick Check-In service rather than Monthly Personal Transits.
5. **Stripe:** connect the correct business Stripe account and require the advertised price at booking for every event type. Verify currencies/payment methods and that no test-mode account is attached to the launch event types.
6. **Policies:** Cal.com cancellation/rescheduling settings and confirmation copy must agree with the published Booking Policy.
7. **Workflows:** verify booking confirmation, preparation instructions linking to `/prepare-for-your-reading/`, and reminder delivery. The repository cannot prove email/workflow delivery.

## How the site side works

`src/components/BookingEmbed.astro` owns the handoff.

- Cal.com loads only after the visitor presses **Show available times**; merely reading `/book/` does not load the third-party embed.
- No birth date, birth time, birthplace, name, email or other intake content is put in the URL.
- The fallback path is inline embed → direct Cal.com event link → email.
- Multi-option readings preserve the visitor's price/duration choice rather than guessing eligibility.
- `/book/?service=<event>` preselects only allowlisted, server-rendered event keys.

## Analytics/privacy

The funnel records `booking_start`, the relevant selection/embed events, and `booking_complete` from Cal.com's `bookingSuccessfulV2` confirmation callback. The completion callback never reads Cal.com's payload; it reports only the selected enumerated service key. Intake answers stay in the booking/payment workflow and are not mirrored into site analytics, browser storage or URLs.

## End-to-end launch test

Code tests prove the site handoff and privacy behavior, but they cannot prove the external account chain. Before production cutover, complete one controlled booking that exercises:

**visitor → service or Reading Finder → `/book/` selection → date/time → Zoom/Phone choice → intake questions → Stripe payment → Cal.com confirmation → calendar event → preparation email → reminder workflow → GA4 `booking_complete`.**

Use a hidden/duplicate test event or another owner-approved method that avoids an unintended real charge/appointment. If a real payment is intentionally used, verify the Stripe payment and refund/cleanup explicitly.
