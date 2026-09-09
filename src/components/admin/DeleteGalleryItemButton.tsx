"use client"

import { deleteGalleryItemAction } from "@/app/admin/(dashboard)/gallery/actions"

export function DeleteGalleryItemButton({ id }: { id: string }) {
  return (
    <form
      action={deleteGalleryItemAction}
      onSubmit={(e) => {
        if (!confirm("Delete this photo?")) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm font-medium text-red-600 hover:underline">
        Delete
      </button>
    </form>
  )
}
