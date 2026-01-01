// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schema';

export default defineConfig({
  name: 'spotland-community-hub',
  title: 'Spotland Hub Admin',

  // Hardcoding these for the "Competition" build phase to avoid env-load errors
  projectId: 'p99s2uik', 
  dataset: 'production',

  // This MUST match the studioBasePath you put in astro.config.mjs
  basePath: '/admin',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});