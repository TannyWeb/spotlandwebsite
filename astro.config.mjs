// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Static output with Netlify adapter for /admin
  adapter: netlify(),
  integrations: [
    sanity({
      projectId: 'p99s2uik',
      dataset: 'production',
      studioBasePath: '/admin',
      apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
    }),
    react(),
  ],
  vite: {
    // @ts-ignore - Type compatibility issue between Astro's Vite and Tailwind v4's Vite types
    plugins: [tailwindcss()],
  },
});