import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource as SanityImageSourceBase } from "@sanity/image-url/lib/types/types";

// --- Client setup ---
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
  apiVersion: "2024-01-01",
});

const builder =   imageUrlBuilder(sanityClient);

// --- Types for content models ---

// Image type (extending Sanity’s own)
export type SanityImageSource  =  SanityImageSourceBase  

// Article schema type
export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImageSource;
  publishedAt: string;
  tags?: string[];
  author?: string;
  body?: unknown;
  seo?: unknown;
  status?: string;
}

// Update schema type
export interface Update {
  _id: string;
  title: string;
  slug: { current: string };
  body: unknown;
  publishedAt: string;
  tags?: string[];
  status?: string;
}

// --- Utils ---
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

// --- GROQ Queries ---
export const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  tags,
  author,
  status
}`;

export const updatesQuery = `*[_type == "update"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  body,
  publishedAt,
  tags,
  status
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  tags,
  author,
  body,
  seo,
  status
}`;

export const updateBySlugQuery = `*[_type == "update" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  publishedAt,
  tags,
  status
}`;

// --- Data fetchers (typed) ---
export async function getArticles(): Promise<Article[]> {
  try {
    return await sanityClient.fetch<Article[]>(articlesQuery);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getUpdates(): Promise<Update[]> {
  try {
    return await sanityClient.fetch<Update[]>(updatesQuery);
  } catch (error) {
    console.error("Error fetching updates:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    return await sanityClient.fetch<Article | null>(articleBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function getUpdateBySlug(slug: string): Promise<Update | null> {
  try {
    return await sanityClient.fetch<Update | null>(updateBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching update:", error);
    return null;
  }
}
