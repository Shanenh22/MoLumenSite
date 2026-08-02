# SEO Opportunity Map

Date: 2026-08-02. Grounded in current Google Search Central guidance (people-first content, E-E-A-T, structured data eligibility) and the Core Web Vitals thresholds (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1).

## 1. Current state

molumen.com has ~54 indexed URLs of which the majority are template placeholders, duplicate "-copy" pages, and off-topic copywriting-template taxonomy (Writing Tips, Freelance, Copywriting categories). Real content: 6 lunation posts, about, services (no prices), thin policy pages. No structured data strategy, no education content, no internal-link architecture. This is effectively a fresh start with a small legacy-URL debt (redirect map handles it).

## 2. Topical clusters (build in this order)

1. **Services cluster (commercial):** /readings/ hub + one page per service + what-to-expect + FAQ + prepare-for-your-reading + how-readings-work. Target intents: "natal chart reading", "astrology reading online", "relationship astrology reading", "horary astrology reading", "what to expect astrology reading", "how to prepare for astrology reading".
2. **Chart fundamentals cluster (informational, evergreen):** birth-chart-basics, planets (10), signs (12), houses (12), aspects (5), glossary. High volume, high competition — win on organization, voice, and internal linking rather than volume.
3. **Reading-decision cluster (mid-funnel, underserved):** choosing an astrologer, questions to bring to a reading, what astrology can and cannot do, unknown birth time, why birth data matters, common misconceptions, ethical astrology. Lower competition, strong conversion adjacency, strongly matches answer-engine query patterns.
4. **Current Sky cluster (freshness):** lunations (Mo's existing cadence — 12+ posts/yr), eclipses, retrogrades, calendar. Dated, verifiable, feeds newsletter and social.
5. **Local seasoning (not a cluster):** Mo offers in-person readings in DFW by inquiry; mention naturally on service/about pages. No fabricated local-business schema; only add LocalBusiness markup if the owner confirms a service-area business model.

## 3. E-E-A-T assets to surface

Named astrologer with photo; STA Horary Practitioner's Certificate; NCGR-PAA Levels 1–2 (3 in progress — phrase carefully and keep current); OPA board member/treasurer; NCGR-DFW treasurer; memberships (NCGR, OPA, ISAR); teaching background. Person schema on /about linked from Organization/ProfessionalService on the site root; author attribution + dates on all articles.

## 4. Structured data plan (truthful only)

WebSite + ProfessionalService (site-wide), Person (Mo), Service (each reading, with real price once confirmed), BreadcrumbList (all deep pages), Article/BlogPosting (articles + lunation posts), FAQPage (only where real Q&A is visible on-page), ItemList (readings index, learn indexes). Explicitly excluded until genuinely eligible: AggregateRating/Review (no published reviews exist), VideoObject (until video pages meet requirements), Course (no live courses), LocalBusiness (pending owner confirmation).

## 5. Technical foundation

Static HTML via Astro; one canonical per page; clean descriptive URLs (adopt Mo1's path design); XML sitemap limited to real content; robots.txt; RSS for articles + current-sky; 301 map from legacy Squarespace URLs (see url-inventory-redirect-map.md); custom 404; OG/Twitter cards with branded social template; hreflang not needed (single locale en-US).

## 6. Answer-engine readiness

Every informational page opens with a 2–4 sentence direct answer ("answer-first passage") before elaboration; headings phrased as real questions where natural; glossary entries kept atomic and quotable; author, dates, and citations visible. No content generated merely to occupy a keyword — every page must pass the brief's usefulness tests.
