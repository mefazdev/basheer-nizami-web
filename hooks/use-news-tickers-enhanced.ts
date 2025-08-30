// 'use client'

// import { useMemo } from 'react'
// import { useApiData } from './use-api-data'
// import type { NewsTicker, PaginatedResponse } from '@/lib/types'

// interface UseNewsTickersEnhancedParams {
//   page: number
//   search?: string
//   status?: string
//   limit?: number
// }

// interface NewsTickerWithStatus extends NewsTicker {
//   computedStatus: 'active' | 'scheduled' | 'expired' | 'draft'
// }

// interface UseNewsTickersEnhancedReturn {
//   data: PaginatedResponse<NewsTickerWithStatus> | null
//   isLoading: boolean
//   error: string | null
//   refetch: () => void
// }

// function getTickerStatus(ticker: NewsTicker): 'active' | 'scheduled' | 'expired' | 'draft' {
//   if (!ticker.published) {
//     return 'draft'
//   }

//   const now = new Date()
//   const startsAt = ticker.starts_at ? new Date(ticker.starts_at) : null
//   const endsAt = ticker.ends_at ? new Date(ticker.ends_at) : null

//   if (startsAt && startsAt > now) {
//     return 'scheduled'
//   }

//   if (endsAt && endsAt < now) {
//     return 'expired'
//   }

//   return 'active'
// }

// export function useNewsTickersEnhanced({
//   page,
//   search = '',
//   status,
//   limit = 20
// }: UseNewsTickersEnhancedParams): UseNewsTickersEnhancedReturn {
//   const { data: rawData, isLoading, error, refetch } = useApiData<PaginatedResponse<NewsTicker>>({
//     url: '/api/news-tickers',
//     params: {
//       page,
//       limit,
//       search: search || undefined,
//       // Only pass published filter for draft status, let client handle others
//       published: status === 'draft' ? 'false' : undefined,
//     },
//     dependencies: [page, search, status, limit],
//   })

//   const data = useMemo(() => {
//     if (!rawData) return null

//     // Add computed status to each ticker
//     let tickersWithStatus = rawData?.data?.map(ticker => ({
//       ...ticker,
//       computedStatus: getTickerStatus(ticker)
//     }))

//     // Client-side filtering for status (except draft which is handled server-side)
//     if (status && status !== 'all' && status !== 'draft') {
//       tickersWithStatus = tickersWithStatus?.filter(ticker => 
//         ticker.computedStatus === status
//       )
//     }

//     return {
//       ...rawData,
//       data: tickersWithStatus,
//       pagination: {
//         ...rawData.pagination,
//         total: tickersWithStatus.length, // Update total for client-side filtered results
//       }
//     }
//   }, [rawData, status])

//   return {
//     data,
//     isLoading,
//     error,
//     refetch,
//   }
// }