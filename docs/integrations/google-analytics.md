# Google Analytics 4

## Current repository state

GA4 is already configured in `src/config/site.ts` with the owner-supplied public measurement ID `G-64N9EPKNTR`. `PUBLIC_GA4_ID` remains an optional override for previews or a different property.

`src/layouts/BaseLayout.astro` owns the analytics bootstrap and the single `window.mlTrack(name, params)` entry point. Components must not call `gtag` directly.

## Consent and privacy model

The GA4 loader is present when a measurement ID is configured, but consent defaults to denied for advertising and analytics storage. A returning visitor who previously granted analytics consent is upgraded synchronously from the saved `ml-consent-v1` choice; otherwise the consent banner controls the upgrade.

Advertising signals and ad personalisation are disabled. Analytics must never receive names, emails, phone numbers, birth dates, birth times, birthplaces, booking UIDs, intake free text, site-search queries, or rising-sign preference.

The shared `mlTrack` sanitiser drops strings that resemble email addresses, dates/times or long identifiers and caps strings at 100 characters. More importantly, sensitive features are designed not to pass those values to `mlTrack` in the first place. `npm run test:analytics`, `npm run test:booking`, `npm run test:birthtime`, `npm run test:rising`, and the search browser regression collectively protect those boundaries.

## Funnel events currently used

The current implementation includes privacy-safe events such as:

- `booking_cta_click` — service event key plus source pathname only
- `booking_start`
- `booking_preselected` — enumerated requested service/event labels only
- `booking_embed_open`
- `booking_external_fallback`
- `booking_embed_failed`
- `booking_complete` — emitted only from Cal.com's `bookingSuccessfulV2` callback and carries only the selected service key
- Reading Finder step/recommendation events using enumerated answers
- newsletter CTA/signup-intent events using the configured source label
- other interactive feature events covered by their regression tests

Do not maintain a hand-written exhaustive event dictionary here; the code and tests are authoritative and change more often than this guide.

## Booking completion attribution

`booking_complete` is implemented. `BookingEmbed.astro` registers Cal.com's `bookingSuccessfulV2` callback once. The callback deliberately does **not** read Cal.com's payload because that payload can contain attendee identity, phone, booking identifiers, appointment details and the site's sensitive intake answers. Attribution uses the selected server-rendered booking service key instead.

Repository tests can prove that the callback and privacy boundary work against the mocked Cal embed. They cannot prove that the live Cal.com account emits the callback after a real paid booking or that the production GA4 property receives the event. That remains an owner/account launch test.

## Owner launch test

1. Open staging in a private/incognito window and reject analytics. Confirm the site remains usable and no analytics cookies are stored.
2. Reopen or use Cookie choices, grant analytics, and confirm GA4 receives a normal page view.
3. Start from a reading page or Reading Finder result, click through to `/book/`, load Cal.com, and complete the approved end-to-end test booking.
4. In GA4 Realtime/DebugView, confirm the sequence includes the relevant booking entry event(s) and exactly one `booking_complete`.
5. Inspect the `booking_complete` parameters. The only visitor-context value should be the enumerated service key; no name, email, phone, birth data, free text, booking UID, search query, or rising-sign value may appear.
6. Revoke analytics through Cookie choices and confirm subsequent navigation honors the denied state.

Do not mark GA4 launch-ready until the live property has received and been inspected for this flow.
