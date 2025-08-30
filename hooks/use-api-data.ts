'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseApiDataParams {
  url: string
  params?: Record<string, string | number | boolean | undefined>
  dependencies?: any[]
}

interface UseApiDataReturn<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useApiData<T = any>({
  url,
  params = {},
  dependencies = []
}: UseApiDataParams): UseApiDataReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const searchParams = new URLSearchParams()
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString())
        }
      })

      const queryString = searchParams.toString()
      const fetchUrl = queryString ? `${url}?${queryString}` : url

      const response = await fetch(fetchUrl)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success === false) {
        throw new Error(result.message || result.error || 'API request failed')
      }

      setData(result.success ? result.data : result)
    } catch (err) {
      console.error(`Error fetching data from ${url}:`, err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [url, JSON.stringify(params), ...dependencies])

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