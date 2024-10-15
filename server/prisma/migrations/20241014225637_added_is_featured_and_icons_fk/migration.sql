-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "BlogCategory" ADD COLUMN     "mediaId" INTEGER;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "mediaId" INTEGER;

-- AddForeignKey
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
