# Risk & Uncertainty Log

| # | Risk | Severity | Mitigation / status |
|---|---|---|---|
| 1 | **No confirmed prices anywhere.** Mo1 figures are design placeholders. | Blocker for launch, not for build | Build with visibly-labeled "pricing to be confirmed" states excluded from schema; owner supplies real prices (open-questions Q2) |
| 2 | **Service list conflict** between live site and Mo1 | High | Build on Mo1 list; reconcile before content freeze (Q1) |
| 3 | **No published testimonials.** | Medium | Ship trust section with "Approved testimonial needed" dev placeholders, excluded from production build by a build-time flag; no Review schema |
| 4 | **Lead magnet file does not exist.** | Medium | Editorial outline + designed placeholder only; signup copy avoids promising the file until supplied |
| 5 | **Photos of Mo are ≤1500w Squarespace crops.** | Medium | Migrate best available; request originals (image report in architecture doc) |
| 6 | **Legal pages are 2023 templates; new drafts are not attorney-reviewed.** | High | Every legal page carries an owner/attorney review flag in frontmatter; no compliance claims |
| 7 | **Booking migration Acuity → Cal.com + Stripe** — account setup, event types, payment config are owner actions | High | Site ships with graceful fallback (email + hosted-Cal link states); docs/integrations/calcom-stripe.md gives exact setup steps; TidyCal fallback documented |
| 8 | **GitHub push credentials absent in this environment** (`gh` not installed/authenticated) | Low | Repo is fully initialized locally with clean history; owner creates `molumen-website` on GitHub and we push, or delivers via bundle |
| 9 | **Credential currency** (NCGR Level 3 "working on") | Medium | Phrase as of-date; confirm before publication (Q5) |
| 10 | **Instagram embed fragility** (live site's feed is already broken) | Low | Video center links out to Instagram with labeled external links; no scraped feeds |
| 11 | **Squarespace image ownership** — Unsplash assets must not migrate as brand imagery | Low | Rejected in inventory; replaced by original SVG illustration system |
| 12 | **NCGR Level 3 / other bio facts may have changed since 2023 page updates** | Medium | Owner review pass (Phase 4) covers all biographical claims |
| 13 | **Analytics privacy** — intake/birth data must never reach GA4 | High | Analytics adapter whitelist-only event params; documented in google-analytics.md; QA checklist item |
| 14 | **Entertainment-classification language** in existing ToS vs. educational positioning | Low | Preserve legal framing in legal pages only; marketing copy stays honest without over-claiming |
