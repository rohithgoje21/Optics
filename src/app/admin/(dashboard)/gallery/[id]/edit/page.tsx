import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GalleryItemForm } from "@/components/admin/GalleryItemForm";
import { updateGalleryItemAction } from "@/app/admin/(dashboard)/gallery/actions";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateGalleryItemAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Edit Photo</h1>
      <div className="mt-6">
        <GalleryItemForm action={action} item={item} />
      </div>
    </div>
  );
}
