export const articleQueries = {
  
  getAll: `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage{
      asset->{url},
      alt
    },
    author->{
      name,
      bio,
      image{asset->{url}}
    },
    category->{
      title,
      slug
    },
    tags[]->{
      title,
      slug
    },
    featured,
    readTime,
    publishedAt,
    views
  }`,

 
  getBySlug:` *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    content,
    mainImage {
      asset->{url},
      alt
    },
    author->{
      name,
      bio,
      image {
        asset->{url}
      }
    },
    category->{
      title,
      slug
    },
    tags[]->{
      title,
      slug
    },
    featured,
    readTime,
    publishedAt,
    views
  }
`
,
  getFeatured: `*[_type == "article" && featured == true] | order(publishedAt desc) [0...2] {
    _id,
    title,
    slug,
    excerpt,
    mainImage{asset->{url}, alt},
    author->{name},
    category->{title, slug},
    readTime,
    publishedAt,
    views
  }`,
 

  // Get related articles by category (excluding current article)
  getRelated: `*[_type == "article" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage{asset->{url}, alt},
    author->{name},
    category->{title, slug},
    readTime,
    publishedAt,
    views
  }`,

  // Increment view count
  incrementViews: `*[_type == "article" && _id == $id][0]`

}

export const newsQueries = {
  getAll: `*[_type == "newsItem"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    content,
    excerpt,
    category->{
      title,
      slug
    },
    image{
      asset->{url},
      alt
    },
  
  
    featured,
 
    publishedAt
  }`,
  getBySlug:` *[_type == "newsItem" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    content,
  image {
      asset->{url},
      alt
    },
    
    category->{
      title,
      slug
    },
    
    featured,
 
    publishedAt,
 
  }
`
,
  getFeatured: `*[_type == "newsItem" && featured == true] | order(publishedAt desc) [0...2] {
    _id,
    title,
    slug,
    excerpt,
   category->{title, slug},
    image{asset->{url}, alt},
    source,
 
    publishedAt
  }`
}
