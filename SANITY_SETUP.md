# Sanity CMS Setup Guide

## ✅ Migration Complete!

Your project has been successfully migrated from Payload CMS + Next.js to Sanity CMS + Astro.

## 📋 What Was Done

### Removed
- ✅ All Payload CMS files (`src/app/`, `src/payload.config.ts`, etc.)
- ✅ Next.js configuration (`next.config.mjs`)
- ✅ Payload collections and globals (converted to Sanity schemas)
- ✅ All Payload/Next.js dependencies from `package.json`

### Created
- ✅ `src/lib/sanity.ts` - Sanity client with helper functions
- ✅ `schema/` directory with:
  - `service.ts` - Service content type
  - `newsItem.ts` - News item content type  
  - `navigation.ts` - Navigation settings
  - `index.ts` - Schema exports
- ✅ Updated `.env.example` with Sanity variables
- ✅ Updated all Astro pages to use Sanity instead of Payload

## 🚀 Next Steps

### 1. Sanity Client ✅ Already Installed
The `@sanity/client` package is already installed and configured in `src/lib/sanity.ts`. No Astro integration is needed - Sanity works directly as an API client.

### 2. Set Up Sanity Studio

**Option A: Create a new Sanity project**
```bash
npm create sanity@latest
```
Follow the prompts to create your project.

**Option B: Use existing Sanity project**
If you already have a Sanity project, just configure the environment variables.

### 3. Configure Environment Variables

Create a `.env` file:
```bash
cp env.example .env
```

Edit `.env` and add your Sanity credentials:
```env
SANITY_PROJECT_ID=your-project-id-here
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_USE_CDN=false
```

Get your `SANITY_PROJECT_ID` from: https://www.sanity.io/manage

### 4. Import Schemas to Sanity Studio

Copy the schemas from `schema/` to your Sanity Studio's `schemas/` folder, or configure your Studio to reference them.

If you're using a separate Sanity Studio:
1. Copy `schema/*.ts` files to your Studio's `schemas/` folder
2. Update your Studio's `sanity.config.ts` to import from `schema/index.ts`

### 5. Test the Setup

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

## 📝 Important Notes

### Rich Text Rendering
The current implementation uses basic Portable Text rendering. For production, consider:

```bash
npm install @portabletext/astro
```

Then update `src/pages/services/[slug].astro` to use proper Portable Text rendering.

### Slug Fields
Sanity uses `slug.current` for slug fields. The code has been updated to handle this, but when accessing slugs in your code, use:
- `service.slug.current` (after fetching from Sanity)
- Or the helper functions in `src/lib/sanity.ts` handle this automatically

### Data Migration
If you have existing Payload data:
1. Export from Payload (JSON)
2. Transform to Sanity structure
3. Import using Sanity CLI or Studio

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Using Sanity with Astro](https://www.sanity.io/docs/js-client)
- [Sanity Client Documentation](https://www.sanity.io/docs/js-client)
- [Portable Text](https://www.sanity.io/docs/portable-text)

## 🎉 You're All Set!

Your project is now a pure Astro + Sanity setup. No more Next.js or Payload dependencies!

