import { z } from "zod"

export const galleryCategories = [
  "EYEGLASSES",
  "SUNGLASSES",
  "KIDS_FRAMES",
  "COMPUTER_GLASSES",
  "EYE_CHECKUP",
] as const

export const galleryItemSchema = z.object({
  imageUrl: z.string().url("Upload a photo"),
  caption: z.string().trim().min(2, "Add a short caption").max(120),
  category: z.enum(galleryCategories),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.coerce.boolean().default(true),
  showInCarousel: z.coerce.boolean().default(false),
})

export type GalleryItemInput = z.infer<typeof galleryItemSchema>

export const categoryLabels: Record<(typeof galleryCategories)[number], string> = {
  EYEGLASSES: "Eyeglasses",
  SUNGLASSES: "Sunglasses",
  KIDS_FRAMES: "Kids Frames",
  COMPUTER_GLASSES: "Computer Glasses",
  EYE_CHECKUP: "Eye Checkup",
}
