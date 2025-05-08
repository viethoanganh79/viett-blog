<script lang="ts">
  const title = "Hello World";
  const date = "2025-04-16";
</script>

<svelte:head>
  <title>{title} | Viett Blog</title>
  <meta name="description" content="This is my first post, and I'm excited to share my thoughts and experiences with you." />
</svelte:head>

<article class="prose prose-slate lg:prose-xl mx-auto">
  <h1>{title}</h1>
  <p class="text-gray-500">Published on {date}</p>

  <h2>Welcome to My Blog!</h2>

  <p>Hello and welcome to my new blog! This is my first post, and I'm excited to share my thoughts and experiences with you.</p>

  <p>This blog is built with <a href="https://kit.svelte.dev/">SvelteKit</a>, a powerful framework for building web applications. I'm using Svelte to write my posts, which makes it easy to format text and add code snippets.</p>

  <pre class="bg-gray-800 text-white p-4 rounded"><code>// Example code snippet
function greet(name) &#123;
  return "Hello, " + name + "!";
&#125;

console.log(greet("World"));</code></pre>

  <h3>Why I Started This Blog</h3>

  <p>I started this blog to:</p>

  <ol>
    <li>Share my knowledge and experiences</li>
    <li>Document my learning journey</li>
    <li>Connect with like-minded people</li>
    <li>Improve my writing skills</li>
  </ol>

  <h3>What to Expect</h3>

  <p>In this blog, I'll be writing about:</p>

  <ul>
    <li>Web development</li>
    <li>Programming tips and tricks</li>
    <li>My personal projects</li>
    <li>Thoughts on technology trends</li>
  </ul>

  <p>I hope you find my content useful and interesting. Feel free to leave comments and share your thoughts!</p>

  <p>Stay tuned for more posts coming soon.</p>
</article>
