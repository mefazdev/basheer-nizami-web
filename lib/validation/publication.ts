import { z } from 'zod'

export const PublicationSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(200, 'Name must be 200 characters or less'),
  cover_path: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  description: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  category_id: z
    .string()
    .uuid('Invalid category ID'),
  total_pages: z
    .number()
    .int()
    .positive('Total pages must be positive')
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  publisher: z
    .string()
    .max(160, 'Publisher must be 160 characters or less')
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  tags: z
    .array(z.string().trim())
    .default([])
    .transform(tags => tags.filter(tag => tag.length > 0)),
  published_year: z
    .number()
    .int()
    .min(1000, 'Year must be valid')
    .max(new Date().getFullYear() + 5, 'Year cannot be too far in the future')
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  buy_url: z
    .string()
    .url('Invalid URL')
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  published: z.boolean().default(true),
  featured:z.boolean().default(false),
})

export const PublicationUpdateSchema = PublicationSchema.partial()

export type PublicationInput = z.infer<typeof PublicationSchema>
export type PublicationUpdateInput = z.infer<typeof PublicationUpdateSchema>