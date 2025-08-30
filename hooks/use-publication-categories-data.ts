'use client'

import { useApiData } from './use-api-data'
import type { PublicationCategory } from '@/lib/types'

export function usePublicationCategoriesData() {
  return useApiData<PublicationCategory[]>({
    url: '/api/categories/publication',
    dependencies: [],
  })
}