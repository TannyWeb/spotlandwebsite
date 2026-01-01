/// <reference types="astro/client" />

// Sanity environment variables (PUBLIC_ prefix for client-side access)
interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_SANITY_API_VERSION?: string;
  readonly PUBLIC_SANITY_USE_CDN?: string;
  readonly SANITY_API_TOKEN?: string; // Server-only, no PUBLIC_ prefix
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

