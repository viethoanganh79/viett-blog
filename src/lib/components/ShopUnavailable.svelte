<script lang="ts">
  import { SHOP_DISABLED_MESSAGE, SHOP_REOPENING_DATE } from '$lib/config/features';
  import { formatDate } from '$lib/utils/date';
  import SEO from './SEO.svelte';
</script>

<SEO
  title="Shop Unavailable | Viett Blog"
  description="Our shop is currently unavailable"
  openGraph={{
    title: 'Shop Unavailable | Viett Blog',
    description: 'Our shop is currently unavailable',
    url: '/shop',
    type: 'website',
    image: '/images/og-image.jpg'
  }}
/>

<div class="py-16 px-4 text-center">
  <div class="max-w-2xl mx-auto">
    <div class="mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-slate-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </div>

    <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Shop Temporarily Unavailable</h1>

    <p class="text-xl text-gray-600 mb-8">{SHOP_DISABLED_MESSAGE}</p>

    {#if SHOP_REOPENING_DATE}
      <p class="text-lg text-gray-600 mb-8">
        Expected to reopen on: <span class="font-semibold">{formatDate(SHOP_REOPENING_DATE)}</span>
      </p>
    {/if}

    <div class="mt-8">
      <a href="/" class="inline-block bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors">
        Return to Home Page
      </a>
    </div>

    <div class="mt-8 border-t border-gray-200 pt-8">
      <h2 class="text-xl font-bold text-slate-800 mb-4">In the meantime, check out our blog</h2>
      <a href="/blog" class="text-blue-600 hover:underline">
        Browse our latest articles
      </a>
    </div>
  </div>
</div>
