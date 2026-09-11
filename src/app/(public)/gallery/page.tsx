import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { categoryLabels, galleryCategories } from "@/lib/validation/gallery-item";

// The gallery is a browse-our-eyewear page for customers — checkup/exam
// equipment photos are shown on the home page carousel instead, not here.
const publicGalleryCategories = galleryCategories.filter((cat) => cat !== "EYE_CHECKUP");

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = publicGalleryCategories.includes(category as never)
    ? (category as (typeof publicGalleryCategories)[number])
    : undefined;

  const items = await prisma.galleryItem.findMany({
    where: {
      isActive: true,
      category: activeCategory ? activeCategory : { in: publicGalleryCategories },
    },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-primary">Eyewear Gallery</h1>
      <p className="mt-2 text-gray-600">
        A look at the styles available in-store. Call or visit us to try them on and check
        pricing.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/gallery"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            !activeCategory
              ? "border-brand-accent bg-brand-accent text-brand-primary"
              : "border-gray-300 text-gray-700 hover:border-brand-accent"
          }`}
        >
          All
        </Link>
        {publicGalleryCategories.map((cat) => (
          <Link
            key={cat}
            href={`/gallery?category=${cat}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
              activeCategory === cat
                ? "border-brand-accent bg-brand-accent text-brand-primary"
                : "border-gray-300 text-gray-700 hover:border-brand-accent"
            }`}
          >
            {categoryLabels[cat]}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-gray-500">No photos in this category yet — check back soon.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <figure key={item.id} className="overflow-hidden rounded-lg border bg-white">
              <div className="relative aspect-[4/3] w-full bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-3 py-2 text-sm text-gray-700">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
