/*
  Warnings:

  - You are about to drop the column `discussionlug` on the `DiscussionComment` table. All the data in the column will be lost.
  - Added the required column `discussionSlug` to the `DiscussionComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DiscussionComment" DROP CONSTRAINT "DiscussionComment_discussionlug_fkey";

-- AlterTable
ALTER TABLE "DiscussionComment" DROP COLUMN "discussionlug",
ADD COLUMN     "discussionSlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DiscussionComment" ADD CONSTRAINT "DiscussionComment_discussionSlug_fkey" FOREIGN KEY ("discussionSlug") REFERENCES "Discussion"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
