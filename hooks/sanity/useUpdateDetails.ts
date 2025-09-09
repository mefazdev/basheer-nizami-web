// hooks/sanity/useUpdateDetail.ts
import { useState, useEffect } from "react"
import {  sanityClient } from "@/lib/sanity/client"
import { getNewsesBySlug } from "@/lib/sanity/api"
import { UpdateItem } from "@/lib/types/updates"

export function useUpdateDetail(slug: string) {
  const [update, setUpdate] = useState<UpdateItem | null >(null)
  const [relatedUpdates, setRelatedUpdates] = useState<UpdateItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      console.log('No slug provided to useUpdateDetail')
      setLoading(false)
      return
    }

    async function fetchUpdate() {
      try {
        setLoading(true)
        setError(null)

        console.log('Fetching update with slug:', slug)

        // Use your existing getUpdateBySlug function from client.ts
        const updateData = await getNewsesBySlug(slug)
        
        // console.log('Update from API:', updateData)

        if (!updateData) {
          console.log('No update found with slug:', slug)
          setError(new Error(`Update with slug "${slug}" not found`))
          return
        }

        setUpdate(updateData)

        // Get related updates (recent updates)
        try {
          const relatedQuery = `*[_type == "update" && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
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
          setRelatedUpdates(relatedData || [])
        } catch (relatedError) {
          console.warn('Failed to fetch related updates:', relatedError)
        }

      } catch (err) {
        console.error("Error fetching update:", err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchUpdate()
  }, [slug])

  return { update, relatedUpdates, loading, error }
}