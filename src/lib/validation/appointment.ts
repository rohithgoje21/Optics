import { z } from "zod"

export const appointmentSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{10,15}$/, "Enter a valid phone number"),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
  slotTime: z.string().min(1, "Pick a time slot"),
  reason: z.string().trim().max(500).optional().or(z.literal("")),
})

export type AppointmentInput = z.infer<typeof appointmentSchema>
