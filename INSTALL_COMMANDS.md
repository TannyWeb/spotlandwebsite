# Installation Commands

## Uninstall Payload CMS and Next.js Packages

Run this command to remove all Payload and Next.js related packages:

```bash
npm uninstall @payloadcms/db-sqlite @payloadcms/next @payloadcms/richtext-lexical @payloadcms/ui next payload react react-dom graphql concurrently
```

**Note:** These packages may already be removed from your `package.json`. If you get "not found" errors, that's fine - they're already gone!

## Install Sanity and React Packages

Run this command to install the required Sanity and React packages:

```bash
npm install @sanity/astro @sanity/client @astrojs/react react react-dom
```

## Update Your .env File

Make sure your `.env` file uses the `PUBLIC_` prefix for client-side variables:

```env
PUBLIC_SANITY_PROJECT_ID=your-project-id-here
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01
PUBLIC_SANITY_USE_CDN=false
```

## All-in-One Command

If you want to run everything at once:

```bash
npm uninstall @payloadcms/db-sqlite @payloadcms/next @payloadcms/richtext-lexical @payloadcms/ui next payload react react-dom graphql concurrently 2>/dev/null; npm install @sanity/astro @sanity/client @astrojs/react react react-dom
```

The `2>/dev/null` part will suppress errors if packages are already removed.

