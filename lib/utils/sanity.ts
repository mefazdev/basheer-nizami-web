 

// import { SanityArticle, SanityNewsItem, Article, NewsItem } from '@/lib/types/sanity'
// import { toHTML } from '@portabletext/to-html'
// import { getImageUrl, urlFor } from '@/lib/sanity/config'
 

// // Fixed transformer based on your actual data structure
// export function transformSanityArticle(sanityArticle: any): Article {
//   // Debug log to see what we're receiving
//   // console.log('Transforming article:', sanityArticle)
  
//   return {
//     _id: sanityArticle._id || '',
//     title: sanityArticle.title || 'Untitled',
//     excerpt: sanityArticle.excerpt || '',
//     content: sanityArticle.content || null, // Keep raw for PortableText
    
//     // Your data structure: author: {name: 'Salahuddeen', bio: '...', image: {...}}
//     author: sanityArticle.author?.name || 'Unknown Author',
    
//     // Your data structure: publishedAt: "2025-09-06T09:04:00.000Z"
//     publishDate: sanityArticle.publishedAt || new Date().toISOString(),
    
//     // Your data structure: readTime: 45
//     readTime: sanityArticle.readTime ? `${sanityArticle.readTime} min read` : '5 min read',
    
//     // Your data structure: category: {title: 'Technology', slug: {...}}
//     category: sanityArticle.category?.title || 'Uncategorized',
    
//     // Your data structure: tags: [{...}]
//     tags: sanityArticle.tags?.map((tag: any) => tag.title || tag) || [],
    
//     featured: sanityArticle.featured || false,
    
//     // Your data structure: mainImage: {asset: {...}, alt: 'sample'}
//     image: sanityArticle.mainImage?.asset?.url || 
//            (sanityArticle.mainImage ? urlFor(sanityArticle.mainImage).width(800).height(400).url() : null) ||
//            '/images/islam.jpg',
           
//     views: sanityArticle.views || 0,
    
//     // Your data structure: slug: {current: 'global-warming-in-tech-world', _type: 'slug'}
//     slug: sanityArticle.slug?.current || '',
//   }
// }

// // Transform Sanity news item
// export function transformSanityNewsItem(sanityNewsItem: any): NewsItem {
//   return {
//     _id: sanityNewsItem._id || '',
//     title: sanityNewsItem.title || 'Untitled',
//     excerpt: sanityNewsItem.excerpt || '',
//     // category: sanityNewsItem.category || 'News',
//     category: sanityNewsItem.category?.title || 'Uncategorized',
//     content:sanityNewsItem.content,
//     publishedAt: sanityNewsItem.publishedAt || new Date().toISOString(),
//     image: sanityNewsItem.image?.asset?.url || 
//            (sanityNewsItem.image ? urlFor(sanityNewsItem.image).width(800).height(400).url() : null) ||
//            '/images/islam.jpg',  
//     // source: sanityNewsItem.source || 'Unknown',
//     // link: sanityNewsItem.externalLink || '',
//     featured: sanityNewsItem.featured || false,
//         slug: sanityNewsItem.slug?.current || '',
//     // tags: sanityNewsItem.tags || []
//   }
// }


import { SanityArticle, SanityNewsItem, Article, NewsItem } from '@/lib/types/sanity'
import { urlFor } from '@/lib/sanity/config'
import { PortableTextBlock } from '@portabletext/react'

// Transform Sanity → frontend Article
export function transformSanityArticle(sanityArticle: SanityArticle): Article {
  return {
    _id: sanityArticle._id || '',
    title: sanityArticle.title || 'Untitled',
    excerpt: sanityArticle.excerpt || '',
    // content: sanityArticle.content ? JSON.stringify(sanityArticle.content) : '', // store as string for frontend
// content: sanityArticle.content as PortableTextBlock[],
    content: sanityArticle.content as PortableTextBlock[], // ✅ keep blocks
    author: sanityArticle.author?.name || 'Unknown Author',
    publishDate: sanityArticle.publishedAt || new Date().toISOString(),
    readTime: sanityArticle.readTime ? `${sanityArticle.readTime} min read` : '5 min read',
    category: sanityArticle.category?.title || 'Uncategorized',

    tags: sanityArticle.tags?.map((tag) => tag.title) || [],

    featured: sanityArticle.featured || false,

    // image:
    //   sanityArticle.mainImage?.asset?.url ||
    //   (urlFor(sanityArticle?.mainImage ).width(800).height(400).url() ),
image:
  sanityArticle.mainImage?.asset?.url ||
  (sanityArticle.mainImage
    ? urlFor(sanityArticle.mainImage).width(800).height(400).url()
    : '/images/islam.jpg'),
    views: sanityArticle.views || 0,
    slug: sanityArticle.slug?.current || '',
  }
}

// Transform Sanity → frontend NewsItem
export function transformSanityNewsItem(sanityNewsItem: SanityNewsItem): NewsItem {
  return {
    _id: sanityNewsItem._id || '',
    title: sanityNewsItem.title || 'Untitled',
    excerpt: sanityNewsItem.excerpt || '',
    category: sanityNewsItem.category?.title || 'Uncategorized',

    // content: sanityNewsItem.content ? JSON.stringify(sanityNewsItem.content) : '',
  content: sanityNewsItem.content as PortableTextBlock[], // ✅ keep blocks
 
    publishedAt: sanityNewsItem.publishedAt || new Date().toISOString(),

    image:
      sanityNewsItem.image?.asset?.url ||
      (sanityNewsItem.image ? urlFor(sanityNewsItem.image).width(800).height(400).url() : null) ||
      '/images/islam.jpg',

    featured: sanityNewsItem.featured || false,
    slug: sanityNewsItem.slug?.current || '',
  }
}
