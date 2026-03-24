import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://mldoesml.github.io',
  base: '/technical-blog',
  integrations: [
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      langs: ['python', 'r', 'julia', 'typescript', 'javascript', 'bash', 'latex', 'json'],
      wrap: false,
    },
  },
});
