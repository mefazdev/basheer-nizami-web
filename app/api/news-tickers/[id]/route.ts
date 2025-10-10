import { NextRequest } from 'next/server'
 
import { NewsTickerUpdateSchema } from '@/lib/validation/news-ticker'
import { createAuditLog } from '@/lib/audit'
import { handleError, withAuth, successResponse, notFoundResponse } from '@/lib/api-helpers'
import type { NewsTicker } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'

// interface Params {
//   params: { id: string }
// }

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // return withAuth(request, async () => {
    try {
      const supabase =  await createClient()
       const {  id } = await  params
      const { data, error } = await supabase
        .from('news_tickers')
        .select('*')
        .eq('id',  id)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          return notFoundResponse('News ticker not found')
        }
        throw error
      }
      
      return successResponse(data as NewsTicker)
    } catch (error) {
      return handleError(error)
    }
  // })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, async (userId) => {
    try {
      const supabase = await createClient()
       const {  id } = await  params
      // Get current data for audit log
      const { data: currentData } = await supabase
        .from('news_tickers')
        .select('*')
        .eq('id',  id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('News ticker not found')
      }
      
      const body = await request.json()
      const validatedData = NewsTickerUpdateSchema.parse(body)
      
      const { data, error } = await supabase
        .from('news_tickers')
        .update(validatedData)
        .eq('id',  id)
        .select()
        .single()
      
      if (error) throw error
      
      // Create audit log
      await createAuditLog({
        entity: 'news_tickers',
        entity_id:  id,
        action: 'UPDATE',
        by_user: userId,
        before: currentData,
        after: data,
      })
      
      return successResponse(data, 'News ticker updated successfully')
    } catch (error) {
      return handleError(error)
    }
  })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, async (userId) => {
    try {
      const supabase = await createClient()
      const {  id } = await  params
      // Get current data for audit log
      const { data: currentData } = await supabase
        .from('news_tickers')
        .select('*')
        .eq('id', id)
        .single()
      
      if (!currentData) {
        return notFoundResponse('News ticker not found')
      }
      
      const { error } = await supabase
        .from('news_tickers')
        .delete()
        .eq('id',  id)
      
      if (error) throw error
      
      // Create audit log
      await createAuditLog({
        entity: 'news_tickers',
        entity_id:  id,
        action: 'DELETE',
        by_user: userId,
        before: currentData,
      })
      
      return successResponse(null, 'News ticker deleted successfully')
    } catch (error) {
      return handleError(error)
    }
  })
}