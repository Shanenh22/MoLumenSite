# Google Analytics 4

The site must run cleanly with **no** measurement ID configured (default state).

## Enabling
1. Create a GA4 property; copy the measurement ID (`G-XXXXXXX`).
2. Set `PUBLIC_GA4_ID` in the Cloudflare Pages environment (staging and production separately).
3. Redeploy. The tag loads only when the variable is present, deferred, after consent where required.

## Event dictionary (implemented via the single `analytics.ts` adapter — no inline gtag calls in components)
reading_finder_start · reading_finder_complete · reading_recommendation_view · service_view · booking_start · booking_embed_open · booking_external_fallback · newsletter_signup · lead_magnet_request · video_play · video_platform_open · chart_explorer_start · chart_explorer_interaction · current_sky_filter · contact_submit

Allowed params per event are whitelisted in the adapter (service slug, category, filter type, platform). **Never sent:** names, emails, phones, birth date/time/location, intake free text, finder answers' free text. The adapter drops any non-whitelisted param at runtime.

Booking completion: only if Cal.com provides a reliable redirect/webhook signal; otherwise absent — never inferred from an embed close.
