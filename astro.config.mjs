// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pageDates from "./src/data/page-dates.json" with { type: "json" };
import videos from "./src/content/videos/videos.json" with { type: "json" };

// Site URL comes from env so staging and production build correctly.
// Falls back to the production domain for local builds.
const site = process.env.PUBLIC_SITE_URL || "https://molumen.com";

/**
 * Keep sitemap guidance aligned with intentional noindex pages. These routes
 * remain reachable for humans, but they are not useful landing pages for a
 * search engine while they are empty, duplicate, or worksheet-only surfaces.
 * Videos becomes indexable automatically as soon as a real published video is
 * present, matching the page's own conditional noindex behavior.
 */
const alwaysNoindex = new Set([
  "/courses/",
  "/guides/",
  "/birth-time-toolkit/worksheets/",
]);
const hasPublishedVideos = Array.isArray(videos) && videos.some((video) => !video.draft);

export default defineConfig({
  site,
  trailingSlash: "always",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        if (pathname === "/404/" || alwaysNoindex.has(pathname)) return false;
        if (pathname === "/videos/" && !hasPublishedVideos) return false;
        return true;
      },
      /**
       * lastmod tells crawlers which pages are worth re-fetching. Without it
       * every URL looks equally stale and a 129-page site gets crawled slowly.
       * Dates are the same real git-derived values used for dateModified in
       * structured data — never invented. Pages git cannot date are simply
       * omitted rather than stamped with today.
       */
      serialize(item) {
        const path = new URL(item.url).pathname;
        const exact = pageDates.exact[path];
        const prefix = Object.entries(pageDates.prefix)
          .filter(([p]) => path.startsWith(p))
          .sort((a, b) => b[0].length - a[0].length)[0]?.[1];
        const when = exact || prefix;
        if (when) item.lastmod = new Date(when).toISOString();
        // The booking and readings pages are the commercial priority; the
        // reference library is the volume. Everything else sits in between.
        if (path === "/") item.priority = 1.0;
        else if (path.startsWith("/readings/") || path === "/book/")
          item.priority = 0.9;
        else if (path.startsWith("/explore/") || path.startsWith("/blog/"))
          item.priority = 0.7;
        else if (path.startsWith("/current-sky/")) item.priority = 0.6;
        else item.priority = 0.5;
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
});
