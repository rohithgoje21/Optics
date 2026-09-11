-- AlterTable
ALTER TABLE "GalleryItem" ADD COLUMN     "showInCarousel" BOOLEAN NOT NULL DEFAULT false;

-- Keep photos that are currently showing in the carousel visible after this migration;
-- only new photos added from here on default to unchecked.
UPDATE "GalleryItem" SET "showInCarousel" = true WHERE "isActive" = true;
