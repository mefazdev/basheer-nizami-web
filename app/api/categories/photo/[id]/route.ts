import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/client'
import { CategoryUpdateSchema } from '@/lib/validation/category'
import { createAuditLog } from '@/lib/audit'
import { handleError, withAuth, successResponse, notFoundResponse } from '@/lib/api-helpers'
import { generateSlug } from '@/lib/utils'
 

// interface Params {
//   params: { id: string }
// }

export async function PATCH(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(request, async (userId) => {
    try {
      const supabase = createClient()
         const {  id } = await  params
      // Get current data for audit log
      const { data: currentData } = await supabase
        .from('photo_categories')
        .select('*')
        .eq('id', id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('Photo category not found')
      }
      
      const body = await request.json()
      
      // Auto-generate slug if name is updated but slug is not provided
      if (body.name && !body.slug) {
        body.slug = generateSlug(body.name)
      }
      
      const validatedData = CategoryUpdateSchema.parse(body)
      
      const { data, error } = await supabase
        .from('photo_categories')
        .update(validatedData)
        .eq('id',  id)
        .select()
        .single()
      
      if (error) {
        if (error.code === '23505') {
          return handleError(new Error('Category with this slug already exists'))
        }
        throw error
      }
      
      // Create audit log
      await createAuditLog({
        entity: 'photo_categories',
        entity_id:  id,
        action: 'UPDATE',
        by_user: userId,
        before: currentData,
        after: data,
      })
      
      return successResponse(data, 'Photo category updated successfully')
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
      const supabase = createClient()
      const { id } = await params
      // Check if category is in use
      const { data: photosInCategory } = await supabase
        .from('photos')
        .select('id')
        .eq('category_id', id)
        .limit(1)
      
      if (photosInCategory && photosInCategory.length > 0) {
        return handleError(new Error('Cannot delete category that contains photos'))
      }
      
      // Get current data for audit log
      const { data: currentData } = await supabase
        .from('photo_categories')
        .select('*')
        .eq('id',  id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('Photo category not found')
      }
      
      const { error } = await supabase
        .from('photo_categories')
        .delete()
        .eq('id',  id)
      
      if (error) throw error
      
      // Create audit log
      await createAuditLog({
        entity: 'photo_categories',
        entity_id:  id,
        action: 'DELETE',
        by_user: userId,
        before: currentData,
      })
      
      return successResponse(null, 'Photo category deleted successfully')
    } catch (error) {
      return handleError(error)
    }
  })
}