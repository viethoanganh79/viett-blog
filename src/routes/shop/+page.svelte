<script lang="ts">
  import type { PageData } from './$types';
  import SEO from '$lib/components/SEO.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { onMount } from 'svelte';

  export let data: PageData;
  const { products, categories } = data;

  // Filter out products that are not visible
  const visibleProducts = products.filter(product => product.visible);

  let selectedCategory = 'all';
  let searchQuery = '';
  let filteredProducts = [...visibleProducts];
  let isLoading = true;

  // Filter products based on category and search query
  function filterProducts() {
    let result = [...visibleProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    filteredProducts = result;
  }

  // Watch for changes in category or search query
  $: {
    selectedCategory;
    searchQuery;
    filterProducts();
  }

  // Set loading state to false after component mounts
  onMount(() => {
    isLoading = false;
  });
</script>

<SEO
  title="Shop | Viett Blog"
  description="Browse our collection of tech products and accessories"
  openGraph={{
    title: 'Shop | Viett Blog',
    description: 'Browse our collection of tech products and accessories',
    url: '/shop',
    type: 'website',
    image: '/images/og-image.jpg'
  }}
/>

<section class="py-4 sm:py-8">
  <div class="container mx-auto px-4">
    <h1 class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Shop</h1>

    <!-- Filters -->
    <div class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" role="search" aria-label="Product filters">
      <div class="w-full md:w-auto">
        <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category"
          bind:value={selectedCategory}
          class="w-full md:w-auto bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>

      <div class="w-full md:w-64">
        <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <input
          type="text"
          id="search"
          placeholder="Search products..."
          bind:value={searchQuery}
          class="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search products"
        />
      </div>
    </div>

    <!-- Results count -->
    <p class="mb-4 text-gray-600">
      Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
    </p>

    <!-- Loading state -->
    {#if isLoading}
      <div class="py-12">
        <div class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-800"></div>
        </div>
        <p class="text-center mt-4 text-gray-600">Loading products...</p>
      </div>
    {:else}
      <!-- Products grid -->
      {#if filteredProducts.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {#each filteredProducts as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>
      {:else}
        <div class="text-center py-12 bg-gray-100 rounded-lg">
          <p class="text-xl text-gray-600">No products found matching your criteria.</p>
          <button
            class="mt-4 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
            on:click={() => {
              selectedCategory = 'all';
              searchQuery = '';
            }}
          >
            Reset Filters
          </button>
        </div>
      {/if}
    {/if}
  </div>
</section>
