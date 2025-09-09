'use client'

import { useState, useEffect, useCallback } from 'react'
import type { VideoWithCategory, PaginatedResponse } from '@/lib/types'

interface UseVideosDataParams {
  page: number
  search?: string
  category_id?: string | undefined
  published?: boolean
  limit?: number
}

interface UseVideosDataReturn {
  data: PaginatedResponse<VideoWithCategory> | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useVideosData({
  page,
  search = '',
  category_id,
  published,
  limit = 20
}: UseVideosDataParams): UseVideosDataReturn {
  const [data, setData] = useState<PaginatedResponse<VideoWithCategory> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })

      if (search) params.append('search', search)
      if (category_id) params.append('category_id', category_id)
      if (published !== undefined) params.append('published', published.toString())

      const response = await fetch(`/api/videos?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || result.error || 'Failed to fetch videos')
      }

      setData(result.data)
    } catch (err) {
      console.error('Error fetching videos:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while fetching videos')
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [page, search, category_id, published, limit])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    isLoading,
    error,
    refetch,
  }
}