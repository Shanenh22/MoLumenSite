# Cal.com + Stripe Integration

Status: architecture defined; awaiting owner accounts (open-questions Q4). Verify each step against current Cal.com docs (cal.com/docs) at setup time — UI labels change.

## Owner setup
1. Create Cal.com account (username e.g. `mo-lumen`); set timezone America/Chicago; connect Google/Outlook calendar for conflict-checking.
2. Install the **Stripe app** in Cal.com (Apps → Stripe → connect the business Stripe account). Payment is then collected at booking before confirmation.
3. Create one **event type per confirmed service** (slug matching site service slugs: `natal`, `transit`, `synastry`, `horary`*, `further-out-in-the-sky`), each with duration, price + currency, buffer times, minimum notice, and rolling availability window. *Horary is a written reading — model as a paid "intake call/submission" event or a Stripe Payment Link; decide with owner.
4. Add **intake questions** per site brief §12 (name, email, optional phone, birth date, exact birth time, birth-time confidence, birth city/country, current location, optional pronouns, focus question, context, prior experience, optional accessibility needs, required booking-terms consent, separate optional marketing consent — never pre-checked).
5. Configure **workflows**: confirmation email, preparation email (link to /prepare-for-your-reading/), 24h reminder. Location: Zoom (or Cal Video) auto-generated link.
6. Set cancellation/reschedule policy to match /booking-policy.

## Site wiring
- `PUBLIC_CALCOM_USERNAME` and per-service `bookingEventId` (in `src/content/services/*.json`) drive the BookingEmbed component (Cal element embed, loaded on interaction).
- Fallback chain: embed → hosted `https://cal.com/{username}/{event}` (new tab, labeled) → `mailto:mo@molumen.com`.
- Analytics: `booking_start` (CTA click), `booking_embed_open`, `booking_external_fallback`. A completed-booking event is only tracked from Cal.com's redirect/webhook confirmation — never inferred.
- Privacy: intake answers exist only in Cal.com/Stripe/email. Never mirrored to analytics, storage, or URLs.

## TidyCal fallback (lower complexity, lower cost)
TidyCal ($29-ish lifetime at last check — verify) supports booking types with Stripe/PayPal payment and custom questions, but has weaker embed/workflow/webhook support. Migration path: same service data model; swap BookingEmbed's target URL; reduced automation (manual prep emails). Use only if Cal.com's pricing/complexity proves unacceptable to the owner.
