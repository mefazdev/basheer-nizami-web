import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PublicationSchema } from '@/lib/validation/publication'
import { createAuditLog } from '@/lib/audit'
import { handleError, withAuth, successResponse } from '@/lib/api-helpers'
import type { PublicationWithCategory } from '@/lib/types'

export async function GET(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const { searchParams } = new URL(request.url)
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '20')
      const search = searchParams.get('search') || ''
      const category_id = searchParams.get('category_id')
      const published = searchParams.get('published')
      const year = searchParams.get('year')
      
      const supabase = await createClient()
      
      let query = supabase
        .from('publications')
        .select(`
          *,
          publication_categories (
            id,
            name,
            slug
          )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
      
      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,publisher.ilike.%${search}%`)
      }
      
      if (category_id) {
        query = query.eq('category_id', category_id)
      }
      
      if (published !== null) {
        query = query.eq('published', published === 'true')
      }
      
      if (year) {
        query = query.eq('published_year', parseInt(year))
      }
      
      const { data, error, count } = await query
        .range((page - 1) * limit, page * limit - 1)
      
      if (error) throw error
      
      return successResponse({
        data: data as PublicationWithCategory[],
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit),
        },
      })
    } catch (error) {
      return handleError(error)
    }
  })
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (userId) => {
    try {
      const body = await request.json()
      const validatedData = PublicationSchema.parse(body)
      
      const supabase =  await createClient()
      
      const { data, error } = await supabase
        .from('publications')
        .insert(validatedData)
        .select(`
          *,
          publication_categories (
            id,
            name,
            slug
          )
        `)
        .single()
      
      if (error) throw error
      
      // Create audit log
      await createAuditLog({
        entity: 'publications',
        entity_id: data.id,
        action: 'CREATE',
        by_user: userId,
        after: data,
      })
      
      return successResponse(data, 'Publication created successfully')
    } catch (error) {
      return handleError(error)
    }
  })
}