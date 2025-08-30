import { z } from 'zod'

export const NewsTickerSchema = z.object({
  text: z
    .string()
    .min(1, 'Text is required')
    .max(280, 'Text must be 280 characters or less'),
  published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
  starts_at: z
    .string()
    .datetime()
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
  ends_at: z
    .string()
    .datetime()
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
}).refine(
  (data) => {
    if (data.starts_at && data.ends_at) {
      return new Date(data.starts_at) < new Date(data.ends_at)
    }
    return true
  },
  {
    message: 'Start time must be before end time',
    path: ['ends_at'],
  }
)

export const NewsTickerUpdateSchema = NewsTickerSchema.partial()

export type NewsTickerInput = z.infer<typeof NewsTickerSchema>
export type NewsTickerUpdateInput = z.infer<typeof NewsTickerUpdateSchema>