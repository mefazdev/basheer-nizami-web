'use server'

import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { createServiceClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { NewsTickerSchema, NewsTickerUpdateSchema } from '@/lib/validation/news-ticker'
import { createAuditLog } from '@/lib/audit'
import { createClient } from '../supabase/client'

export async function createNewsTicker(formData: FormData) {
  const user = await requireAdmin()
  
  const data = {
    text: formData.get('text') as string,
    published: formData.get('published') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
    starts_at: formData.get('starts_at') as string || undefined,
    ends_at: formData.get('ends_at') as string || undefined,
  }
  
  try {
    const validatedData = NewsTickerSchema.parse(data)
    const supabase = createClient()
    
    const { data: result, error } = await supabase
      .from('news_tickers')
      .insert(validatedData)
      .select()
      .single()
 
    if (error) throw error
       console.log(error)
    await createAuditLog({
      entity: 'news_tickers',
      entity_id: result.id,
      action: 'CREATE',
      by_user: user.id,
      after: result,
    })
    
    revalidatePath('/admin/news-tickers')
    return { success: true, data: result }
  } catch (error) {
    console.error('Error creating news ticker:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function updateNewsTicker(id: string, formData: FormData) {
  const user = await requireAdmin()
  
  const data = {
    text: formData.get('text') as string,
    published: formData.get('published') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
    starts_at: formData.get('starts_at') as string || undefined,
    ends_at: formData.get('ends_at') as string || undefined,
  }
  
  try {
    const validatedData = NewsTickerUpdateSchema.parse(data)
    const supabase = createClient()
    
    // Get current data for audit log
    const { data: currentData } = await supabase
      .from('news_tickers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (!currentData) {
      throw new Error('News ticker not found')
    }
    
    const { data: result, error } = await supabase
      .from('news_tickers')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    await createAuditLog({
      entity: 'news_tickers',
      entity_id: id,
      action: 'UPDATE',
      by_user: user.id,
      before: currentData,
      after: result,
    })
    
    revalidatePath('/admin/news-tickers')
    return { success: true, data: result }
  } catch (error) {
    console.error('Error updating news ticker:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function deleteNewsTicker(id: string) {
  const user = await requireAdmin()
  
  try {
    const supabase = createClient()
    
    // Get current data for audit log
    const { data: currentData } = await supabase
      .from('news_tickers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (!currentData) {
      throw new Error('News ticker not found')
    }
    
    const { error } = await supabase
      .from('news_tickers')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    await createAuditLog({
      entity: 'news_tickers',
      entity_id: id,
      action: 'DELETE',
      by_user: user.id,
      before: currentData,
    })
    
    revalidatePath('/admin/news-tickers')
    return { success: true }
  } catch (error) {
    console.error('Error deleting news ticker:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}