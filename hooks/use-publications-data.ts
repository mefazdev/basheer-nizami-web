'use client'

import { useApiData } from './use-api-data'
import type { PublicationWithCategory, PaginatedResponse } from '@/lib/types'

interface UsePublicationsDataParams {
  page: number
  search?: string
  category_id?: string
  year?: number
  limit?: number
}

export function usePublicationsData({
  page,
  search = '',
  category_id,
  year,
  limit = 20
}: UsePublicationsDataParams) {
  return useApiData<PaginatedResponse<PublicationWithCategory>>({
    url: '/api/publications',
    params: {
      page,
      limit,
      search: search || undefined,
      category_id: category_id || undefined,
      year: year || undefined,
    },
    dependencies: [page, search, category_id, year, limit],
  })
}