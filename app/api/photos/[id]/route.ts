

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PhotoUpdateSchema } from '@/lib/validation/photo'
import { createAuditLog } from '@/lib/audit'
import { handleError, withAuth, successResponse, notFoundResponse } from '@/lib/api-helpers'
import type { PhotoWithCategory } from '@/lib/types'

// interface Params {
//   params: { id: string }
// }

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  // return withAuth(request, async () => {
    try {
      const supabase = await createClient()
               const {  id } = await  params
      const { data, error } = await supabase
        .from('photos')
        .select(`
          *,
          photo_categories (
            id,
            name,
            slug
          )
        `)
        .eq('id', id)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          return notFoundResponse('Photo not found')
        }
        throw error
      }
      
      return successResponse(data as PhotoWithCategory)
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
      const supabase = await createClient()
      const {  id } = await  params
      // Get current data for audit log
      const { data: currentData } = await supabase
        .from('photos')
        .select('*')
        .eq('id',  id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('Photo not found')
      }
      
      const body = await request.json()
      const validatedData = PhotoUpdateSchema.parse(body)
      
      const { data, error } = await supabase
        .from('photos')
        .update(validatedData)
        .eq('id', id)
        .select(`
          *,
          photo_categories (
            id,
            name,
            slug
          )
        `)
        .single()
      
      if (error) throw error
      
      // Create audit log
      await createAuditLog({
        entity: 'photos',
        entity_id: id,
        action: 'UPDATE',
        by_user: userId,
        before: currentData,
        after: data,
      })
      
      return successResponse(data, 'Photo updated successfully')
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
      const supabase =  await createClient()
      const {  id } = await  params
      // Get current data for audit log
      const { data: currentData } = await supabase
        .from('photos')
        .select('*')
        .eq('id',  id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('Photo not found')
      }
      
      const { error } = await supabase
        .from('photos')
        .delete()
        .eq('id',  id)
      
      if (error) throw error
      
      // Create audit log
      await createAuditLog({
        entity: 'photos',
        entity_id:  id,
        action: 'DELETE',
        by_user: userId,
        before: currentData,
      })
      
      return successResponse(null, 'Photo deleted successfully')
    } catch (error) {
      return handleError(error)
    }
  })
}