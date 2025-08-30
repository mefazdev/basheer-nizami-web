import { z } from 'zod'

export const PhotoSchema = z.object({
  file_path: z
    .string()
    .min(1, 'File path is required'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or less'),
  location: z
    .string()
    .max(120, 'Location must be 120 characters or less')
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  category_id: z
    .string()
    .uuid('Invalid category ID'),
  tags: z
    .array(z.string().trim())
    .default([])
    .transform(tags => tags.filter(tag => tag.length > 0)),
  description: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  exif: z
    .record(z.string(), z.any())
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  published: z.boolean().default(true),
})

export const PhotoUpdateSchema = PhotoSchema.partial()

export type PhotoInput = z.infer<typeof PhotoSchema>
export type PhotoUpdateInput = z.infer<typeof PhotoUpdateSchema>
export const PhotoCreateSchema = PhotoSchema.omit({ file_path: true })
export type PhotoCreateInput = z.infer<typeof PhotoCreateSchema>