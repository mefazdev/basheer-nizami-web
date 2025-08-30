import { z } from 'zod'

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(80, 'Name must be 80 characters or less'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(80, 'Slug must be 80 characters or less')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be lowercase letters, numbers, and hyphens only'
    ),
})

export const CategoryUpdateSchema = CategorySchema.partial()

export type CategoryInput = z.infer<typeof CategorySchema>
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateSchema>