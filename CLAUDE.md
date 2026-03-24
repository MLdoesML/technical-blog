# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

A production-grade research blog built with Astro + MDX, covering ML/AI, economics, physics, biology, chemistry, and business strategy. The design philosophy is "Scientific Rigor" and "Intellectual Authority," modeled after Distill.pub, Yang Song, Karpathy, and Tufte's information design.

## Commands

```bash
npm run dev      # start dev server at localhost:4321
npm run build    # production build → dist/
npm run preview  # preview built site
```

## Current Repo Status

- Astro is currently on v6 in `package.json`.
- MDX, KaTeX, and Shiki-style syntax highlighting are already configured.
- Tailwind CSS is not installed yet in the current codebase.
- Styling currently lives in `src/styles/global.css` and `src/styles/prose.css`.

When making changes, preserve the existing working setup unless the task explicitly includes migrating to Tailwind or changing the styling architecture.

## Target Architecture & Design Direction

**Framework:** Astro with MDX for long-form research posts. Prefer static-first rendering and minimal client JavaScript. Deploy target is Cloudflare Pages unless the task says otherwise.

**Content:** MDX files in `src/content/posts/` (or `src/content/blog/` if a migration is requested). Schema is validated in `src/content.config.ts`. File naming should stay date-prefixed: `YYYY-MM-DD-slug.mdx`.

**Typography:** High-end serif-first reading experience. Favor Libre Baskerville or ET Book for prose and Inter or Neue Haas Grotesk for UI, metadata, and headings. The site should feel editorial, academic, and calm rather than product-marketing oriented.

**Math:** `remark-math` + `rehype-katex` for server-rendered LaTeX. Keep math fast, static, and readable in both themes. If math is optional per-post, gate KaTeX CSS with frontmatter such as `math: true`.

**Code:** Use Shiki with restrained, low-contrast themes such as `github-light`, `github-dark`, or `nord`. Syntax highlighting should support the prose, not dominate it.

**Layout Philosophy:** Tufte-style information design. The main reading column should be about 650px-750px and intentionally leave room for a generous right-side margin for sidenotes, citations, and figure annotations.

**Visual Style:** Visual silence. No generic SaaS hero treatments, loud gradients, oversized buttons, or heavy shadows. Prefer thin borders, excellent spacing, subtle contrast, and refined micro-typography.

**Dark Mode:** Paper-centric dark mode only. Use dark slate or graphite surfaces instead of pure black so prose, equations, diagrams, and code blocks remain legible and calm.

## Information Design Rules

**Grid:** Use an off-center article layout with a wide right gutter on desktop. Avoid centering everything in a generic marketing container.

**Sidenotes:** Implement Tufte-style sidenotes as a first-class MDX component. On desktop they live in the right margin. On mobile they collapse inline or become toggleable. Numbering or labels should be automatic whenever practical.

**Outset / Full-width Figures:** Support figures that can break out of the prose column for large diagrams, charts, and dense visual explanations. These should feel deliberate and publication-grade, not edge-to-edge by default.

**Navigation:** Keep navigation minimal. Prefer a simple header, breadcrumb, or "Back to Index" pattern plus search across MDX content.

**Search:** Any search implementation should prioritize post discovery and content indexing over flashy UI.

## Domain-Specific Component Library

Build and maintain a reusable component library under `src/components/` and, when interactivity is required, `src/components/islands/` or `src/islands/`.

**Paper Header:** A research-paper style header component with title, authors, affiliations, date, DOI, and abstract block.

**Citation System:** A BibTeX-compatible citation workflow. Clicking a citation should either highlight the corresponding bibliography entry or show a lightweight popover. Citations should feel academic, not like generic footnotes.

**Sidenote Component:** Academic margin note component with responsive fallback behavior.

**Flowchart Component:** Mermaid.js or SVG-based diagrams for systems, strategy, and architecture explanations. Favor clean linework and typographic consistency.

**Chemistry Renderer:** Prefer a lightweight SVG-based SMILES renderer or a thin wrapper around a chemistry rendering tool when chemistry content is needed. Keep the abstraction small and optional.

**Interactive Figure Placeholder:** Leave room for Observable Plot, D3, or similar explorable-explanation components. Hydrate only when the post truly benefits from interaction.

## Preferred Task Sequence For Major UI Work

When asked to evolve the blog toward the research-journal aesthetic, use this order unless the user asks for something narrower:

1. Establish the typography and global CSS foundation.
2. Implement the Tufte margin grid and reading layout.
3. Create or refine `BaseLayout` / `PostLayout`.
4. Add core academic components such as `Sidenote`, `Citation`, `PaperHeader`, and `OutsetFigure`.
5. Create a sample deep-dive post that demonstrates math, sidenotes, citations, and code.
6. Refine search, bibliography behavior, and optional interactive figures.

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
doi: "10.xxxx/xxxxx"                   # optional
authors:                               # optional
  - name: "Author Name"
    affiliation: "Institution"
abstract: "Optional paper-style abstract"
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

## Implementation Preferences

- Prefer semantic HTML, server rendering, and minimal hydration.
- Keep client-side JavaScript optional and targeted.
- Preserve reading comfort above all else.
- Favor CSS variables for design tokens even if Tailwind is introduced later.
- If Tailwind is added, use it to support the editorial system rather than default utility-first SaaS patterns.
- Do not introduce visual noise for the sake of novelty.

## Adding Interactive Figures

When a post needs a Distill-style interactive figure:
1. Install: `npm install @astrojs/react react react-dom d3`
2. Add `@astrojs/react` to integrations in `astro.config.mjs`
3. Create `src/components/figures/[Slug]Viz.tsx`
4. Import in MDX with `client:visible` to hydrate only on scroll-into-view

## Deployment

Cloudflare Pages — connect GitHub repo in Cloudflare dashboard. Build command: `npm run build`. Output dir: `dist`. Update `site` in `astro.config.mjs` with actual domain before deploying.
