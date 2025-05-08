<script lang="ts">
  const title = "Getting Started with SvelteKit";
  const date = "2025-04-16";
</script>

<svelte:head>
  <title>{title} | Viett Blog</title>
  <meta name="description" content="Learn how to build a blog with SvelteKit and Markdown." />
</svelte:head>

<article class="prose prose-slate lg:prose-xl mx-auto">
  <h1>{title}</h1>
  <p class="text-gray-500">Published on {date}</p>

  <h2>Introduction to SvelteKit</h2>

  <p><a href="https://kit.svelte.dev/">SvelteKit</a> is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.</p>

  <p>In this post, I'll walk you through the process of setting up a blog with SvelteKit.</p>

  <h3>Prerequisites</h3>

  <p>Before we start, make sure you have the following installed:</p>

  <ul>
    <li>Node.js (version 16 or later)</li>
    <li>npm or yarn</li>
  </ul>

  <h3>Setting Up a New SvelteKit Project</h3>

  <p>To create a new SvelteKit project, run the following command:</p>

  <pre class="bg-gray-800 text-white p-4 rounded"><code>npm create svelte@latest my-blog</code></pre>

  <p>Follow the prompts to configure your project. I recommend selecting the following options:</p>

  <ul>
    <li>SvelteKit demo app</li>
    <li>TypeScript</li>
    <li>ESLint, Prettier, and Playwright for testing</li>
  </ul>

  <p>Once the project is created, navigate to the project directory and install the dependencies:</p>

  <pre class="bg-gray-800 text-white p-4 rounded"><code>cd my-blog
npm install</code></pre>

  <h3>Creating Blog Posts</h3>

  <p>Now you can create blog posts using Markdown. Create a new file in the <code>src/content/blog</code> directory with a <code>.md</code> extension.</p>

  <p>Here's an example of a blog post:</p>

  <pre class="bg-gray-800 text-white p-4 rounded"><code>&lt;script&gt;
  const title = "My First Blog Post";
  const date = "2023-01-01";
&lt;/script&gt;

&lt;h1&gt;{title}&lt;/h1&gt;
&lt;p&gt;Published on {date}&lt;/p&gt;

&lt;p&gt;This is my first blog post!&lt;/p&gt;

&lt;h2&gt;Heading 2&lt;/h2&gt;

&lt;p&gt;Some content here...&lt;/p&gt;</code></pre>

  <h3>Conclusion</h3>

  <p>SvelteKit makes it easy to build a blog with Markdown support. With a proper content management system, you can write your blog posts in Markdown and include rich content.</p>

  <p>In future posts, I'll cover more advanced topics like adding a CMS, implementing search functionality, and deploying your blog to production.</p>

  <p>Stay tuned!</p>
</article>
