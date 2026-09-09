"use server"

import { prisma } from "@/lib/prisma"
import { appointmentSchema } from "@/lib/validation/appointment"
import { sendAppointmentAlert } from "@/lib/email"
import { revalidatePath } from "next/cache"

export interface BookingState {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Record<string, string>
}

export async function createAppointment(
  _prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  const raw = {
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    preferredDate: formData.get("preferredDate"),
    slotTime: formData.get("slotTime"),
    reason: formData.get("reason"),
  }

  const parsed = appointmentSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === "string") fieldErrors[key] = issue.message
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors }
  }

  const { customerName, phone, preferredDate, slotTime, reason } = parsed.data

  const existing = await prisma.appointment.findFirst({
    where: { preferredDate, slotTime, status: { not: "CANCELLED" } },
  })
  if (existing) {
    return {
      status: "error",
      message: "That slot was just booked by someone else. Please pick another time.",
    }
  }

  await prisma.appointment.create({
    data: {
      customerName,
      phone,
      preferredDate,
      slotTime,
      reason: reason || null,
    },
  })

  await sendAppointmentAlert({ customerName, phone, preferredDate, slotTime, reason })

  revalidatePath("/admin/appointments")

  return {
    status: "success",
    message: `Thanks ${customerName}! Your appointment request for ${preferredDate} at ${slotTime} has been received. We'll see you then.`,
  }
}
