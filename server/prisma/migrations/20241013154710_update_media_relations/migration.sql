/*
  Warnings:

  - You are about to drop the column `projectId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_projectId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "projectId";

-- CreateTable
CREATE TABLE "_MediaToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MediaToProject_AB_unique" ON "_MediaToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaToProject_B_index" ON "_MediaToProject"("B");

-- AddForeignKey
ALTER TABLE "_MediaToProject" ADD CONSTRAINT "_MediaToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToProject" ADD CONSTRAINT "_MediaToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
