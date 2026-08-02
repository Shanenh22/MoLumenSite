# MailerLite Integration

## Owner setup
1. Create a MailerLite account; create a group "Sky This Month".
2. Create an embedded form for the group; note the account and form IDs from the embed snippet.
3. Set `PUBLIC_MAILERLITE_FORM_ID` in Cloudflare Pages env (format: `accountId:formId` as used by the form action in `src/components/NewsletterForm.astro` — adjust the adapter to match the exact embed URL MailerLite gives you, they occasionally change the endpoint shape).
4. Configure double opt-in (recommended) and the welcome email in MailerLite.

## Welcome sequence recommendation
1. **Instant:** welcome + what to expect (and the guide, once it exists).
2. **Day 3:** "How readings work" — link the walkthrough, no hard sell.
3. **Day 10:** Reading Finder invitation + one genuinely useful timing tip.
Keep marketing consent separate from booking consent everywhere; never pre-check boxes.

## Behavior without configuration
With no form ID set, every signup form degrades to a mailto: link to mo@molumen.com — nothing dead-ends.
