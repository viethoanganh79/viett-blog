import { SHOP_ENABLED } from '$lib/config/features';
import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
  const { url } = event;

  // Skip redirect during prerendering/building
  if (!building) {
    // Check if the request is for a shop route and the shop is disabled
    if (!SHOP_ENABLED && url.pathname.startsWith('/shop/') && !url.pathname.endsWith('/shop')) {
      // Redirect to the main shop page which will show the unavailable message
      return new Response(null, {
        status: 302,
        headers: {
          location: '/shop'
        }
      });
    }
  }

  // Continue with the request
  return await resolve(event);
};
