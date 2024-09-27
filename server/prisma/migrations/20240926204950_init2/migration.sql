/*
  Warnings:

  - You are about to drop the column `seoId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `seoId` on the `Discussion` table. All the data in the column will be lost.
  - You are about to drop the `Portfolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscriber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubscriberToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubscriberToblogCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blogCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mediaId]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blogSlug]` on the table `Seo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discussionSlug]` on the table `Seo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Blog` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `MediaCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_blogCategorySlug_fkey";

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_seoId_fkey";

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_seoId_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriberToTag" DROP CONSTRAINT "_SubscriberToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriberToTag" DROP CONSTRAINT "_SubscriberToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriberToblogCategory" DROP CONSTRAINT "_SubscriberToblogCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriberToblogCategory" DROP CONSTRAINT "_SubscriberToblogCategory_B_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "seoId",
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mediaId" INTEGER,
ALTER COLUMN "longDesc" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Discussion" DROP COLUMN "seoId",
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "MediaCategory" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "video" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Seo" ADD COLUMN     "blogSlug" TEXT,
ADD COLUMN     "discussionSlug" TEXT;

-- DropTable
DROP TABLE "Portfolio";

-- DropTable
DROP TABLE "Subscriber";

-- DropTable
DROP TABLE "_SubscriberToTag";

-- DropTable
DROP TABLE "_SubscriberToblogCategory";

-- DropTable
DROP TABLE "blogCategory";

-- CreateTable
CREATE TABLE "BlogCategory" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "EmailSubscription" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "EmailSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlogCategoryToEmailSubscription" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EmailSubscriptionToTag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_slug_key" ON "BlogCategory"("slug");

-- CreateIndex
CREATE INDEX "BlogCategory_slug_idx" ON "BlogCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscription_email_key" ON "EmailSubscription"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscription_userId_key" ON "EmailSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_BlogCategoryToEmailSubscription_AB_unique" ON "_BlogCategoryToEmailSubscription"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogCategoryToEmailSubscription_B_index" ON "_BlogCategoryToEmailSubscription"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EmailSubscriptionToTag_AB_unique" ON "_EmailSubscriptionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EmailSubscriptionToTag_B_index" ON "_EmailSubscriptionToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_mediaId_key" ON "Blog"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "Seo_blogSlug_key" ON "Seo"("blogSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Seo_discussionSlug_key" ON "Seo"("discussionSlug");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_blogCategorySlug_fkey" FOREIGN KEY ("blogCategorySlug") REFERENCES "BlogCategory"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seo" ADD CONSTRAINT "Seo_blogSlug_fkey" FOREIGN KEY ("blogSlug") REFERENCES "Blog"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seo" ADD CONSTRAINT "Seo_discussionSlug_fkey" FOREIGN KEY ("discussionSlug") REFERENCES "Discussion"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailSubscription" ADD CONSTRAINT "EmailSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogCategoryToEmailSubscription" ADD CONSTRAINT "_BlogCategoryToEmailSubscription_A_fkey" FOREIGN KEY ("A") REFERENCES "BlogCategory"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogCategoryToEmailSubscription" ADD CONSTRAINT "_BlogCategoryToEmailSubscription_B_fkey" FOREIGN KEY ("B") REFERENCES "EmailSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmailSubscriptionToTag" ADD CONSTRAINT "_EmailSubscriptionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "EmailSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmailSubscriptionToTag" ADD CONSTRAINT "_EmailSubscriptionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
