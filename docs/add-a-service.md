# Add or Edit a Service

Services live in `src/content/services/`, one JSON file each. Service pages, the readings hub, comparison table, homepage cards, Reading Finder, and booking page all generate from these files — edit once, updated everywhere.

## Edit an existing service (e.g., set the real price)

Open the file (e.g. `natal.json`) and set:

```json
"price": 225,
"priceConfirmed": true,
```

While `priceConfirmed` is `false`, the site shows "pricing confirmed at booking" no matter what `price` says.

## Add a new service

1. Copy an existing file, e.g. `natal.json` → `solar-return.json`.
2. Update every field — `slug` must match the filename and be URL-safe (`solar-return`).
3. Set `bookingEventId` to the matching Cal.com event type slug.
4. Add the slug to other services' `related` arrays where appropriate.
5. Optionally feature it: `"featured": true` (homepage shows featured first).
   The page appears automatically at `/readings/<slug>/` and in every list.

## Retire a service

Set `"available": false` (keeps the page but removes booking), or delete the file (add a redirect in `public/_redirects` if the page was public for a while).

## Field reference

See `src/content.config.ts` — every field is validated at build time, so a typo'd field name fails the build with a clear message rather than publishing broken data.
