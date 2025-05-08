<script lang="ts">
  import type { Product } from '$lib/utils/product';
  import { trackEcommerceEvent } from '$lib/utils/analytics';

  export let product: Product;

  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Track add to cart event
  function handleAddToCart(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    // Track the add_to_cart event
    trackEcommerceEvent('add_to_cart', [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1
      }
    ]);

    // Show feedback to the user
    alert(`Added ${product.name} to cart!`);
  }
</script>

<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
  <a href="/shop/{product.slug}" class="block text-inherit no-underline">
  <div class="relative h-48 overflow-hidden">
    <img
      src={product.image}
      alt={product.name}
      class="w-full h-full object-cover"
      on:error={(e) => {
        // Use a fallback image from the blog posts
        (e.currentTarget as HTMLImageElement).src = '/images/posts/hello-world.png';
      }}
    />
    {#if !product.inStock}
      <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-semibold">
        Out of Stock
      </div>
    {/if}
    {#if product.featured}
      <div class="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 text-xs font-semibold">
        Featured
      </div>
    {/if}
  </div>
  <div class="p-4">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-xl font-bold text-slate-800">{product.name}</h3>
      <span class="text-lg font-semibold text-blue-700">{formatPrice(product.price)}</span>
    </div>
    <p class="text-gray-600 mb-4 text-sm">{product.description}</p>
    <div class="flex justify-between items-center">
      <span class="inline-block bg-slate-200 text-slate-800 px-2 py-1 rounded-full text-xs">
        {product.category}
      </span>
    </div>
  </div>
  </a>

  <!-- Add to Cart button outside the link to prevent navigation when clicked -->
  <div class="p-4 pt-0 mt-2 border-t border-gray-100">
    <button
      class="w-full bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
      disabled={!product.inStock}
      aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is sold out`}
      on:click={handleAddToCart}
    >
      {product.inStock ? 'Add to Cart' : 'Sold Out'}
    </button>
  </div>
</article>
