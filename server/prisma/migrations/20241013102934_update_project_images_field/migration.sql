/*
  Warnings:

  - You are about to drop the column `images` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "projectId" INTEGER;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "images";

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
