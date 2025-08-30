'use client'

import { useState, useEffect, useCallback } from 'react'
import type { PublicationCategory } from '@/lib/types'

interface UsePublicationCategoriesReturn {
  data: PublicationCategory[] | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function usePublicationCategoriesData(): UsePublicationCategoriesReturn {
  const [data, setData] = useState<PublicationCategory[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/categories/publication')

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch categories')
      }

      setData(result.data)
    } catch (err) {
      console.error('Error fetching publication categories:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

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