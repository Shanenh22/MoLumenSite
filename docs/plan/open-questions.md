# Open Questions for the Owner

Blockers are marked ⛔ (launch cannot happen without them); everything else has a safe default the build proceeds with.

1. ✅ RESOLVED 2026-08-02 — canonical service list confirmed from the live Acuity scheduler (9 appointment types → 7 service pages). See docs/research/service-inventory.md.
2. ✅ RESOLVED 2026-08-02 — real prices confirmed and live on the site ($60–$275).
3. ⛔ **Cancellation / rescheduling windows** (e.g., free reschedule ≥24h?). Only a 30-day refund clause exists in the current ToS.
4. ⛔ **Cal.com + Stripe accounts** — owner must create/connect; we supply exact setup steps in docs/integrations/calcom-stripe.md. Confirm migration away from Acuity.
5. **Credential currency**: NCGR-PAA Level 3 status today? OPA/NCGR-DFW roles current? (About page dates from ~2023.)
6. **Testimonials**: none are published; please supply approved quotes with permission + first name/last initial.
7. **Lead magnet**: guide file doesn't exist. Approve outline + working title ("Reading the Road Ahead: How an Astrology Reading Helps You Recognize Opportunities Before They Arrive" — improves the concept title without promising outcomes) or supply your own.
8. **Legal structure**: fold Mo1's consultation-agreement + recording-consent into /booking-policy, or keep as separate pages? Attorney review needed either way. Legal entity name: "Mo Lumen Astrological Services"?
9. ~~**In-person DFW sessions**: still offered by inquiry?~~ **Resolved 2026-08-07.** It was never actually open — the owner-approved `terms.md` and `privacy.md`, plus `faqs.json` and `/how-readings-work/`, have said "in person in the DFW area by arrangement" since the legal rewrite. `/contact/` and the schema now agree with them. Confirm with Mo only if she has since stopped offering it.
10. **External chart calculators**: approve linking to reputable options (e.g., astro.com) from Explore Your Chart?
11. **Video sources**: YouTube channel URL/ID and representative Instagram video links for the initial video collection.
12. **MailerLite account** + form/group IDs; approve welcome-sequence recommendations.
13. **GA4**: create property and supply measurement ID (site works without it).
14. **GitHub**: create empty repo `molumen-website` under your account (or grant access) so this local repository can be pushed; staging then deploys via Cloudflare Pages.
15. **Photos**: supply full-resolution originals listed in architecture.md §8; confirm family photo usage.
16. **Family/personal details in bio** (abuse-healing mention, family references): confirm what stays in the rewrite — we default to the framing already public on molumen.com/about.
17. **Horoscopes section**: keep monthly rising-sign guidance as its own /horoscopes/ index (Mo1 pattern), or fold into Current Sky posts? Default: keep, sourced from lunation-post rising-sign sections.
