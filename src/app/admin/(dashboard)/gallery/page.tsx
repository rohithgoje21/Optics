import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { categoryLabels } from "@/lib/validation/gallery-item";
import { DeleteGalleryItemButton } from "@/components/admin/DeleteGalleryItemButton";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-primary">Eyewear Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-primary hover:brightness-95"
        >
          Add Photo
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-gray-500">No photos yet — add your first one.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg border bg-white">
              <div className="relative aspect-[4/3] w-full bg-gray-100">
                <Image src={item.imageUrl} alt={item.caption} fill className="object-cover" />
                {!item.isActive && (
                  <span className="absolute left-2 top-2 rounded bg-gray-800/80 px-2 py-0.5 text-xs text-white">
                    Hidden
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium">{item.caption}</p>
                <p className="text-xs text-gray-500">{categoryLabels[item.category]}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Link
                    href={`/admin/gallery/${item.id}/edit`}
                    className="text-sm font-medium text-brand-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteGalleryItemButton id={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
