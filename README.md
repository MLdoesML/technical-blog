# James's Technical Blog

An Astro-based research blog for long-form technical writing.

## Requirements

- Node.js 18+ recommended
- npm

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the local dev server:

```bash
npm run dev
```

3. Open the local site:

```text
http://localhost:4321
```

Astro will hot-reload the page as you edit files.

## Build Locally

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Where To Edit

- Site shell and shared layout:
  [`src/components/layout`](/Users/jamesmingliangang/build-space/blog%20space/my-blog/src/components/layout)
- Global styles:
  [`src/styles/global.css`](/Users/jamesmingliangang/build-space/blog%20space/my-blog/src/styles/global.css)
- Long-form prose styles:
  [`src/styles/prose.css`](/Users/jamesmingliangang/build-space/blog%20space/my-blog/src/styles/prose.css)
- Home page:
  [`src/pages/index.astro`](/Users/jamesmingliangang/build-space/blog%20space/my-blog/src/pages/index.astro)
- About page:
  [`src/pages/about.astro`](/Users/jamesmingliangang/build-space/blog%20space/my-blog/src/pages/about.astro)
- Blog content collection config:
  [`src/content.config.ts`](/Users/jamesmingliangang/build-space/blog%20space/my-blog/src/content.config.ts)

## Adding A Post

Posts live in:

```text
src/content/posts/
```

Create a new `.md` or `.mdx` file with a date-prefixed filename, for example:

```text
src/content/posts/2026-03-24-my-first-post.mdx
```

Example frontmatter:

```md
---
title: "My First Post"
subtitle: "Optional subtitle"
date: 2026-03-24
domain: "ml-ai"
tags: ["example", "notes"]
summary: "A short summary used for cards and metadata."
draft: false
math: false
toc: true
featured: false
---

Your post content goes here.
```

Valid `domain` values:

- `ml-ai`
- `economics`
- `physics`
- `biology`
- `chemistry`
- `business-strategy`

## Notes

- The site currently has no posts in `src/content/posts`, so empty-state warnings during build are expected until you add one.
- Math is supported with KaTeX through `remark-math` and `rehype-katex`.
- RSS and sitemap are generated during build.
