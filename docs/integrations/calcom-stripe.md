# Cal.com + Stripe

**Status:** site side is built and live. Awaiting Mo's Cal.com account — until
`PUBLIC_CALCOM_USERNAME` is set, `/book/` shows an "online scheduling is being set up" card with a
mailto link instead of a calendar, and promises nothing that isn't true.

Verify each step against current Cal.com docs at setup time; their UI labels change.

## Why Cal.com

Checked against YouCanBook.me on 2026-08-03. The two free tiers are not comparable for this
practice. Cal.com's free plan takes **both Stripe and PayPal** and allows **unlimited event types**.
YouCanBook.me's free plan is **Stripe only** with **one booking page**, and removing their branding
requires the Team tier. Mo uses Stripe and PayPal, and needs nine event types. Cal.com free covers
it at no cost; the paid Teams tier ($12/user/month) only becomes relevant if a second practitioner
joins.

## Owner setup

**1. Create the account.** The username becomes part of every booking URL — `mo-lumen` or similar.
Set the timezone to America/Chicago and connect Mo's Google or Outlook calendar so real commitments
block availability.

**2. Install the Stripe app** (Apps → Stripe) and connect the business Stripe account. Payment is
then taken at booking, before the slot is confirmed. This is what makes the 48-hour cancellation
policy enforceable rather than aspirational — with nothing collected up front, a no-show costs Mo
the slot and the preparation with no recourse.

**3. Create nine event types**, with these exact slugs. The site maps to them by slug; a mismatch
sends visitors to a Cal.com 404.

| Event slug         | Reading                                           | Duration        | Price | Who may book |
| ------------------ | ------------------------------------------------- | --------------- | ----- | ------------ |
| `natal-90`         | Natal Chart Reading — the full tour               | 90 min          | $200  | new clients  |
| `natal-60`         | Natal Chart Reading — the essentials              | 60 min          | $150  | new clients  |
| `relationship`     | Relationship Astrology Consultation               | 90 min          | $275  | anyone       |
| `clarity-3mo`      | Want More Clarity — within 3 months of your natal | 60 min          | $100  | established  |
| `clarity`          | Want More Clarity — more than 3 months after      | 60 min          | $130  | established  |
| `life-changes`     | Life Changes Astrological Consultation            | 60 min          | $130  | established  |
| `solar-return`     | Solar Return Reading                              | 60 min          | $130  | established  |
| `monthly-transits` | Monthly Personal Transits — 1-on-1                | 30 min, monthly | $75   | established  |
| `quick-check-in`   | Quick Check-In — One Topic                        | 30 min          | $60   | established  |

Set buffers, minimum notice, and a rolling availability window per event. Location: Zoom or Cal
Video, auto-generated.

**4. Intake questions.** Name, email, optional phone, birth date, exact birth time, birth-time
confidence, birth city and country, current location, optional pronouns, the focus question,
context, prior experience, optional accessibility needs, a required booking-terms consent, and a
**separate, never pre-checked** marketing consent.

**5. Workflows.** Confirmation email; a preparation email linking to `/prepare-for-your-reading/`;
a 24-hour reminder.

**6. Cancellation settings** must match `/booking-policy/`: 48 hours, credit inside the window. If
the two ever disagree, the published policy is what a client will hold Mo to.

**7. Set `PUBLIC_CALCOM_USERNAME`** in the Cloudflare project's environment variables. The calendar
appears on the next deploy. Nothing else needs changing.

## How the site side works

`src/components/BookingEmbed.astro` owns it. Three things about it are deliberate.

**The embed loads only when the visitor presses "Show available times."** Cal.com's script is a
third party; loading it for everyone who merely reads the booking page would put a tracker-capable
script in front of people who never intended to book, and would cost the performance budget. Gated
this way, `/book/` measures Lighthouse 100 across all four categories with CLS 0.

**Nothing sensitive goes in the URL.** No birth date, birth time, birthplace, name, or email is ever
passed to the embed. Cal.com collects that on its own form over HTTPS. The project brief forbids
birth data in URLs, and this is the one component where prefilling it would be tempting.

**It degrades in three steps**, each keyboard-reachable: inline embed → direct Cal.com link in a new
tab → plain email to Mo. The email path is visible _before_ anything loads, because referral clients
frequently prefer to talk first and should not have to hunt for it.

Readings with more than one length or price — natal, and the clarity follow-up — render a second
picker so the visitor books the variant they actually want. Before this existed, `/book/` always
sent people to `natal-90` at $200; the 60-minute reading at $150 could not be booked from the site
at all.

Service pages link through as `/book/?service=<slug>`, which pre-selects that reading.

## Analytics

`booking_start` on page view, `booking_embed_open` when the calendar is loaded,
`booking_external_fallback` on the direct-link click, and `booking_embed_failed` if Cal.com does not
render. A completed booking is only ever recorded from Cal.com's own confirmation — never inferred
from a click.

Intake answers exist in Cal.com, Stripe, and email. They are never mirrored into analytics, browser
storage, or URLs.

## If Cal.com stops being the right answer

The service data model is tool-agnostic: every reading carries a `bookingEventId`, and multi-price
readings carry one per option. Swapping providers means changing the URL construction in
`BookingEmbed.astro` and re-pointing those IDs. Nothing else in the site knows or cares which
scheduler is in use.
