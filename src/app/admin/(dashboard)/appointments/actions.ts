"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth"
import type { AppointmentStatus } from "@prisma/client"

const VALID_STATUSES: AppointmentStatus[] = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]

export async function updateAppointmentStatusAction(formData: FormData) {
  await requireAdminSession()

  const id = String(formData.get("id") ?? "")
  const status = String(formData.get("status") ?? "") as AppointmentStatus

  if (!id || !VALID_STATUSES.includes(status)) return

  await prisma.appointment.update({ where: { id }, data: { status } })
  revalidatePath("/admin/appointments")
}
