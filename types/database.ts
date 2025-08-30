export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      news_tickers: {
        Row: {
          id: string
          text: string
          published: boolean
          sort_order: number
          starts_at: string | null
          ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          text: string
          published?: boolean
          sort_order?: number
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          text?: string
          published?: boolean
          sort_order?: number
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          youtube_id: string
          title: string
          category_id: string
          location: string | null
          recorded_at: string | null
          duration_seconds: number | null
          tags: string[]
          description: string | null
          thumbnail_url: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          youtube_id: string
          title: string
          category_id: string
          location?: string | null
          recorded_at?: string | null
          duration_seconds?: number | null
          tags?: string[]
          description?: string | null
          thumbnail_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          youtube_id?: string
          title?: string
          category_id?: string
          location?: string | null
          recorded_at?: string | null
          duration_seconds?: number | null
          tags?: string[]
          description?: string | null
          thumbnail_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      video_categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      photos: {
        Row: {
          id: string
          file_path: string
          title: string
          location: string | null
          category_id: string
          tags: string[]
          description: string | null
          exif: Json | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          file_path: string
          title: string
          location?: string | null
          category_id: string
          tags?: string[]
          description?: string | null
          exif?: Json | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          file_path?: string
          title?: string
          location?: string | null
          category_id?: string
          tags?: string[]
          description?: string | null
          exif?: Json | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      photo_categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      publications: {
        Row: {
          id: string
          name: string
          cover_path: string | null
          description: string | null
          category_id: string
          total_pages: number | null
          publisher: string | null
          tags: string[]
          published_year: number | null
          buy_url: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          cover_path?: string | null
          description?: string | null
          category_id: string
          total_pages?: number | null
          publisher?: string | null
          tags?: string[]
          published_year?: number | null
          buy_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          cover_path?: string | null
          description?: string | null
          category_id?: string
          total_pages?: number | null
          publisher?: string | null
          tags?: string[]
          published_year?: number | null
          buy_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      publication_categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          entity: string
          entity_id: string
          action: string
          by_user: string
          before: Json | null
          after: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          entity: string
          entity_id: string
          action: string
          by_user: string
          before?: Json | null
          after?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          entity?: string
          entity_id?: string
          action?: string
          by_user?: string
          before?: Json | null
          after?: Json | null
          created_at?: string
        }
      }
      page_visits: {
        Row: {
          id: string
          path: string
          user_agent: string | null
          ip_hash: string
          referrer: string | null
          occurred_at: string
        }
        Insert: {
          id?: string
          path: string
          user_agent?: string | null
          ip_hash: string
          referrer?: string | null
          occurred_at?: string
        }
        Update: {
          id?: string
          path?: string
          user_agent?: string | null
          ip_hash?: string
          referrer?: string | null
          occurred_at?: string
        }
      }
      content_reads: {
        Row: {
          id: string
          content_type: 'article' | 'update'
          content_slug: string
          ip_hash: string
          occurred_at: string
        }
        Insert: {
          id?: string
          content_type: 'article' | 'update'
          content_slug: string
          ip_hash: string
          occurred_at?: string
        }
        Update: {
          id?: string
          content_type?: 'article' | 'update'
          content_slug?: string
          ip_hash?: string
          occurred_at?: string
        }
      }
    }
  }
}
