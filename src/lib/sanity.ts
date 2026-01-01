import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

// Sanity client configuration
// These values will come from environment variables (PUBLIC_ prefix for client-side access)
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01';
const useCdn = import.meta.env.PUBLIC_SANITY_USE_CDN === 'true' || false;

if (!projectId) {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID environment variable');
}

// Create the Sanity client
export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  // Set to false if you want to ensure fresh data on every request
  // Set to true for better performance with cached data
});

// Helper function to fetch all services
export async function getServices() {
  const query = `*[_type == "service"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    schedule,
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
    description,
    schedule,
    callToAction,
    featured,
    goodToKnow,
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

// Helper function to fetch news items
export async function getNewsItems(limit: number = 10) {
  const query = `*[_type == "newsItem"] | order(_createdAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    featuredImage,
    _createdAt,
    _updatedAt
  }`;
  
  return await sanityClient.fetch(query, { limit });
}

// Helper function to fetch a single news item by slug
export async function getNewsItemBySlug(slug: string) {
  const query = `*[_type == "newsItem" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    featuredImage,
    _createdAt,
    _updatedAt
  }`;
  
  return await sanityClient.fetch(query, { slug });
}

