import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/client'
import { CategorySchema } from '@/lib/validation/category'
import { createAuditLog } from '@/lib/audit'
import { handleError, withAuth, successResponse } from '@/lib/api-helpers'
import { generateSlug } from '@/lib/utils'
import type { VideoCategory } from '@/lib/types'

export async function GET(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('video_categories')
        .select('*')
        .order('name', { ascending: true })
      
      if (error) throw error
      
      return successResponse(data as VideoCategory[])
    } catch (error) {
      return handleError(error)
    }
  })
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (userId) => {
    try {
      const body = await request.json()
      
      // Auto-generate slug if not provided
      if (!body.slug && body.name) {
        body.slug = generateSlug(body.name)
      }
      
      const validatedData = CategorySchema.parse(body)
      
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('video_categories')
        .insert(validatedData)
        .select()
        .single()
      
      if (error) {
        if (error.code === '23505') {
          return handleError(new Error('Category with this slug already exists'))
        }
        console.log(error)
        throw error
      }
      
      // Create audit log
      await createAuditLog({
        entity: 'video_categories',
        entity_id: data.id,
        action: 'CREATE',
        by_user: userId,
        after: data,
      })
      
      return successResponse(data, 'Video category created successfully')
    } catch (error) {
      return handleError(error)
    }
  })
}