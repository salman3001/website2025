/*
  Warnings:

  - You are about to drop the `_MediaToProject` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[thumbnailId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_MediaToProject" DROP CONSTRAINT "_MediaToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_MediaToProject" DROP CONSTRAINT "_MediaToProject_B_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "thumbnailId" INTEGER;

-- DropTable
DROP TABLE "_MediaToProject";

-- CreateTable
CREATE TABLE "_images" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_images_AB_unique" ON "_images"("A", "B");

-- CreateIndex
CREATE INDEX "_images_B_index" ON "_images"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Project_thumbnailId_key" ON "Project"("thumbnailId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_images" ADD CONSTRAINT "_images_A_fkey" FOREIGN KEY ("A") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_images" ADD CONSTRAINT "_images_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
