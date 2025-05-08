<script>
  // Access frontmatter data
  export let title;
  export let date;
</script>

<svelte:head>
  <title>{title} | My Personal Blog</title>
  <meta name="description" content="Blog post: {title}" />
</svelte:head>

<article class="prose prose-slate lg:prose-xl mx-auto">
  <h1>{title}</h1>
  <p class="text-gray-500">Published on {date}</p>
  
  <div class="mt-8">
    <slot />
  </div>
</article>
