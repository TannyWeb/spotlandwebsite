import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
// These values will come from environment variables (PUBLIC_ prefix for client-side access)
// Fallback to hardcoded values for build environments (TODO: Use env vars in production)
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'p99s2uik';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01';
const useCdn = import.meta.env.PUBLIC_SANITY_USE_CDN === 'true' || false;

// Create the Sanity client
export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  // Set to false if you want to ensure fresh data on every request
  // Set to true for better performance with cached data
});

// Image URL builder for Sanity images
const builder = imageUrlBuilder(sanityClient);

// Helper function to generate optimized image URLs from Sanity
export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to fetch all services
export async function getServices() {
  const query = `*[_type == "service"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    category,
    mainImage {
      asset->
    },
    description,
    schedule,
    scheduleStructured,
    callToAction,
    featured,
    goodToKnow,
    _createdAt,
    _updatedAt
  }`;

  return await sanityClient.fetch(query);
}

// Helper function to fetch a single service by slug
export async function getServiceBySlug(slug: string) {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    mainImage {
      asset->
    },
    description,
    schedule,
    scheduleStructured,
    callToAction,
    featured,
    goodToKnow,
    benefits,
    targetAudience,
    stats,
    _createdAt,
    _updatedAt
  }`;

  return await sanityClient.fetch(query, { slug });
}

// Helper function to fetch navigation data
export async function getNavigation() {
  const query = `*[_type == "navigation"][0] {
    header,
    footer
  }`;
  
  return await sanityClient.fetch(query);
}

// Helper function to fetch posts (latest posts, with featured first)
export async function getPosts(limit: number = 10) {
  // Query for posts: featured first, then by published date
  const query = `*[_type == "post"] | order(featured desc, publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->
    },
    body,
    featured,
    _createdAt,
    _updatedAt
  }`;
  
  const results = await sanityClient.fetch(query, { limit });
  console.log(`[getPosts] Query: _type == "post", limit: ${limit}`);
  console.log(`[getPosts] Fetched ${results.length} posts from Sanity:`, results.map((p: any) => ({ title: p.title, featured: p.featured, publishedAt: p.publishedAt })));
  return results;
}

// Helper function to fetch a single post by slug
export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->
    },
    body,
    featured,
    youtubeUrl,
    showAccreditationBadge,
    _createdAt,
    _updatedAt
  }`;
  
  return await sanityClient.fetch(query, { slug });
}

// Helper function to fetch the featured post (for footer badge)
export async function getFeaturedPost() {
  const query = `*[_type == "post" && featured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    slug,
    _createdAt,
    _updatedAt
  }`;

  return await sanityClient.fetch(query);
}

// Helper function to fetch about page content
export async function getAboutPageContent() {
  const query = `*[_type == "aboutPage"][0] {
    title,
    ourStory,
    ourStoryImage {
      asset->
    },
    showTeam,
    showPartners
  }`;

  return await sanityClient.fetch(query);
}

// Helper function to fetch team members
export async function getTeamMembers() {
  const query = `*[_type == "teamMember"] | order(order asc, name asc) {
    _id,
    name,
    role,
    photo {
      asset->
    },
    bio
  }`;

  return await sanityClient.fetch(query);
}

// Helper function to fetch partners
export async function getPartners() {
  const query = `*[_type == "partner"] | order(order asc, name asc) {
    _id,
    name,
    logo {
      asset->
    },
    description,
    website,
    partnershipType
  }`;

  return await sanityClient.fetch(query);
}

// Helper function to fetch all posts (for about page)
export async function getAllPosts() {
  const query = `*[_type == "post"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->
    },
    body,
    featured
  }`;

  return await sanityClient.fetch(query);
}

// Helper function to fetch all service slugs (for static generation)
export async function getAllServiceSlugs() {
  const query = `*[_type == "service" && defined(slug.current)].slug.current`;
  return await sanityClient.fetch(query);
}

// Helper function to fetch all post slugs (for static generation)
export async function getAllPostSlugs() {
  const query = `*[_type == "post" && defined(slug.current)].slug.current`;
  return await sanityClient.fetch(query);
}

// Helper function to fetch all gallery albums
export async function getGalleries() {
  const query = `*[_type == "gallery"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage {
      asset->
    },
    "photoCount": count(photos),
    publishedAt,
    featured
  }`;

  return await sanityClient.fetch(query);
}

// Helper function to fetch a single gallery by slug
export async function getGalleryBySlug(slug: string) {
  const query = `*[_type == "gallery" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    coverImage {
      asset->
    },
    photos[] {
      image {
        asset->
      },
      caption,
      altText
    },
    publishedAt,
    featured
  }`;

  return await sanityClient.fetch(query, { slug });
}

// Helper function to fetch all gallery slugs (for static generation)
export async function getAllGallerySlugs() {
  const query = `*[_type == "gallery" && defined(slug.current)].slug.current`;
  return await sanityClient.fetch(query);
}

