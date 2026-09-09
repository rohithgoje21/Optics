"use server"

import { requireAdminSession, verifyAdminCredentials, setAdminPassword } from "@/lib/auth"
import { changePasswordSchema } from "@/lib/validation/password"

export interface ChangePasswordState {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Record<string, string>
}

export async function changePasswordAction(
  _prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  await requireAdminSession()

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === "string") fieldErrors[key] = issue.message
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors }
  }

  const { currentPassword, newPassword } = parsed.data

  const username = process.env.ADMIN_USERNAME ?? ""
  const currentValid = await verifyAdminCredentials(username, currentPassword)
  if (!currentValid) {
    return {
      status: "error",
      message: "Current password is incorrect.",
      fieldErrors: { currentPassword: "Current password is incorrect." },
    }
  }

  await setAdminPassword(newPassword)

  return { status: "success", message: "Password updated successfully." }
}
