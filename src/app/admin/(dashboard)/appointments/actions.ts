"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth"

export async function deleteAppointmentAction(formData: FormData) {
  await requireAdminSession()

  const id = String(formData.get("id") ?? "")
  if (!id) return

  await prisma.appointment.delete({ where: { id } }).catch(() => {
    // already deleted (e.g. by the 7-day auto-cleanup) — nothing to do
  })
  revalidatePath("/admin/appointments")
}
