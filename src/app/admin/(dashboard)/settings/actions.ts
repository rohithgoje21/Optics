"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth"
import { siteSettingsSchema } from "@/lib/validation/settings"

export interface SettingsFormState {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Record<string, string>
}

export async function updateSiteSettingsAction(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireAdminSession()

  const raw = {
    shopName: formData.get("shopName"),
    tagline: formData.get("tagline"),
    taglineTelugu: formData.get("taglineTelugu"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    mapEmbedUrl: formData.get("mapEmbedUrl"),
    hoursText: formData.get("hoursText"),
    servicesText: formData.get("servicesText"),
    aboutText: formData.get("aboutText"),
  }

  const parsed = siteSettingsSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === "string") fieldErrors[key] = issue.message
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors }
  }

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: parsed.data,
    create: { id: "main", ...parsed.data },
  })

  revalidatePath("/")
  revalidatePath("/contact")
  revalidatePath("/admin/settings")

  return { status: "success", message: "Site settings updated." }
}
