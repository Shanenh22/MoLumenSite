# MoLumen Active Backlog

Only unfinished work belongs here. Completed work belongs in Git history/changelog; historical plans belong under archive/history.

Priority labels: **P0** production blocker · **P1** high-value launch improvement · **P2** post-launch/growth · **OWNER** owner/account action.

## P0 — production blockers / owner gates
- **OWNER** Complete the Cal.com account configuration in `docs/calcom-setup-for-mo.md`: replace the current custom attendee location on all nine event types with Zoom + attendee phone choices; add the documented service-appropriate booking/intake questions; correct the Quick Check-In event description.
- **OWNER** After the Cal.com changes, run one end-to-end booking test covering reading selection, date/time, location, intake, Stripe payment, confirmation, and preparation/reminder behavior.
- **OWNER** Complete owner-side newsletter subscription test on the live/staging embed.
- **OWNER** Confirm GA4 consent/events, including the new privacy-safe `booking_complete` event, in the GA4 account after the deployed flow is exercised.
- **OWNER** Approve the final cutover runbook before production DNS/domain attachment.
- **OWNER** Complete professional legal review for Terms, Privacy, Booking Policy, and Disclaimer before production launch.
- **OWNER** Perform and archive the manual screen-reader review required by the approved accessibility policy before production launch.

## P1 — high-value launch improvements
- **OWNER** Supply the real YouTube welcome-video ID/poster when available; homepage and About slots are already wired and remain hidden until configured.
- **OWNER** Test and approve Birth Time Toolkit newsletter delivery/automation before using the PDF as a live lead magnet.
- **OWNER** Choose how the MLS program will be described publicly before credential changes.
- **OWNER** Decide whether the archived tagline “Where astrology becomes understanding” belongs in verified brand language.
- Collect permissioned testimonials for readings that still lack a service-matched quote, especially the Relationship Consultation; never substitute a generic quote as if it came from that service.
- Add scoped FAQs for established-client readings only when real pre-booking questions are known; the architecture is already in place.
- **OWNER** Two typos in the Cal.com booking questions, visible to bookers: the second birth-time option on `natal-60` and `natal-90` reads "Option Roughly — I know the part of the day" (drop the stray "Option"), and `relationship` has "Person A —Do you know your birth time?" missing a space. Relationship also shows "Person A — What would you most like to explore?" followed by an unlabelled "What would you most like to explore?"; label the second for Person B or merge them into one question for the pair.
- Review whether `/courses/` and `/guides/` should remain visible before the offerings are real. Their premature content collections were removed on 2026-08-08; add real collections in the same change that creates real content.
- If Mo should edit the `/explore/` reference library in Pages CMS, migrate it deliberately into real content-backed structures with layout/link/schema regression coverage.
- Consider moving the `/birth-time/` article body into a CMS-editable collection while preserving inline links and FAQ/Article schema; keep printable worksheet structure code-managed.
- Continue migrating recurring handwritten inline styles when relevant pages are touched.

## P2 — post-launch / growth
- Maintain the rolling Current Sky horizon; present coverage currently extends through December 2027.
- Decide when to create the 2027 annual Current Sky overview; do not invent it merely because 2027 event entries already exist.
- Expand blog clusters using Search Console and real query performance.
- After real funnel traffic exists, use Reading Finder step data and `booking_complete` attribution to decide whether any question, homepage section, or CTA needs simplification; do not optimize by page length alone.
- Add testimonials/case studies only when real content and permission exist.
- Deepen Reading Finder branching only if analytics demonstrates need.
- Add lead magnets beyond Birth Time Toolkit only when owner-approved and strategically justified.
- Add server-side form handling only if a real requirement emerges.
- Consider reports, memberships, courses, workshops, or paid sky content only after owner approval.
