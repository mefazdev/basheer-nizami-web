import { sanityClient } from './config'
import { articleQueries, newsQueries } from './queries'
import { transformSanityArticle, transformSanityNewsItem } from '@/lib/utils/sanity'

export async function getArticles() {
  const data = await sanityClient.fetch(articleQueries.getAll)
  return data.map(transformSanityArticle)
}

export async function getArticleBySlug(slug: string) {
  const data = await sanityClient.fetch(articleQueries.getBySlug, { slug })
 
  return data ? transformSanityArticle(data) : null
}

export async function getFeaturedArticles() {
  const data = await sanityClient.fetch(articleQueries.getFeatured)
  return data.map(transformSanityArticle)
}
export async function getRelatedArticles(categorySlug: string, currentSlug: string) {
  return await sanityClient.fetch(articleQueries.getRelated, { 
    categorySlug, 
    currentSlug 
  })
}

export async function getNewsItems() {
  const data = await sanityClient.fetch(newsQueries.getAll)
  return data.map(transformSanityNewsItem)
}
export async function getNewsesBySlug(slug: string) {
  const data = await sanityClient.fetch(newsQueries.getBySlug, { slug })
 
  return data ? transformSanityNewsItem(data) : null
}

export async function getFeaturedNews() {
  const data = await sanityClient.fetch(newsQueries.getFeatured)
 
    return data?.map(transformSanityNewsItem)
 
}

// For search functionality
export async function searchArticles(searchTerm: string) {
  const query = `*[_type == "article" && (
    title match $searchTerm ||
    excerpt match $searchTerm ||
    pt::text(content) match $searchTerm
  )] | order(publishedAt desc) {
    ${articleQueries.getAll.split('{')[1]}`
  
  const data = await sanityClient.fetch(query, { searchTerm: `*${searchTerm}*` })
  return data.map(transformSanityArticle)
}