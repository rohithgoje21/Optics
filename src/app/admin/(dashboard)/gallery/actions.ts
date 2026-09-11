"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth"
import { galleryItemSchema } from "@/lib/validation/gallery-item"

export interface GalleryFormState {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
}

function parseGalleryForm(formData: FormData) {
  return galleryItemSchema.safeParse({
    imageUrl: formData.get("imageUrl"),
    caption: formData.get("caption"),
    category: formData.get("category"),
    sortOrder: formData.get("sortOrder"),
    isActive: formData.get("isActive") === "on",
    showInCarousel: formData.get("showInCarousel") === "on",
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

export async function createGalleryItemAction(
  _prevState: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  await requireAdminSession()

  const parsed = parseGalleryForm(formData)
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    }
  }

  await prisma.galleryItem.create({ data: parsed.data })
  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
  revalidatePath("/")
  redirect("/admin/gallery")
}

export async function updateGalleryItemAction(
  id: string,
  _prevState: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  await requireAdminSession()

  const parsed = parseGalleryForm(formData)
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    }
  }

  await prisma.galleryItem.update({ where: { id }, data: parsed.data })
  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
  revalidatePath("/")
  redirect("/admin/gallery")
}

export async function deleteGalleryItemAction(formData: FormData) {
  await requireAdminSession()
  const id = String(formData.get("id") ?? "")
  if (!id) return
  await prisma.galleryItem.delete({ where: { id } })
  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
  revalidatePath("/")
}
