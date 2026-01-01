# Migration from Payload CMS to Sanity CMS

## ✅ Completed Steps

1. **Removed Payload/Next.js Files:**
   - Deleted `src/app/(payload)/` folder
   - Deleted `src/payload.config.ts`
   - Deleted `src/payload-types.ts`
   - Deleted `src/payload-generated-schema.ts`
   - Deleted `src/collections/` folder
   - Deleted `src/globals/` folder
   - Deleted `src/middleware.ts`
   - Deleted `next.config.mjs`

2. **Cleaned Up package.json:**
   - Removed all `@payloadcms/*` packages
   - Removed `next`, `react`, `react-dom`
   - Removed `graphql` (not needed for Sanity)
   - Updated scripts to use Astro only

3. **Created Sanity Structure:**
   - Created `src/lib/sanity.ts` with Sanity client and helper functions
   - Created `schema/` directory with:
     - `service.ts` - Service schema (migrated from Payload)
     - `newsItem.ts` - News item schema (new)
     - `navigation.ts` - Navigation schema (migrated from Payload)
     - `index.ts` - Schema exports

4. **Updated Configuration:**
   - Updated `astro.config.mjs` (removed Payload references)
   - Updated `.env.example` with Sanity environment variables

## 📦 Packages to Remove

You can now uninstall these packages (they're already removed from package.json):

```bash
npm uninstall @payloadcms/db-sqlite @payloadcms/next @payloadcms/richtext-lexical @payloadcms/ui next payload react react-dom graphql concurrently
```

## 🚀 Next Steps

1. **Sanity Client ✅ Already Installed**
   The `@sanity/client` package is already installed. Sanity works directly as an API client - no Astro integration needed.

2. **Set up Sanity Studio:**
   ```bash
   npm create sanity@latest -- --template clean
   ```
   Or use the Sanity CLI to create a new project if you haven't already.

4. **Configure your Sanity project:**
   - Create a `.env` file from `.env.example`
   - Add your `SANITY_PROJECT_ID` and `SANITY_DATASET`
   - Get these from your Sanity project dashboard: https://www.sanity.io/manage

5. **Import schemas to Sanity Studio:**
   - Copy the schemas from `schema/` to your Sanity Studio's `schemas/` folder
   - Or configure your Studio to use the schemas from this project

6. **Update Astro pages:** ✅ DONE
   - ✅ Updated `src/pages/index.astro` to use `getServices()` from `src/lib/sanity.ts`
   - ✅ Updated `src/pages/services/[slug].astro` to use `getServiceBySlug()`
   - ✅ Updated `src/layouts/MainLayout.astro` to use `getNavigation()`
   
   **Note:** The pages now use basic Portable Text rendering. For production, consider installing `@portabletext/astro` or `@portabletext/react` for better rich text rendering.

## 📝 Schema Notes

The schemas have been created to match your original Payload CMS structure:

- **Service**: All fields from the original Payload service collection
- **News Item**: New content type for community news and updates
- **Navigation**: Header menu and footer information

## 🔄 Data Migration

If you have existing data in Payload CMS, you'll need to:
1. Export your data from Payload (JSON format)
2. Transform it to match Sanity's structure
3. Import it into Sanity using the Sanity CLI or Studio

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Using Sanity with Astro](https://www.sanity.io/docs/js-client)
- [Sanity Client Documentation](https://www.sanity.io/docs/js-client)

