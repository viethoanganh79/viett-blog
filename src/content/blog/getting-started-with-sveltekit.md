---
title: Getting Started with SvelteKit
slug: getting-started-with-sveltekit
date: '2025-04-16'
excerpt: Learn how to build a blog with SvelteKit and Markdown.
tags: ['sveltekit', 'tutorial', 'web development']
author: Your Name
image: /images/posts/sveltekit-learn.png
---

## Introduction to SvelteKit

[SvelteKit](https://kit.svelte.dev/) is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.

In this post, I'll walk you through the process of setting up a blog with SvelteKit.

### Prerequisites

Before we start, make sure you have the following installed:

- Node.js (version 16 or later)
- npm or yarn

### Setting Up a New SvelteKit Project

To create a new SvelteKit project, run the following command:

```bash
npm create svelte@latest my-blog
```

Follow the prompts to configure your project. I recommend selecting the following options:

- SvelteKit demo app
- TypeScript
- ESLint, Prettier, and Playwright for testing

Once the project is created, navigate to the project directory and install the dependencies:

```bash
cd my-blog
npm install
```

### Creating Blog Posts

Now you can create blog posts using Markdown. Create a new file in the `src/content/blog` directory with a `.md` extension.

Here's an example of a blog post:

```md
---
title: My First Blog Post
date: '2023-01-01'
---

# My First Blog Post

This is my first blog post!

## Heading 2

Some content here...
```

### Conclusion

SvelteKit makes it easy to build a blog with Markdown support. With a proper content management system, you can write your blog posts in Markdown and include rich content.

In future posts, I'll cover more advanced topics like adding a CMS, implementing search functionality, and deploying your blog to production.

Stay tuned!
