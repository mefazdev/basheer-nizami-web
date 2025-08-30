'use client'

import { useApiData } from './use-api-data'
import type { PhotoWithCategory, PaginatedResponse } from '@/lib/types'

interface UsePhotosDataParams {
  page: number
  search?: string
  category_id?: string
  limit?: number
}

export function usePhotosData({
  page,
  search = '',
  category_id,
  limit = 20
}: UsePhotosDataParams) {
  return useApiData<PaginatedResponse<PhotoWithCategory>>({
    url: '/api/photos',
    params: {
      page,
      limit,
      search: search || undefined,
      category_id: category_id || undefined,
    },
    dependencies: [page, search, category_id, limit],
  })
}