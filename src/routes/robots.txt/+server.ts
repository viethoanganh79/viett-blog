import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/config/site';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const siteUrl = SITE_URL; // Use the site URL from the central configuration

  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};
