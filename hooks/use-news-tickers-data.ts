 'use client'

import { useState, useEffect, useCallback } from 'react'
import type { NewsTicker, PaginatedResponse } from '@/lib/types'

interface UseNewsTickersDataParams {
  page: number
  search?: string
  status?: string
  limit?: number
}

interface UseNewsTickersDataReturn {
  data: PaginatedResponse<NewsTicker> | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useNewsTickersData({
  page,
  search = '',
  status,
  limit = 20
}: UseNewsTickersDataParams): UseNewsTickersDataReturn {
  const [data, setData] = useState<PaginatedResponse<NewsTicker> | null>(null)
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

      if (status && status !== 'all') {
        switch (status) {
          case 'active':
            params.append('published', 'true')
            break
          case 'draft':
            params.append('published', 'false')
            break
          case 'scheduled':
          case 'expired':
            params.append('published', 'true')
            break
        }
      }

      const response = await fetch(`/api/news-tickers?${params.toString()}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch news tickers: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.message || result.error || 'Failed to fetch news tickers')
      }

      setData(result.data as PaginatedResponse<NewsTicker>)
    } catch (err) {
      console.error('Error fetching news tickers:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while fetching news tickers')
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [page, search, status, limit])

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
