import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from './client'
// import type { ImageSource } from '@sanity/image-url'
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source:SanityImageSource) => {
  return builder.image(source)
}

export const getImageUrl = (source: SanityImageSource) => {
  return urlFor(source).url()
}