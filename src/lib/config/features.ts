/**
 * Feature flags configuration
 *
 * This file contains feature flags that control the availability of various features in the application.
 * Set a flag to true to enable the feature, or false to disable it.
 */

// Controls whether the shop is available to users
// During build/prerender, we need to enable the shop to generate all pages
// In production, this can be set to false to disable the shop
export const SHOP_ENABLED = process.env.NODE_ENV === 'production' ? false : true;

// Message to display when the shop is disabled
export const SHOP_DISABLED_MESSAGE = "Our shop is currently undergoing maintenance and will be back soon. Thank you for your patience!";

// Optional: scheduled date for shop reopening (can be null if unknown)
export const SHOP_REOPENING_DATE: Date | null = new Date('2025-05-15');

// Helper function to check if the shop is enabled
export function isShopEnabled(): boolean {
  return SHOP_ENABLED;
}
