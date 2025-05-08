import { getPosts, getAllTags } from '$lib/utils/blog';
import { getAllProducts } from '$lib/utils/product';
import { SHOP_ENABLED } from '$lib/config/features';
import { SITE_URL } from '$lib/config/site';
import type { RequestHandler } from './$types';

// Set prerender to true to generate the sitemap during build
export const prerender = true;

export const GET: RequestHandler = async () => {
  // Get all blog posts
  const posts = getPosts();

  // Get all products (only include if shop is enabled)
  const products = SHOP_ENABLED ? getAllProducts() : [];

  // Get all unique tags
  const tags = getAllTags();

  // Current date in ISO format for lastmod
  const lastMod = new Date().toISOString();

  // Use the site URL from the central configuration
  const siteUrl = SITE_URL;

  // Create the XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/about</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  ${SHOP_ENABLED ? `
  <!-- Shop page -->
  <url>
    <loc>${siteUrl}/shop</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ` : ''}

  <!-- Blog posts -->
  ${posts
    .map(
      post => `
  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}

  <!-- Blog tags -->
  ${tags
    .map(
      tag => `
  <url>
    <loc>${siteUrl}/blog/tag/${encodeURIComponent(tag)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('')}

  ${SHOP_ENABLED ? products
    .map(
      product => `
  <!-- Product: ${product.name} -->
  <url>
    <loc>${siteUrl}/shop/${product.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('') : ''}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600' // Cache on CDN for 1 hour
    }
  });
};
