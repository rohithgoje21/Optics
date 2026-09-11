import { z } from "zod"

export const faqSchema = z.object({
  questionEn: z.string().trim().min(2, "Enter the question in English").max(300),
  questionTe: z.string().trim().min(2, "Enter the question in Telugu").max(300),
  answerEn: z.string().trim().min(2, "Enter the answer in English").max(1000),
  answerTe: z.string().trim().min(2, "Enter the answer in Telugu").max(1000),
  sortOrder: z.coerce.number().int().default(0),
})

export type FaqInput = z.infer<typeof faqSchema>
