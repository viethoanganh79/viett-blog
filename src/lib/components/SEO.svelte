<script lang="ts">
  import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, TWITTER_HANDLE } from '$lib/config/site';

  // Props for the SEO component
  export let title = SITE_NAME;
  export let description = SITE_DESCRIPTION;
  export let canonical = '';
  export let openGraph = {
    title: title,
    description: description,
    url: canonical,
    type: 'website',
    image: DEFAULT_OG_IMAGE
  };
  export let twitter = {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    title: title,
    description: description,
    image: DEFAULT_OG_IMAGE
  };
  export let jsonLd: any = null;

  // Get the full URL for canonical links
  const siteUrl = SITE_URL;
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
</script>

<svelte:head>
  <!-- Basic metadata -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={fullUrl} />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={openGraph.type} />
  <meta property="og:url" content={openGraph.url || fullUrl} />
  <meta property="og:title" content={openGraph.title} />
  <meta property="og:description" content={openGraph.description} />
  <meta property="og:image" content={`${siteUrl}${openGraph.image}`} />

  <!-- Twitter -->
  <meta name="twitter:card" content={twitter.card} />
  <meta name="twitter:site" content={twitter.site} />
  <meta name="twitter:title" content={twitter.title} />
  <meta name="twitter:description" content={twitter.description} />
  <meta name="twitter:image" content={`${siteUrl}${twitter.image}`} />

  <!-- JSON-LD structured data -->
  {#if jsonLd}
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  {/if}
</svelte:head>
