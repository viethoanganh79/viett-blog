<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { GA_MEASUREMENT_ID, ENABLE_ANALYTICS_IN_DEV } from '$lib/config/analytics';

  // Only enable analytics in production or if explicitly enabled in development
  const enabled = browser && (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

  // Track page views when the route changes
  $: if (enabled && $page.url.pathname) {
    // Wait for the next tick to ensure the page has fully loaded
    setTimeout(() => {
      if (typeof gtag !== 'undefined') {
        gtag('config', GA_MEASUREMENT_ID, {
          page_path: $page.url.pathname,
          page_title: document.title
        });
      }
    }, 0);
  }

  // Initialize Google Analytics
  onMount(() => {
    if (!enabled) return;

    // Add gtag script to the head
    const script1 = document.createElement('script');
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { 
        send_page_view: false, // We'll handle page views manually
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `;
    document.head.appendChild(script2);
  });
</script>

<!-- This component doesn't render anything visible -->
