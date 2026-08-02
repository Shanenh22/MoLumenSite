// @ts-check
import { defineConfig } from 'astro/config';

// Site URL comes from env so staging and production build correctly.
// Falls back to the production domain for local builds.
const site = process.env.PUBLIC_SITE_URL || 'https://molumen.com';

export default defineConfig({
  site,
  trailingSlash: 'always',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
