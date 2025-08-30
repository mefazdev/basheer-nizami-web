// import { z } from 'zod'

// export const VideoSchema = z.object({
//   youtube_id: z
//     .string()
//     .min(1, 'YouTube ID is required')
//     .regex(/^[A-Za-z0-9_-]{11}$/, 'Invalid YouTube ID format'),
//   title: z
//     .string()
//     .min(1, 'Title is required')
//     .max(200, 'Title must be 200 characters or less'),
//   category_id: z
//     .string()
//     .uuid('Invalid category ID'),
//   location: z
//     .string()
//     .max(120, 'Location must be 120 characters or less')
//     .optional()
//     .or(z.literal(''))
//     .transform(val => val === '' ? undefined : val),
//   recorded_at: z
//     .string()
//     .datetime()
//     .optional()
//     .or(z.literal(''))
//     .transform(val => val === '' ? undefined : val),
//   duration_seconds: z
//     .number()
//     .int()
//     .positive('Duration must be positive')
//     .optional()
//     .or(z.literal(''))
//     .transform(val => val === '' ? undefined : val),
//   tags: z
//     .array(z.string().trim())
//     .default([])
//     .transform(tags => tags.filter(tag => tag.length > 0)),
//   description: z
//     .string()
//     .optional()
//     .or(z.literal(''))
//     .transform(val => val === '' ? undefined : val),
//   thumbnail_url: z
//     .string()
//     .url('Invalid thumbnail URL')
//     .optional()
//     .or(z.literal(''))
//     .transform(val => val === '' ? undefined : val),
//   published: z.boolean().default(true),
// })

// export const VideoUpdateSchema = VideoSchema.partial()

// export type VideoInput = z.infer<typeof VideoSchema>
// export type VideoUpdateInput = z.infer<typeof VideoUpdateSchema>



import { z } from 'zod'

export const VideoSchema = z.object({
  youtube_id: z
    .string()
    .min(1, 'YouTube ID is required')
    .regex(/^[A-Za-z0-9_-]{11}$/, 'Invalid YouTube ID format'),

  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or less'),

  category_id: z
    .string()
    .uuid('Invalid category ID'),

  location: z
    .union([z.string().max(120), z.literal('')])
    .transform(val => (val === '' ? undefined : val))
    .default(undefined),

  recorded_at: z
    .union([z.string().datetime(), z.literal('')])
    .transform(val => (val === '' ? undefined : val))
    .default(undefined),

  duration_seconds: z
    .union([z.number().int().positive(), z.literal('')])
    .transform(val => (val === '' ? undefined : val))
    .default(undefined),

  tags: z
    .array(z.string().trim())
    .transform(tags => tags.filter(tag => tag.length > 0))
    .default([]),

  description: z
    .union([z.string(), z.literal('')])
    .transform(val => (val === '' ? undefined : val))
    .default(undefined),

  thumbnail_url: z
    .union([z.string().url('Invalid thumbnail URL'), z.literal('')])
    .transform(val => (val === '' ? undefined : val))
    .default(undefined),

  published: z.boolean().default(true),
})

export const VideoUpdateSchema = VideoSchema.partial()

export type VideoInput = z.infer<typeof VideoSchema>
export type VideoUpdateInput = z.infer<typeof VideoUpdateSchema>
