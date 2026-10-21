// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { legacyRedirects } from './src/data/redirects.mjs';

const site = process.env.SITE_URL || 'https://www.astroenergygroup.com';

export default defineConfig({
  site,
  trailingSlash: 'ignore', // legacy URLs such as /audits.html have no trailing slash
  // Pages are prerendered by default; search, contact and API routes opt out.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  redirects: legacyRedirects,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/search/') && !page.endsWith('.html'),
    }),
  ],
  security: { checkOrigin: true },
  build: { inlineStylesheets: 'auto' },
});
