import { GalleryItemForm } from "@/components/admin/GalleryItemForm";
import { createGalleryItemAction } from "@/app/admin/(dashboard)/gallery/actions";

export default function NewGalleryItemPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Add Photo</h1>
      <div className="mt-6">
        <GalleryItemForm action={createGalleryItemAction} />
      </div>
    </div>
  );
}
