"use client"

import { useState } from "react"
import Image from "next/image"
import { upload } from "@vercel/blob/client"

export function ImageUploader({
  name,
  defaultValue,
}: {
  name: string
  defaultValue?: string
}) {
  const [imageUrl, setImageUrl] = useState(defaultValue ?? "")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/admin/gallery/upload",
      })
      setImageUrl(blob.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={imageUrl} />
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-primary hover:file:brightness-95"
      />
      {uploading ? <p className="mt-2 text-sm text-gray-500">Uploading...</p> : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      {imageUrl ? (
        <div className="relative mt-3 h-40 w-40 overflow-hidden rounded border bg-gray-100">
          <Image src={imageUrl} alt="Preview" fill className="object-cover" />
        </div>
      ) : null}
    </div>
  )
}
