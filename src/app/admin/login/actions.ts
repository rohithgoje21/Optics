"use server"

import { redirect } from "next/navigation"
import { verifyAdminCredentials } from "@/lib/auth"
import { getAdminSession } from "@/lib/session"

export interface LoginState {
  status: "idle" | "error"
  message?: string
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "")
  const password = String(formData.get("password") ?? "")

  const valid = await verifyAdminCredentials(username, password)
  if (!valid) {
    return { status: "error", message: "Invalid username or password." }
  }

  const session = await getAdminSession()
  session.isAdmin = true
  session.username = username
  await session.save()

  redirect("/admin/appointments")
}
