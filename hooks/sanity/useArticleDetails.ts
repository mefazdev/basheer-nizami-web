import { useState, useEffect } from "react";
import { getArticleBySlug } from "@/lib/sanity/api";
import { Article } from "@/lib/types/article"; 
import { sanityClient } from "@/lib/sanity/client";

export function useArticleDetail(slug: string) {
  const [article, setArticle] = useState<Article | null>(null); 
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        setLoading(true);
        setError(null);

      const articleData = await getArticleBySlug(slug)
        if (!articleData) {
           console.log('No articelfound with slug:', slug)
          setError(new Error(`Article with slug "${slug}" not found`))
          return
        }

       
          setArticle(articleData);

        // Related articlesx
       try {
                const relatedQuery = `*[_type == "article" && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
                  _id,
                  title,
                  slug,
                  publishedAt,
                  tags,
                  status
                }`
                
                const relatedData = await sanityClient.fetch(relatedQuery, { 
                  currentSlug: slug 
                })
                
                // console.log('Related updates:', relatedData)
                setRelatedArticles(relatedData || [])
              } catch (relatedError) {
                console.warn('Failed to fetch related updates:', relatedError)
              }
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  return { article, relatedArticles, loading, error };
}



 
 