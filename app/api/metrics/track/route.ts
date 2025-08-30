import { NextRequest } from 'next/server'

import { z } from 'zod'
import { handleError, successResponse } from '@/lib/api-helpers'
import { hashIP } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'

const TrackingSchema = z.object({
  type: z.enum(['pageview', 'content_read']),
  path: z.string().max(300).optional(),
  content_type: z.enum(['article', 'update']).optional(),
  content_slug: z.string().max(200).optional(),
  timestamp: z.string().datetime().optional(),
}).refine(
  (data) => {
    if (data.type === 'pageview') {
      return !!data.path
    }
    if (data.type === 'content_read') {
      return !!(data.content_type && data.content_slug)
    }
    return false
  },
  {
    message: 'Invalid tracking data for specified type',
  }
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = TrackingSchema.parse(body)
    
    const supabase = await createClient()
    
    // Get client IP (considering proxy headers)
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = forwarded?.split(',')[0] || realIp || '127.0.0.1'
    
    // Hash the IP for privacy
    const secret = process.env.ENCRYPTION_SECRET || 'default-secret'
    const hashedIp = hashIP(clientIp, secret)
    
    const userAgent = request.headers.get('user-agent') || ''
    const referrer = request.headers.get('referer') || null
    
    if (validatedData.type === 'pageview') {
      const { error } = await supabase
        .from('page_visits')
        .insert({
          path: validatedData.path!,
          user_agent: userAgent,
          ip_hash: hashedIp,
          referrer,
          occurred_at: validatedData.timestamp || new Date().toISOString(),
        })
      
      if (error) throw error
    }
    
    if (validatedData.type === 'content_read') {
      const { error } = await supabase
        .from('content_reads')
        .insert({
          content_type: validatedData.content_type!,
          content_slug: validatedData.content_slug!,
          ip_hash: hashedIp,
          occurred_at: validatedData.timestamp || new Date().toISOString(),
        })
      
      if (error) throw error
    }
    
    return successResponse({ ok: true }, 'Event tracked successfully')
  } catch (error) {
    return handleError(error)
  }
}