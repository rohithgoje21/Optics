"use client"

import { deleteFaqAction } from "@/app/admin/(dashboard)/faq/actions"

export function DeleteFaqButton({ id }: { id: string }) {
  return (
    <form
      action={deleteFaqAction}
      onSubmit={(e) => {
        if (!confirm("Delete this FAQ?")) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm font-medium text-red-600 hover:underline">
        Delete
      </button>
    </form>
  )
}
