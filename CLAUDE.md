# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

A world-class researcher blog built with Astro v6, covering ML/AI, economics, physics, biology, chemistry, and business strategy. Modeled after Yang Song, Distill.pub, and Karpathy.

## Commands

```bash
npm run dev      # start dev server at localhost:4321
npm run build    # production build → dist/
npm run preview  # preview built site
```

## Architecture

**Framework:** Astro v6 (static output) → deployed to Cloudflare Pages

**Content:** MDX files in `src/content/posts/`. Schema validated by Zod in `src/content.config.ts`. File naming: `YYYY-MM-DD-slug.mdx`. Posts use `id` (not legacy `slug`) in Astro v6.

**Math:** `remark-math` + `rehype-katex` — renders LaTeX to HTML/CSS at build time. Zero client-side JS. Set `math: true` in post frontmatter to load KaTeX CSS.

**Syntax highlighting:** Shiki (built into Astro), themes `github-light`/`github-dark`, configured in `astro.config.mjs`.

**Styling:** Custom CSS variables in `src/styles/global.css` (theme tokens, layout). Prose typography in `src/styles/prose.css`. No Tailwind — pure CSS. CSS files must be imported in Astro component frontmatter (`import '../styles/global.css'`), not linked as static files.

**Dark mode:** Vanilla JS in `<head>` reads `localStorage` and sets `data-theme` attribute before paint. No flash. Toggle in `Header.astro`.

**Taxonomy:** Two levels — `domain` (controlled enum, one per post) and `tags` (freeform array). Static pages generated per-tag at build time via `src/pages/tags/[tag].astro`.

## Post Frontmatter Schema

```yaml
---
title: "Post Title"
subtitle: "Optional subtitle"          # optional
date: 2026-03-24
domain: ml-ai                          # ml-ai | economics | physics | biology | chemistry | business-strategy
tags: [diffusion-models, score-matching]
summary: "Max 280 chars — shown in cards and meta description."
math: true                             # optional, default false — enables KaTeX CSS
toc: true                              # optional, default true
featured: false                        # optional, default false
draft: false                           # optional, default false
---
```

## Key Files

- `src/content.config.ts` — Zod schema + glob loader for posts collection (Astro v6 location)
- `astro.config.mjs` — remark-math, rehype-katex, Shiki config
- `src/styles/global.css` — all CSS custom properties (colors, fonts, spacing)
- `src/styles/prose.css` — body typography for post reading experience
- `src/components/layout/PostLayout.astro` — post template (header, metadata, prose wrapper)
- `src/components/layout/BaseLayout.astro` — HTML shell, fonts, dark mode script
- `src/lib/tags.ts` — domain labels, tag normalization, grouping

## Adding Interactive Figures (Phase 5)

When a post needs a Distill-style interactive figure:
1. Install: `npm install @astrojs/react react react-dom d3`
2. Add `@astrojs/react` to integrations in `astro.config.mjs`
3. Create `src/components/figures/[Slug]Viz.tsx`
4. Import in MDX with `client:visible` to hydrate only on scroll-into-view

## Deployment

Cloudflare Pages — connect GitHub repo in Cloudflare dashboard. Build command: `npm run build`. Output dir: `dist`. Update `site` in `astro.config.mjs` with actual domain before deploying.
