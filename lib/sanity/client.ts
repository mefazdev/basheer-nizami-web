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
  content: string;
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
 