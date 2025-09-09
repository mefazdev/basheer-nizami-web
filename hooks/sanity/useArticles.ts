 
import { useState, useEffect } from "react";
import {
  getArticles,
  getFeaturedArticles,
  searchArticles,
} from "@/lib/sanity/api";
import { Article } from "@/lib/types/article"

// REMOVED transformSanityArticle import since api.ts already transforms

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        // getArticles() already returns transformed data - don't transform again
        const transformedArticles = await getArticles();
        // console.log('Articles from API (already transformed):', transformedArticles);
        setArticles(transformedArticles);
      } catch (err) {
        setError(err as Error);
        // console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return { articles, loading, error };
}

export function useFeaturedArticles() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        // getFeaturedArticles() already returns transformed data
        const transformedArticles = await getFeaturedArticles();
        // console.log('Featured articles from API (already transformed):', transformedArticles);
        setFeaturedArticles(transformedArticles);
      } catch (err) {
        console.error("Error fetching featured articles:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return { featuredArticles, loading };
}

export function useArticleSearch(searchTerm: string) {
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    async function performSearch() {
      try {
        setSearching(true);
        // searchArticles() already returns transformed data
        const transformedArticles = await searchArticles(searchTerm);
        // console.log('Search results from API (already transformed):', transformedArticles);
        setSearchResults(transformedArticles);
      } catch (err) {
        console.error("Error searching articles:", err);
      } finally {
        setSearching(false);
      }
    }

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return { searchResults, searching };
}