import { Database } from '@/types/database'

// Database table types
export type NewsTicker = Database['public']['Tables']['news_tickers']['Row']
export type NewsTickerInsert = Database['public']['Tables']['news_tickers']['Insert']
export type NewsTickerUpdate = Database['public']['Tables']['news_tickers']['Update']

export type Video = Database['public']['Tables']['videos']['Row']
export type VideoInsert = Database['public']['Tables']['videos']['Insert']
export type VideoUpdate = Database['public']['Tables']['videos']['Update']

export type VideoCategory = Database['public']['Tables']['video_categories']['Row']
export type VideoCategoryInsert = Database['public']['Tables']['video_categories']['Insert']
export type VideoCategoryUpdate = Database['public']['Tables']['video_categories']['Update']

export type Photo = Database['public']['Tables']['photos']['Row']
export type PhotoInsert = Database['public']['Tables']['photos']['Insert']
export type PhotoUpdate = Database['public']['Tables']['photos']['Update']

export type PhotoCategory = Database['public']['Tables']['photo_categories']['Row']
export type PhotoCategoryInsert = Database['public']['Tables']['photo_categories']['Insert']
export type PhotoCategoryUpdate = Database['public']['Tables']['photo_categories']['Update']

export type Publication = Database['public']['Tables']['publications']['Row']
export type PublicationInsert = Database['public']['Tables']['publications']['Insert']
export type PublicationUpdate = Database['public']['Tables']['publications']['Update']

export type PublicationCategory = Database['public']['Tables']['publication_categories']['Row']
export type PublicationCategoryInsert = Database['public']['Tables']['publication_categories']['Insert']
export type PublicationCategoryUpdate = Database['public']['Tables']['publication_categories']['Update']

export type AuditLog = Database['public']['Tables']['audit_logs']['Row']
export type AuditLogInsert = Database['public']['Tables']['audit_logs']['Insert']

// Enhanced types with relationships
export type VideoWithCategory = Video & {
  video_categories: VideoCategory
}

export type PhotoWithCategory = Photo & {
  photo_categories: PhotoCategory
}

export type PublicationWithCategory = Publication & {
  publication_categories: PublicationCategory
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Query parameters
export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}

export interface FilterParams {
  published?: boolean
  category_id?: string
  tags?: string[]
}