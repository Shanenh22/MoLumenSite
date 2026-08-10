# Domain Migration — molumen.com cutover

**Do not begin until staging is reviewed and approved by the owner. Do not attach `molumen.com` from an automated agent or repository change.**

The project is a **Cloudflare Worker with static assets**, not a Cloudflare Pages project. Production should use a Workers Custom Domain after the owner/account launch gates are complete.

## Before cutover

1. **Backup the existing Squarespace site and DNS state.** Export the site where possible, download the original images/files you still need, save copies of the current legal pages, and record every existing DNS record before changing nameservers or host records.
2. Confirm final prices, policies, credentials wording, testimonials and photos on the new site.
3. Complete the Cal.com/Stripe end-to-end booking test, including confirmation/preparation/reminders and GA4 `booking_complete` reception.
4. Complete the Kit newsletter delivery test, professional legal review, and archived manual screen-reader review listed in `MoLumen_OS/BACKLOG.md`.
5. Run the repository launch checks and verify the current staging deployment.
6. Confirm where DNS for `molumen.com` is currently hosted and whether `molumen.com` is already an active Cloudflare zone. **Workers Custom Domains require the hostname to be in a Cloudflare-managed zone.** If the nameservers are not already on Cloudflare, plan the nameserver migration first and preserve every non-web DNS record, especially email-related MX/TXT/CNAME records.
7. If the current DNS provider allows it and a nameserver/DNS change is planned, lower the relevant TTLs ahead of cutover. Do not alter DNS merely to satisfy this checklist without owner approval.

## Production cutover — owner approved only

Current Cloudflare dashboard path for a Worker is **Workers & Pages → select the `molumen` Worker → Domains (or Settings → Domains & Routes) → Add → Custom Domain**.

1. Ensure `molumen.com` is an active Cloudflare zone with all required DNS records preserved.
2. Add `molumen.com` as a **Custom Domain** for the existing Worker. Cloudflare creates the Worker DNS record and certificate for the hostname.
3. Decide the canonical hostname. The repository currently uses `https://molumen.com`, so the expected choice is apex/root as canonical.
4. Configure `www.molumen.com` deliberately. A Workers Custom Domain matches an exact hostname; attaching only `molumen.com` does not automatically make `www.molumen.com` work. Add the required proxied DNS record for `www` and a Cloudflare redirect rule from `www` to the root hostname, or attach/configure it by another owner-approved Cloudflare method that preserves the root canonical.
5. Wait for Cloudflare to show the Custom Domain/certificate as active before changing any remaining legacy web records.

## Immediate verification after cutover

Check from a clean browser and from an external network where practical:

- `https://molumen.com/` loads over HTTPS with no certificate warning.
- `https://www.molumen.com/` resolves and redirects once to the canonical root URL.
- `/robots.txt`, `/sitemap-index.xml`, `/llms.txt`, `/rss.xml` and the Birth Time Toolkit PDF resolve on the production hostname.
- Canonical, Open Graph and structured-data URLs use `https://molumen.com`, not `workers.dev` or Squarespace.
- 5–10 representative legacy Squarespace URLs follow the intended 301 map.
- A reading/service CTA and Reading Finder result reach the correct `/book/?service=...` selection and the Cal.com calendar loads.
- Consent choices, GA4 reception, newsletter signup, mobile navigation and one representative interactive tool still work on the production hostname.
- No mixed-content, console or obvious network errors appear.

## Search/answer-engine handoff

After the production hostname is stable:

1. Verify the domain in Google Search Console and Bing Webmaster Tools using the owner-controlled DNS/account method.
2. Submit `https://molumen.com/sitemap-index.xml`.
3. Request indexing only for the most important stable pages if useful; do not turn launch into a mass manual-submission exercise.
4. Monitor Search Console for unexpected 404s, canonical problems or excluded pages during the first week and add redirects only for real legacy traffic/URLs.

## Rollback

Before cutover, retain the old Squarespace DNS values and account access. If a launch-critical failure cannot be corrected quickly, remove/detach the Worker web routing and restore the previous web DNS records. Do not disturb unrelated email or verification records. Cloudflare also retains Worker deployments, so a code-only regression can be rolled back to a previous Worker version without changing DNS.
