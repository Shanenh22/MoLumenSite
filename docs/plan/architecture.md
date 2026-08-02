# Architecture Plan — Mo Lumen Astrology Rebuild

Date: 2026-08-02. Phase 2 deliverable. Companion: `open-questions.md`, `../research/*`.

## 1. Sitemap

Adopts the brief's §8 structure, reconciled with Mo1's proven IA. Trailing-slash URLs.

```
/
├─ /readings/                       hub + comparison + finder invitation
│  ├─ /readings/natal/              (one page per confirmed service)
│  ├─ /readings/transit/
│  ├─ /readings/synastry/
│  ├─ /readings/horary/
│  ├─ /readings/further-out-in-the-sky/
│  └─ /readings/gift/
├─ /reading-finder/                 interactive tool 1
├─ /book/                           booking landing (Cal.com embed + fallback)
├─ /how-readings-work/              (absorbs Mo1 what-to-expect)
├─ /prepare-for-your-reading/
├─ /frequently-asked-questions/
├─ /about/          /approach/      /credentials/      /testimonials/
├─ /explore/                        education hub ("Explore Astrology" in nav)
│  ├─ /explore/birth-chart-basics/
│  ├─ /explore/planets/ (+10 children)
│  ├─ /explore/signs/ (+12)
│  ├─ /explore/houses/ (+12)
│  ├─ /explore/aspects/ (+5)
│  ├─ /explore/transits/
│  ├─ /explore/relationships/
│  ├─ /explore/personal-purpose/
│  └─ /explore/glossary/
├─ /tools/explore-your-chart/       interactive tool 2
├─ /current-sky/                    hub + timeline (interactive tool 3)
│  ├─ /current-sky/events/[slug]/   dated articles (incl. migrated lunation posts)
│  └─ /current-sky/archive/
├─ /horoscopes/                     rising-sign guidance index (from lunation format)
├─ /articles/  /articles/[slug]/    evergreen essays
├─ /videos/                         video center (4 category collections)
├─ /newsletter/                     lead-magnet landing
├─ /resources/  /courses/  /guides/ (courses+guides = interest pages, no fake products)
├─ /contact/
├─ /privacy/ /terms/ /disclaimer/ /accessibility/ /booking-policy/
└─ /404/
```

Mo1 deltas: `/membership/` dropped (not in approved architecture — owner may revisit); Mo1 `/learn/*` becomes `/explore/*`; Mo1 legal subpaths flatten to the brief's five policy URLs, with consultation-agreement + recording-consent content folded into /booking-policy pending owner decision (Q8).

## 2. Navigation model

Desktop (compact, one dropdown level): Readings ▾ · Explore Astrology ▾ · Current Sky · Videos · About Mo · **Book a Reading** (button). Footer carries the full taxonomy (Readings / Learn / Site / legal+newsletter), mirroring Mo1's proven footer. Mobile: full-screen accessible drawer, grouped sections with disclosure buttons, Book a Reading pinned visible; meets all §20 requirements. Both driven by `src/config/navigation.ts` only.

## 3. Content models (Astro content collections, zod-validated)

- `services` (JSON): all fields from brief §10 (see service-inventory.md §D).
- `articles` (MDX): title, description, slug, publishDate, updatedDate, category, tags, hero, related[], draft, ownerReview flag.
- `skyEvents` (MDX + data): brief §15 fields (title, type, start/end, tz, planets, sign, summary, body?, featured, displayThrough, sourceNote, lastVerified).
- `videos` (JSON): brief §16 fields (platform, externalId, title, description, category, thumbnail, publishedDate, duration?, featured, transcriptStatus, related[]).
- `glossary` (JSON/MD): term, definition, related terms, links.
- `explore` (MDX): educational pages with cluster/parent metadata for breadcrumbs + prev/next.
- `testimonials` (JSON): quote, attribution (first name + last initial only, never invented), approved: boolean (unapproved never rendered in production builds).
- `faqs` (JSON): question, answer, scope (global | per-service).
- `legal` (MDX): body + reviewStatus frontmatter ("attorney-review-required" until cleared).
- Future-ready models (defined, unpopulated): `courses`, `guides`.
- Config data: `site.ts` (brand, URLs, contact, socials, analytics ID env-read), `navigation.ts`, `seo-defaults.ts`, `integrations.ts` (Cal.com username/event slugs, MailerLite form IDs, YouTube/Instagram identifiers — all env-driven).

## 4. Component plan (Astro components; islands only where marked ⚡)

