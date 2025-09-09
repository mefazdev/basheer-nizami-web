// hooks/sanity/useHomepage.ts
import { useState, useEffect } from "react";
import { sanityClient } from "@/lib/sanity/config";
import { transformSanityArticle, transformSanityNewsItem } from "@/lib/utils/sanity";
import { Article } from "@/lib/types/article";
import { UpdateItem } from "@/lib/types/updates";

// Get recent articles for homepage (limit 3)
export function useRecentArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRecentArticles() {
      try {
        setLoading(true);
        
        // Query for 3 most recent articles
        const query = `*[_type == "article"] | order(publishedAt desc) [0...3] {
          _id,
          title,
          slug,
          excerpt,
          mainImage {
            asset->{url},
            alt
          },
          author->{
            name
          },
          category->{
            title
          },
          readTime,
          publishedAt,
          views,
          featured
        }`;
        
        const data = await sanityClient.fetch(query);
        // console.log('Recent articles for homepage:', data);
        
        // Transform the data
        const transformedArticles = data.map(transformSanityArticle);
        setArticles(transformedArticles);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching recent articles:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentArticles();
  }, []);

  return { articles, loading, error };
}

// Get recent updates for homepage (limit 3)
export function useRecentUpdates() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRecentUpdates() {
      try {
        setLoading(true);
        
        // Query for 3 most recent updates
        const query = `*[_type == "newsItem"] | order(publishedAt desc) [0...3] {
          _id,
          title,
          slug,
          body,
          image {
            asset->{url},
            alt
          },
          publishedAt,
       
           category->{
            title
          },
          
        }`;
        
        const data = await sanityClient.fetch(query);
         const transformedUpdates = data.map(transformSanityNewsItem);
        // console.log('Recent updates for homepage:', transformedUpdates);
        setUpdates(transformedUpdates);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching recent updates:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentUpdates();
  }, []);

  return { updates, loading, error };
}

// Combined hook for homepage content
export function useHomepageContent() {
  const { articles, loading: articlesLoading, error: articlesError } = useRecentArticles();
  const { updates, loading: updatesLoading, error: updatesError } = useRecentUpdates();

  return {
    articles,
    updates,
    loading: articlesLoading || updatesLoading,
    articlesError,
    updatesError
  };
}