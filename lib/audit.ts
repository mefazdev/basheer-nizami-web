// import { createServiceClient } from '@/lib/supabase/server'
import { AuditLogInsert } from '@/lib/types'
import { createClient } from './supabase/client'

export async function createAuditLog({
  entity,
  entity_id,
  action,
  by_user,
  before = null,
  after = null,
}: Omit<AuditLogInsert, 'created_at'>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        entity,
        entity_id,
        action,
        by_user,
        before,
        after,
      })
    
    if (error) {
      console.error('Failed to create audit log:', error)
    }
  } catch (error) {
    console.error('Audit log error:', error)
  }
}