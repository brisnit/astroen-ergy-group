// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { legacyRedirects } from './src/data/redirects.mjs';

const site = process.env.SITE_URL || 'https://www.astroenergygroup.com';

export default defineConfig({
  site,
  trailingSlash: 'ignore', // legacy URLs such as /audits.html have no trailing slash
  // Pages are prerendered by default; /search/, /contact/ and /api/* opt out and run as
  // Vercel Functions. The adapter writes .vercel/output (Build Output API), which Vercel
  // deploys directly; no output-directory setting is needed.
  output: 'static',
  adapter: vercel({
    // AI answers can take up to ~25 s (see src/lib/ask.ts).
    maxDuration: 30,
  }),
  redirects: legacyRedirects,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/search/') && !page.endsWith('.html'),
    }),
  ],
  security: { checkOrigin: true },
  build: { inlineStylesheets: 'auto' },
});
