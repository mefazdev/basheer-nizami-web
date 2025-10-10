import { NextRequest } from 'next/server'
 
import { VideoUpdateSchema } from '@/lib/validation/video'
import { createAuditLog } from '@/lib/audit'
import { handleError, withAuth, successResponse, notFoundResponse } from '@/lib/api-helpers'
import type { VideoWithCategory } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'

interface Params {
  params: { id: string }
}

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  // return withAuth(request, async () => {
    try {
      const supabase = await createClient()
       const {  id } = await  params
      const { data, error } = await supabase
        .from('videos')
        .select(`
          *,
          video_categories (
            id,
            name,
            slug
          )
        `)
        .eq('id', id)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          return notFoundResponse('Video not found')
        }
        throw error
      }
      
      return successResponse(data as VideoWithCategory)
    } catch (error) {
      return handleError(error)
    }
  // })
}

export async function PATCH(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(request, async (userId) => {
    try {
      const supabase =  await createClient()
       const {  id } = await  params
      // Get current data for audit log
      const { data: currentData } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('Video not found')
      }
      
      const body = await request.json()
      const validatedData = VideoUpdateSchema.parse(body)
      
      const { data, error } = await supabase
        .from('videos')
        .update(validatedData)
        .eq('id',  id)
        .select(`
          *,
          video_categories (
            id,
            name,
            slug
          )
        `)
        .single()
      
      if (error) throw error
      
      // Create audit log
      await createAuditLog({
        entity: 'videos',
        entity_id: id,
        action: 'UPDATE',
        by_user: userId,
        before: currentData,
        after: data,
      })
      
      return successResponse(data, 'Video updated successfully')
    } catch (error) {
      return handleError(error)
    }
  })
}

export async function DELETE(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(request, async (userId) => {
    try {
      const supabase = await createClient()
       const {  id } = await  params
      // Get current data for audit log
      const { data: currentData } = await supabase
        .from('videos')
        .select('*')
        .eq('id',  id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('Video not found')
      }
      
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id',  id)
      
      if (error) throw error
      
      // Create audit log
      await createAuditLog({
        entity: 'videos',
        entity_id:  id,
        action: 'DELETE',
        by_user: userId,
        before: currentData,
      })
      
      return successResponse(null, 'Video deleted successfully')
    } catch (error) {
      return handleError(error)
    }
  })
}