# Domain Migration — molumen.com cutover

**Do not begin until staging is reviewed and approved by the owner.**

## Before cutover

1. **Backup Squarespace**: export the site (Settings → Advanced → Import/Export), download all images at full size, export mailing-list contacts, and save copies of /terms and /privacy as PDFs.
2. Confirm final prices, policies, testimonials, and photos are in the new site.
3. Confirm Cal.com/Stripe booking works end-to-end on staging (test booking + refund).
4. Run the full test checklist (docs/testing-report.md) against staging.
5. Lower the DNS TTL on molumen.com records to 300s a day ahead (in whatever DNS host currently serves the domain — likely Squarespace or the registrar).

## Cutover

1. In Cloudflare Pages → Custom domains → add `molumen.com` and `www.molumen.com`; follow the DNS instructions (this may involve moving DNS to Cloudflare or pointing CNAME/A records from the current DNS host).
2. Wait for certificate issuance (usually minutes).
3. Verify: homepage loads over HTTPS; `www` redirects; 5–10 legacy URLs 301 correctly; booking works; RSS and sitemap resolve.

## After cutover

1. Google Search Console + Bing Webmaster Tools: verify the domain (DNS TXT record), submit `https://molumen.com/sitemap-index.xml`.
2. Watch Search Console coverage for a week; fix any unexpected 404s with `_redirects` additions.
3. Keep the Squarespace subscription until you've confirmed everything (email forwarding, images, scheduling) is fully migrated — then cancel.

## Rollback

Point DNS back at the previous Squarespace records (saved during backup). Site restores within TTL (minutes if you lowered it).
