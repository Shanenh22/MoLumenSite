# Manage Navigation

All menus live in `src/config/navigation.ts`. The header, mobile menu, and footer all read from it — you never edit menu HTML.

- `primaryNav` — the header. Items with `children` render as dropdowns (keep to the current two; header space is finite).
- `ctaNav` — the Book a Reading button.
- `footerNav` — the four footer columns; add/remove links freely.

Each link is `{ label: 'Text', href: '/path/' }` — internal paths start and end with `/`.

Site-wide facts (email, social URLs, tagline) live in `src/config/site.ts`.
