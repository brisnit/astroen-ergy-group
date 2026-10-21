import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://www.astroenergygroup.com')).origin;
  const body = ['User-agent: *', 'Allow: /', 'Disallow: /api/', 'Disallow: /search/?', '', `Sitemap: ${origin}/sitemap-index.xml`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
