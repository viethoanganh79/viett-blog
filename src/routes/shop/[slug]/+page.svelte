<script lang="ts">
  import type { PageData } from './$types';
  import SEO from '$lib/components/SEO.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { onMount } from 'svelte';
  import { trackEcommerceEvent } from '$lib/utils/analytics';

  export let data: PageData;
  const { product, relatedProducts } = data;
  let isLoading = true;
  let quantity = 1;

  // Get product images array
  $: productImages = product.images || [product.image];

  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Handle add to cart button click
  function handleAddToCart() {
    // Track the add_to_cart event
    trackEcommerceEvent('add_to_cart', [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: quantity
      }
    ]);

    // Show feedback to the user
    alert(`Added ${quantity} ${product.name}${quantity > 1 ? 's' : ''} to cart!`);
  }

  // Set loading state to false and track view_item event after component mounts
  onMount(() => {
    isLoading = false;

    // Track the view_item event
    trackEcommerceEvent('view_item', [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price
      }
    ]);
  });
</script>

<SEO
  title="{product.name} | Shop | Viett Blog"
  description={product.description}
  openGraph={{
    title: `${product.name} | Shop | Viett Blog`,
    description: product.description,
    url: `/shop/${product.slug}`,
    type: 'product',
    image: product.image
  }}
/>

<section class="py-4 sm:py-8">
  <div class="container mx-auto px-4">
    <div class="mb-4">
      <a href="/shop" class="text-blue-600 hover:underline flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Shop
      </a>
    </div>

    {#if isLoading}
      <div class="bg-white rounded-lg shadow-md overflow-hidden p-6">
        <div class="py-12">
          <div class="flex justify-center items-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-800"></div>
          </div>
          <p class="text-center mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    {:else}
      <div class="bg-white rounded-lg shadow-md overflow-hidden p-6">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Product Images -->
          <div class="md:w-1/2">
            <!-- All images displayed vertically -->
            <div class="space-y-4">
              {#each productImages as image, index}
                <div class="relative rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    class="w-full h-auto object-cover"
                    on:error={(e) => {
                      // Use a fallback image from the blog posts
                      (e.currentTarget as HTMLImageElement).src = '/images/posts/hello-world.png';
                    }}
                  />

                  <!-- Only show badges on the first image -->
                  {#if index === 0}
                    {#if !product.inStock}
                      <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </div>
                    {/if}
                    {#if product.featured}
                      <div class="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    {/if}
                  {/if}
                </div>
              {/each}
            </div>
          </div>

          <!-- Product Details -->
          <div class="md:w-1/2">
            <h1 class="text-3xl font-bold text-slate-800 mb-2">{product.name}</h1>

            <div class="mb-4 flex flex-wrap gap-2">
              <span class="inline-block bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
              {#if product.featured}
                <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Featured
                </span>
              {/if}
            </div>

            <p class="text-2xl font-bold text-blue-700 mb-4">{formatPrice(product.price)}</p>

            <!-- Product information -->
            <div class="mb-6">
              <!-- Basic information -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold mb-2">Description</h2>
                <p class="text-gray-600">{product.description}</p>
              </div>

              <div class="mb-6">
                <h2 class="text-lg font-semibold mb-2">Availability</h2>
                <p class={product.inStock ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div class="mb-6">
                <h2 class="text-lg font-semibold mb-2">Product Details</h2>
                <ul class="list-disc list-inside text-gray-600 space-y-2">
                  <li><span class="font-medium">Product ID:</span> {product.id}</li>
                  <li><span class="font-medium">Category:</span> {product.category}</li>
                  <li><span class="font-medium">Status:</span> {product.inStock ? "Available" : "Out of Stock"}</li>
                  <li><span class="font-medium">Free Shipping:</span> Yes, on orders over $50</li>
                  <li><span class="font-medium">Returns:</span> 30-day money-back guarantee</li>
                </ul>
              </div>

              <!-- Full Description -->
              {#if product.html}
              <div class="mb-6 border-t border-gray-200 pt-6">
                <h2 class="text-xl font-bold mb-4">Full Description</h2>
                <div class="prose prose-slate max-w-none text-gray-600 prose-headings:text-slate-800 prose-headings:font-semibold prose-h3:text-lg prose-h2:text-xl prose-h2:mt-6 prose-p:mb-4 prose-ul:mb-4 prose-li:mb-1">
                  {@html product.html}
                </div>
              </div>
              {/if}
            </div>

            <div class="flex items-center gap-4">
              <div class="w-24">
                <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max="10"
                  bind:value={quantity}
                  disabled={!product.inStock}
                  aria-label="Product quantity"
                  aria-valuemin="1"
                  aria-valuemax="10"
                  aria-valuenow={quantity}
                  class="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              <button
                class="flex-grow bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                disabled={!product.inStock}
                aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is sold out`}
                on:click={handleAddToCart}
              >
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Related Products -->
    {#if !isLoading && relatedProducts.length > 0}
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6">You might also like</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {#each relatedProducts as relatedProduct (relatedProduct.id)}
            <ProductCard product={relatedProduct} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
