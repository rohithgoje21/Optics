"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth"
import { faqSchema } from "@/lib/validation/faq"

export interface FaqFormState {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
}

function parseFaqForm(formData: FormData) {
  return faqSchema.safeParse({
    questionEn: formData.get("questionEn"),
    questionTe: formData.get("questionTe"),
    answerEn: formData.get("answerEn"),
    answerTe: formData.get("answerTe"),
    sortOrder: formData.get("sortOrder"),
  })
}

function fieldErrorsFrom(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === "string") fieldErrors[key] = issue.message
  }
  return fieldErrors
}

export async function createFaqAction(
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  await requireAdminSession()

  const parsed = parseFaqForm(formData)
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    }
  }

  await prisma.faqEntry.create({ data: parsed.data })
  revalidatePath("/admin/faq")
  revalidatePath("/faq")
  redirect("/admin/faq")
}

export async function updateFaqAction(
  id: string,
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  await requireAdminSession()

  const parsed = parseFaqForm(formData)
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    }
  }

  await prisma.faqEntry.update({ where: { id }, data: parsed.data })
  revalidatePath("/admin/faq")
  revalidatePath("/faq")
  redirect("/admin/faq")
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdminSession()
  const id = String(formData.get("id") ?? "")
  if (!id) return
  await prisma.faqEntry.delete({ where: { id } })
  revalidatePath("/admin/faq")
  revalidatePath("/faq")
}
