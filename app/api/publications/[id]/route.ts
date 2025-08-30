import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PublicationUpdateSchema } from '@/lib/validation/publication'
import { createAuditLog } from '@/lib/audit'
import { handleError, withAuth, successResponse, notFoundResponse } from '@/lib/api-helpers'
import type { PublicationWithCategory } from '@/lib/types'

interface Params {
  params: { id: string }
}

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(request, async () => {
    try {
      const supabase = await createClient()
      const {  id } = await  params
      const { data, error } = await supabase
        .from('publications')
        .select(`
          *,
          publication_categories (
            id,
            name,
            slug
          )
        `)
        .eq('id',  id)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          return notFoundResponse('Publication not found')
        }
        throw error
      }
      
      return successResponse(data as PublicationWithCategory)
    } catch (error) {
      return handleError(error)
    }
  })
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
        .from('publications')
        .select('*')
        .eq('id', id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('Publication not found')
      }
      
      const body = await request.json()
      const validatedData = PublicationUpdateSchema.parse(body)
      
      const { data, error } = await supabase
        .from('publications')
        .update(validatedData)
        .eq('id', id)
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
        entity_id:  id,
        action: 'UPDATE',
        by_user: userId,
        before: currentData,
        after: data,
      })
      
      return successResponse(data, 'Publication updated successfully')
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
        .from('publications')
        .select('*')
        .eq('id',  id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('Publication not found')
      }
      
      const { error } = await supabase
        .from('publications')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      // Create audit log
      await createAuditLog({
        entity: 'publications',
        entity_id:  id,
        action: 'DELETE',
        by_user: userId,
        before: currentData,
      })
      
      return successResponse(null, 'Publication deleted successfully')
    } catch (error) {
      return handleError(error)
    }
  })
}