// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Site URL comes from env so staging and production build correctly.
// Falls back to the production domain for local builds.
const site = process.env.PUBLIC_SITE_URL || "https://molumen.com";

export default defineConfig({
  site,
  trailingSlash: "always",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
});
