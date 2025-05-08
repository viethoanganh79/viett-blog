import { browser } from '$app/environment';
import { GA_MEASUREMENT_ID, ENABLE_ANALYTICS_IN_DEV } from '$lib/config/analytics';

// Only enable analytics in production or if explicitly enabled in development
const enabled = browser && (import.meta.env.PROD || ENABLE_ANALYTICS_IN_DEV);

/**
 * Track a custom event
 * @param eventName The name of the event
 * @param eventParams Additional parameters for the event
 */
export function trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
  if (!enabled) return;
  
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventParams);
  } else {
    console.warn('Google Analytics not loaded, event not tracked:', eventName, eventParams);
  }
}

/**
 * Track an e-commerce event
 * @param action The e-commerce action (view_item, add_to_cart, etc.)
 * @param items The items involved in the action
 * @param additionalParams Additional parameters for the event
 */
export function trackEcommerceEvent(
  action: 'view_item' | 'add_to_cart' | 'remove_from_cart' | 'begin_checkout' | 'purchase',
  items: any[],
  additionalParams: Record<string, any> = {}
) {
  if (!enabled) return;
  
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      items,
      ...additionalParams
    });
  } else {
    console.warn('Google Analytics not loaded, e-commerce event not tracked:', action, items, additionalParams);
  }
}

// Define gtag for TypeScript
declare global {
  function gtag(...args: any[]): void;
  interface Window {
    dataLayer: any[];
    gtag: typeof gtag;
  }
}
