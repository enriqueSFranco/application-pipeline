import {z} from "zod"

export const NoteSchema = z.object({
  id: z.uuidv4(),
  applicationId: z.uuidv4(),
  text: z.string().min(1).transform(value => value.trim()),
  createdAt: z.preprocess(value => {
    if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
      return new Date(value)
    }
    return value
  }, z.date()),
})

export type Note = z.infer<typeof NoteSchema>
