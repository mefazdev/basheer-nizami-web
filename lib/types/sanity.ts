import { PortableTextBlock } from "@portabletext/react"

 
// Raw Sanity type (matches schema)
export interface SanityArticle {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: PortableTextBlock[] // Portable Text
  mainImage?: {
    asset: { _ref: string; url?: string }
    alt?: string
  }
  author?: {
    name: string
    bio?: string
    image?: string
  }
  category?: {
    title: string
    slug?: { current: string }
  }
  tags?: Array<{
    title: string
    slug?: { current: string }
  }>
  featured?: boolean
  readTime?: number
  publishedAt?: string
  views?: number
}

export interface SanityNewsItem {
  _id: string
  title: string
  slug?: { current: string }
  excerpt: string
  content?: PortableTextBlock[] // Portable Text
  // category: 'media' | 'publication' | 'speaking' | 'award' | 'research' | 'announcement'
category?: {
    title: string
    slug?: { current: string }
  }
  image?: {
    asset: { _ref: string; url?: string }
    alt?: string
  }
  // source?: string
  // externalLink?: string
  featured: boolean
  // tags: string[]
  publishedAt: string
}

 
export interface Article {
  _id: string
  title: string
  excerpt: string
    content: PortableTextBlock[] 
  // content:  string// HTML already converted
  author: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  image?: string 
  views: number
  slug: string
}
export interface NewsItem {
  _id: string
  title: string
  // content:string;
      content: PortableTextBlock[] 
  excerpt: string
  category?: string
//  publishedAt: string
  image?: string
  // source?: string
  // link?: string
  featured?: boolean
  // tags: string[]
  publishedAt:string
  slug:string

}