Chrome: BaseLayout, SEOHead (canonical/OG/JSON-LD), Header, MobileNav ⚡(minimal vanilla JS, focus-trap), Footer, Breadcrumbs, SkipLink.
Content: Prose, PageHero, SectionHeading, Card family (ServiceCard, ArticleCard, VideoCard, PathwayCard), ComparisonCards (stacked on mobile; table ≥768px with proper th/scope), FAQAccordion (native details/summary), TestimonialBlock, PriceBadge ("to be confirmed" variant), CTABand, NewsletterForm ⚡(fetch to MailerLite adapter; works no-JS via form action), Callout, Timeline.
Booking: BookingEmbed ⚡(Cal.com element embed, consent-gated load, hosted-page fallback link), BookingSummary (price/duration/format recap), PolicyNotice.
Tools: ReadingFinder ⚡(finite-state quiz, session-only state, ARIA live announcements, no-JS fallback = comparison section), ChartExplorer ⚡(SVG wheel, keyboard-navigable segments, reduced-motion aware, no birth-data inputs), SkyTimeline ⚡(filterable list/timeline from skyEvents; no-JS = chronological list).
Media: VideoFacade ⚡(thumbnail + play → youtube-nocookie iframe; Instagram = labeled external link), SocialImage templates.
Analytics: one `analytics.ts` adapter exposing `track(event, safeParams)`; GA4 loads only when `PUBLIC_GA4_ID` present; param whitelist enforced in the adapter.

## 5. Design tokens (`src/styles/tokens.css`)

Palette (from approved moodboard direction): ivory `#FAF6EE`, parchment `#F3ECDD`, stone `#E5DFD3`, navy `#1E2A45` (primary text/surface-dark), muted blue `#5B6E8F`, antique gold `#B08D45`, clay `#B26A4C`, warm brown `#6B5644`, blush `#E8D5C8`; semantic aliases (bg, surface, ink, accent, link) + AA-verified pairings documented alongside. Type: editorial serif for headings (e.g., Fraunces or Source Serif 4, self-hosted, OFL-licensed), humanist sans for body/UI (e.g., Inter or Source Sans 3); modular scale 1.2 mobile / 1.25 desktop; fluid clamp() sizes. Spacing 4px base scale; container widths 68ch prose / 1120px wide; radius 4/8/16; 1px hairline borders in stone; two shadow levels max; motion tokens (150/250ms, reduced-motion kills all non-essential transitions); breakpoints 480/768/1024/1280. Focus indicator: 2px gold outline + 2px offset on navy, never removed.

## 6. Booking flow (Cal.com + Stripe)

Service page → `/book/?service=natal` (context panel: price, duration, format, required info, policies + consent to booking terms) → Cal.com embed (event type per service; tz auto-detected and displayed; intake questions configured per §12; Stripe payment required at booking) → Cal.com confirmation + calendar invite → workflow emails (confirmation, preparation, reminder) → reschedule/cancel via Cal.com links. Fallbacks in order: embed → hosted cal.com page (new tab, labeled) → email mo@molumen.com. Analytics: booking_start, booking_embed_open, booking_external_fallback; completion only via Cal.com webhook/redirect page if reliably available. TidyCal fallback path documented in integrations doc. Intake privacy: birth data lives in Cal.com/email only — never in repo, GA, localStorage, or URLs (enforced + QA-checked).

## 7. Tool flows

**Reading Finder**: 3–4 plain-language questions (situation → experience → answer-type → birth-data availability); deterministic mapping to confirmed services only; result = why-it-fits + price + duration + required info + alternative + book/details links; back/restart/progress/keyboard/SR announcements; session-only state; closing line: "You're welcome to choose any reading."
**Explore Your Chart**: static SVG wheel (12 houses, sign ring, planet glyph chips); selecting any element (click/keyboard) opens a plain-language explainer panel (planet=drive, sign=style, house=arena, aspect=relationship) with deep links into /explore/; explicit "this is education, not your personal chart" note; optional owner-approved external calculator links (Q10).
**Current Sky Timeline**: renders `skyEvents` grouped by month with type filters (lunation/eclipse/retrograde/ingress/aspect); informational vs. "Mo's take" clearly separated; maintenance = edit one data folder (documented in update-current-sky.md).

## 8. Image & asset plan

Originals to generate (SVG, token-palette, currentColor where sensible): 5 hero illustrations (home, readings, learn, current sky, videos — celestial line-art, no text baked in); 12 zodiac icons; 12 functional icons (natal chart, transits, relationships, question, purpose, timing, insight, choice, compassion, growth, practical wisdom, individual path); 6 decorative celestial illustrations; 4 background textures; Reading Finder / Chart Explorer / Sky Timeline visual systems; OG social template; favicon + app-icon family.
Photo report (owner action): request full-resolution originals of (1) "standing with shelf background, blue shirt" (about/hero candidate), (2) "close up blue shirt on couch" (homepage), (3) "water on jetty" (nature/values section); current Squarespace crops ≤1500w are usable but not ideal for hero at 2x. Unsplash images: do not migrate. Family photo: owner permission before reuse. No artificial portraits of Mo, ever.

## 9. Redirect strategy

See `../research/url-inventory-redirect-map.md`; implemented as `public/_redirects` on Cloudflare Pages; tested pre-launch; DNS untouched until staging approval (§28 Phase 6).

## 10. Technical plan

Astro (current stable at scaffold time) + TypeScript strict; content collections as §3; zero-JS baseline with five islands (mobile nav, finder, explorer, timeline, video facade, newsletter/booking embeds); Prettier + ESLint + astro check; pa11y-ci + linkinator in CI; Cloudflare Pages (static output) for staging + production; `.env.example` documents every variable; no database, no paid CMS; Decap-compatible content layout (markdown + JSON in `src/content/`, config stub documented but not wired).
