// hooks/sanity/useUpdates.ts
import { getFeaturedNews, getNewsItems } from "@/lib/sanity/api";
import { UpdateItem } from "@/lib/types/updates";

import { useState, useEffect } from "react";
 // Using your existing client.ts functions

export function useUpdates() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        setLoading(true);
        // getUpdates() from client.ts already returns properly typed data
        const data = await getNewsItems();
        console.log('Updates from API:', data);
        setUpdates(data);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching updates:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUpdates();
  }, []);

  return { updates, loading, error };
}

export function useFeaturedUpdates() {
  const [featuredUpdates, setFeaturedUpdates] = useState<UpdateItem []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const data= await getFeaturedNews() ;
        console.log("Featured updates from API (already transformed):",data);

        setFeaturedUpdates(data); // ✅ always NewsItem[]
      } catch (err) {
        console.error("Error fetching featured articles:", err);
        // setFeaturedUpdates([]); // fallback
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return { featuredUpdates, loading };
}



export function useUpdateSearch(searchTerm: string) {
  const [searchResults, setSearchResults] = useState<UpdateItem[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    async function performSearch() {
      try {
        setSearching(true);
        
        // Import sanityClient from your client.ts
        const { sanityClient } = await import("@/lib/sanity/client");
        
        const query = `*[_type == "update" && (
          title match $searchTerm ||
          pt::text(body) match $searchTerm
        )] | order(publishedAt desc) {
          _id,
          title,
          slug,
          body,
          publishedAt,
          tags,
          status
        }`;
        
        const data = await sanityClient.fetch(query, { searchTerm: `*${searchTerm}*` });
        // console.log('Search results:', data);
        setSearchResults(data);
      } catch (err) {
        console.error("Error searching updates:", err);
      } finally {
        setSearching(false);
      }
    }

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return { searchResults, searching };
}