// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Server output - dynamic routes don't need getStaticPaths()
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    sanity({
      projectId: 'p99s2uik',
      dataset: 'production',
      studioBasePath: '/admin',
      // Configure Studio to work with server output
      apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
    }),
    react(),
  ],
  vite: {
    // @ts-ignore - Type compatibility issue between Astro's Vite and Tailwind v4's Vite types
    plugins: [tailwindcss()],
  },
});