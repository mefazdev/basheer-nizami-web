// import { createServiceClient } from '@/lib/supabase/server'

import { createClient } from "./supabase/client"

export interface UploadResult {
  success: boolean
  data?: {
    path: string
    fullPath: string
    publicUrl: string
  }
  error?: string
}

export async function uploadFile(
  file: File,
  bucket: string,
  folder: string = '',
  fileName?: string
): Promise<UploadResult> {
  try {
    const supabase = createClient()
    
    // Generate unique filename if not provided
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const finalFileName = fileName || `${timestamp}-${randomString}.${extension}`
    
    // Construct full path
    const fullPath = folder ? `${folder}/${finalFileName}` : finalFileName
    
    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      throw error
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fullPath)
    
    return {
      success: true,
      data: {
        path: fullPath,
        fullPath: data.path,
        publicUrl: publicUrlData.publicUrl,
      }
    }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    }
  }
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])
    
    if (error) {
      throw error
    }
    
    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}

export function getFileUrl(bucket: string, path: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

export function validateFileSize(file: File, maxSizeInBytes: number): boolean {
  return file.size <= maxSizeInBytes
}

export const FILE_CONSTRAINTS = {
  photos: {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  },
  publications: {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
  }
} as const