"use client"

import { useActionState } from "react"
import { ImageUploader } from "./ImageUploader"
import type { GalleryFormState } from "@/app/admin/(dashboard)/gallery/actions"
import { categoryLabels, galleryCategories } from "@/lib/validation/gallery-item"
import type { GalleryItem } from "@prisma/client"

const initialState: GalleryFormState = { status: "idle" }

export function GalleryItemForm({
  action,
  item,
}: {
  action: (prevState: GalleryFormState, formData: FormData) => Promise<GalleryFormState>
  item?: GalleryItem
}) {
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="max-w-lg space-y-5">
      {state.status === "error" && state.message ? (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">{state.message}</p>
      ) : null}

      <div>
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <ImageUploader name="imageUrl" defaultValue={item?.imageUrl} />
        {state.fieldErrors?.imageUrl && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.imageUrl}</p>
        )}
      </div>

      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
          Caption
        </label>
        <input
          id="caption"
          name="caption"
          defaultValue={item?.caption}
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.caption && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.caption}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={item?.category ?? galleryCategories[0]}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {galleryCategories.map((cat) => (
            <option key={cat} value={cat}>
              {categoryLabels[cat]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
          Sort Order
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={item?.sortOrder ?? 0}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          defaultChecked={item?.isActive ?? true}
          className="h-4 w-4"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
          Visible on public gallery
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand-accent px-5 py-2.5 font-semibold text-brand-primary hover:brightness-95 disabled:opacity-60"
      >
        {pending ? "Saving..." : item ? "Save Changes" : "Add Photo"}
      </button>
    </form>
  )
}
