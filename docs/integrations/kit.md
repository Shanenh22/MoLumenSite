# Kit Newsletter Integration

## Current form

MoLumen uses Kit for newsletter subscriptions.

Owner-supplied JavaScript embed:

```html
<script async data-uid="c60976a5a9" src="https://molumen.kit.com/c60976a5a9/index.js"></script>
```

Kit recommends its JavaScript embed for normal website use because changes made in Kit are reflected automatically on the site.

## Repository architecture

- Public form configuration lives in `src/config/site.ts`.
- `src/components/NewsletterForm.astro` initializes the Kit embed.
- Only one real Kit embed is initialized per document so repeated newsletter components do not repeatedly execute the third-party embed.
- Secondary signup locations gracefully link to `/newsletter/`.
- No MailerLite or `mailto:` subscription fallback should exist in generated production HTML.

## Environment overrides

The owner-supplied form is the default. These public environment variables are optional overrides:

```text
PUBLIC_KIT_FORM_UID=c60976a5a9
PUBLIC_KIT_FORM_SCRIPT_URL=https://molumen.kit.com/c60976a5a9/index.js
```

These are public browser integration identifiers, not secrets.

## Kit account-side setup

Inside Kit:

1. Keep the form published and active.
2. Configure the subscriber success message or redirect.
3. Configure confirmation/double opt-in according to Mo's preference.
4. Authenticate the sending domain before sending regular broadcasts.
5. Configure the welcome/delivery sequence for the Birth Time Toolkit once it is ready.

## Testing

Before production launch:

1. Open the staging site in a private/incognito window.
2. Submit a real test address through the newsletter form.
3. Confirm the address appears in the correct Kit form/subscriber segment.
4. Confirm the expected confirmation/welcome email arrives.
5. Confirm unsubscribe works.
6. Confirm no console/network errors are introduced by the embed.

Do not hard-code API secrets or private Kit credentials into this repository.
