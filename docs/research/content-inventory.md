# Content Inventory — molumen.com and Mo1 Reference

Date of audit: 2026-08-02
Auditor: Claude (rebuild project, Phase 1)

## 1. molumen.com (live Squarespace site)

Source: `https://molumen.com/sitemap.xml` (54 URLs) plus page-by-page review.

### 1.1 Pages with real content (migrate/rewrite)

| URL | Content | Disposition |
|---|---|---|
| `/` | Brand statement, positioning ("modern-day astrologer with a classical lens"), services teaser, "There is fate and there is choice", social links, newsletter signup | Rewrite for new homepage |
| `/about` | Full bio: "HELLO! I'M MAUREEN … a.k.a. MO", "ASTROLOGER. TEACHER. WRITER.", credentials (STA Horary Practitioner's Certificate; NCGR-PAA Levels 1 & 2 passed, working on 3; OPA Board Member & Treasurer; NCGR-DFW Treasurer; member NCGR, OPA, ISAR), personal story (business, science teaching, healing, tarot/reiki, art), values (Family, Nature, Learning, Travel), Jung and Alan Oken quotes, "Knowledge brings Insight. Insight brings Power. Power brings Freedom." | Primary source for /about, /credentials, /approach |
| `/services-2` | Four consultations: Natal Chart (90 min recommended), Solar Return (after natal), Life Changes (career/family/residence), Relationship (synastry + composite). **No prices shown anywhere.** | Reconcile with Mo1 service list — see service-inventory.md |
| `/appointments` | "I'd love to connect you with the life-enhancing tool of astrology - Let's Meet"; booking embed not visible in static extraction (Mo1 repo docs indicate Acuity Scheduling); email fallback | Replace with Cal.com booking landing page |
| `/contact` | "Get in Touch", mo@molumen.com, subject prompt "I want to know more about…", personal photo, "I'm a generous person but I won't share your email with anyone else" | Rewrite for /contact |
| `/blog` + 6 posts | New Moon posts Sep 2024–Feb 2025 (Virgo, Libra eclipse, Scorpio, Sagittarius, Aquarius, Pisces). Format: evocative personal opening → astrology of the lunation with exact degrees/times (CST) → guidance → 12 rising-sign sections → lunar cycle timeline → CTA | Migrate as /current-sky articles; primary voice source |
| `/terms` | Full ToS: astrology not medical/legal/financial/mental-health advice; entertainment classification in some jurisdictions; birth-data accuracy affirmation; right to refuse service; 30-day refund limitation; liability waivers; IP; Texas law, Collin County jurisdiction; updated 2023-02-14 | Basis for new /terms + /booking-policy (attorney review required) |
| `/privacy` | Birth data never sold/leased; Squarespace platform disclosure; cookie basics; opt-out rights; annual review request; EU complaint rights; updated 2023-02-14 | Basis for new /privacy (attorney review required) |
| `/cookies-2` | Thin; defers to Squarespace documentation | Rewrite as proper cookie section of privacy page |

### 1.2 Template/placeholder pages (do NOT migrate)

`/courses` ("Copy Mastermind", "Copy 101", "Copy Cat", "It all begins with an idea…" — Squarespace copywriter-template placeholders), `/sales-page` ("DON'T MISS IT"), `/waitlist` (template filler about "1.5 billion websites"), `/lead-generation` ("Do you have this problem? LET'S FIX IT!", unnamed freebie), `/newsletter-landing` ("TAGLINE FOR YOUR EMAIL LIST HERE"), `/bonus-pages`, `/instagram-landing` (broken feed, "No results found"), `/thank-you`, `/coming-soon-copy`, and every `*-copy` duplicate (`/404-copy`, `/privacy-copy`, `/terms-copy`, `/terms-1`, `/site-credit-copy`, `/home-copy-of-mo-lumen`, `/instagram-landing-copy`, `/newsletter-landing-copy`). Blog `/category/Writing+Tips`, `/category/Freelance`, `/category/Entrepreneurship`, `/category/Copywriting` are leftover template taxonomy with no astrology relevance.

**Finding:** the live site is a partially-customized Squarespace copywriting template. Roughly 60% of indexed URLs are unfinished template pages that currently dilute crawl quality and brand credibility.

### 1.3 Images found on molumen.com

See `docs/plan/architecture.md` §Image plan. Photos of Mo (usable, business-owned, need higher-res originals from owner): "edited standing with shelf bckgrnd blue shirt 2" (about page), "close up blue shirt on couch" (homepage), "edited water on jetty". Unsplash stock (do not migrate — replace with original illustration system): `unsplash-image-f1Kbt5NC8-I.jpg`, `unsplash-image-jCIMcOpFHig.jpg`, `unsplash-image-TrhLCn1abMU.jpg`. Personal family cutout image: confirm with owner before reuse. All are served from `images.squarespace-cdn.com` at ≤1500w.

### 1.4 Content NOT found on the live site

- Prices (nowhere public)
- Testimonials (none published)
- Booking policies beyond the ToS refund clause
- FAQ, preparation guidance, educational content
- Any video content (Instagram feed block is broken)
- Lead magnet file (signup forms exist; no deliverable named)

## 2. Mo1 development reference (github.com/shanenh22/Mo1, 82 pages)

A complete static prototype whose sitemap already targets molumen.com. Treated as **owner-supplied direction**, not as verified fact.

Structure: `/readings/` (natal $225, transit $185, synastry $245, horary $125, further-out-in-the-sky $205 — **all marked "placeholder prices for design review"**; plus gift, what-to-expect, faq), `/learn/` (natal-astrology, how-astrology-answers-questions, 12 signs, 10 planets, 12 houses, 5 aspects, 57-term glossary), `/current-sky/` (transits, retrogrades, eclipses, lunations, calendar), `/horoscopes/`, `/courses/`, `/membership/`, `/your-chart/`, `/newsletter/`, `/about/`, `/contact/`, `/book/` (Acuity, owner ID placeholder), `/legal/` (9 documents incl. consultation-agreement, recording-consent, astrology-disclaimer, cancellation-refunds, accessibility, data-requests).

Reusable strengths: information architecture, service page anatomy (Investment/Format/Where/Afterward + "for you if" + "what you'll get" + "what to bring" + next steps), no-JS-fallback reading quiz, footer taxonomy, disclaimer footer line ("Astrology offers perspective, not certainty"), 18+ note.

Gaps/deltas vs. this project's brief: no Reading Finder as interactive tool (static quiz only), no Explore Your Chart tool, no Current Sky timeline component, no video center, Acuity not Cal.com, no design-token documentation, "Membership" section not in approved architecture, and its `/courses/` + `/horoscopes/` content needs re-verification.

## 3. Contradictions requiring owner resolution

1. **Service list**: live site sells Natal, Solar Return, Life Changes, Relationship. Mo1 sells Natal, Transit, Synastry, Horary, Further Out in the Sky, Gift. Overlap is partial (Transit ≈ Solar Return/Life Changes?). See `docs/plan/open-questions.md` Q1.
2. **Prices**: none public; Mo1 figures are explicit placeholders.
3. **Booking platform**: live Acuity vs. brief-mandated Cal.com + Stripe.
4. **Copyright line**: "©2023 MO LUMEN ASTROLOGICAL SERVICES" — legal entity name to confirm for schema and footer.
