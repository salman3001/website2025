/*
  Warnings:

  - Added the required column `userId` to the `BlogComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DiscussionComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogComment" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DiscussionComment" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BlogComment" ADD CONSTRAINT "BlogComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionComment" ADD CONSTRAINT "DiscussionComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
