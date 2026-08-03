# Auditing the site

Four scripts in `scripts/` check the built site. They all read `dist/`, so run a build first.
None of them touch the live site, and none require network access.

Lighthouse and Playwright are **not** in `package.json` on purpose. They are roughly 190MB of
install that the Cloudflare build has no use for — measured: a clean install is 210MB and 296
packages without them, 399MB and 359 packages with, and that is before Playwright downloads
browsers.

They were removed on 2026-08-03 because staging stopped deploying, and `3199d98` — the first commit
that failed to deploy — was also the first commit that added lighthouse to `devDependencies`. The
preceding commit deployed fine and already had Playwright. That correlation is strong but it is not
a confirmed diagnosis: nobody has read the Cloudflare build log. If the deploy is still stuck after
this change, the cause is elsewhere and the build log is the next place to look.

Install them only when you actually want to audit:

```
npm run audit:install    # once per machine: lighthouse + playwright, not saved to package.json
```

`scripts/audit.mjs` needs nothing extra and always runs. The other three print a clear message
telling you to run `audit:install` rather than dying on a module-not-found stack trace.

```
npm run build
node scripts/audit.mjs        # structure, SEO metadata, internal link graph
node scripts/lh-audit.mjs     # Lighthouse, mobile + desktop, six representative pages
node scripts/lh-detail.mjs    # per-audit drill-down for one page (edit the page list inside)
node scripts/axe-sweep.mjs    # axe-core WCAG 2.2 A/AA across 20 pages at two viewports
```

## What each one is for

`audit.mjs` parses every HTML file in `dist/` and reports duplicate or over-length titles and
descriptions, pages missing an H1 or skipping a heading level, images without alt text or without
width and height, pages missing structured data or a canonical URL, pages under 350 words, and —
most usefully — the internal link graph. It flags orphan pages (nothing links to them), pages more
than three clicks from the homepage, and pages with fewer than three inbound links. Orphans are
almost always a real bug: a page that was built and then never added to navigation.

`lh-audit.mjs` serves `dist/` on a local port and runs Lighthouse against a fixed list of page
types at both mobile and desktop throttling. It prints the four category scores plus LCP, CLS and
TBT, and lists any opportunity worth more than a few KB. Scores from localhost are optimistic
about network conditions and pessimistic about caching; treat them as a regression check between
builds, not as a prediction of field data.

`lh-detail.mjs` is the follow-up when `lh-audit.mjs` flags something — it dumps the individual
audit results and the resource breakdown for a page so you can see which file is actually heavy.

`axe-sweep.mjs` runs axe-core with the WCAG 2.0, 2.1 and 2.2 A and AA rulesets plus axe's
best-practice rules, across a sample chosen to cover every page template, at 390px and 1440px.
Zero violations here is a floor, not a ceiling: automated tooling catches somewhere between a
third and a half of real accessibility barriers. Keyboard-only navigation and a screen-reader
pass still have to be done by a person before launch.

## When to run them

Before every push that touches layout, navigation, images or content structure. After adding any
new page type. And again against the Cloudflare staging URL before launch, since edge caching,
compression and any third-party scripts (Cal.com, GA4, MailerLite) will change the performance
picture in ways a local build cannot show.

## Adding pages to the samples

`lh-audit.mjs` and `axe-sweep.mjs` both hold a `PAGES` array near the top. When a new page
template is added to the site, add one example of it to both arrays. The samples are meant to
cover templates, not every URL — running Lighthouse over 118 pages takes far longer than it is
worth, and the pages within a template are structurally identical.
