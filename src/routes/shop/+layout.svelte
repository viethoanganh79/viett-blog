<script lang="ts">
  import { isShopEnabled } from '$lib/config/features';
  import ShopUnavailable from '$lib/components/ShopUnavailable.svelte';
  import { browser } from '$app/environment';

  let { children } = $props();

  // Check if the shop is enabled
  // During SSR/prerendering, always render the shop content
  // Client-side, respect the feature flag
  const shopEnabled = !browser ? true : isShopEnabled();
</script>

{#if shopEnabled}
  {@render children()}
{:else}
  <ShopUnavailable />
{/if}
