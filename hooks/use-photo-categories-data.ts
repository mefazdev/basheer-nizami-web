'use client'

import { useApiData } from './use-api-data'
import type { PhotoCategory } from '@/lib/types'

export function usePhotoCategoriesData() {
  return useApiData<PhotoCategory[]>({
    url: '/api/categories/photo',
    dependencies: [],
  })
}