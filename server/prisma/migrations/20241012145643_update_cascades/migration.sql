-- DropForeignKey
ALTER TABLE "BlogComment" DROP CONSTRAINT "BlogComment_blogSlug_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionComment" DROP CONSTRAINT "DiscussionComment_discussionlug_fkey";

-- DropForeignKey
ALTER TABLE "Seo" DROP CONSTRAINT "Seo_blogSlug_fkey";

-- DropForeignKey
ALTER TABLE "Seo" DROP CONSTRAINT "Seo_discussionSlug_fkey";

-- AddForeignKey
ALTER TABLE "Seo" ADD CONSTRAINT "Seo_blogSlug_fkey" FOREIGN KEY ("blogSlug") REFERENCES "Blog"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seo" ADD CONSTRAINT "Seo_discussionSlug_fkey" FOREIGN KEY ("discussionSlug") REFERENCES "Discussion"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogComment" ADD CONSTRAINT "BlogComment_blogSlug_fkey" FOREIGN KEY ("blogSlug") REFERENCES "Blog"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionComment" ADD CONSTRAINT "DiscussionComment_discussionlug_fkey" FOREIGN KEY ("discussionlug") REFERENCES "Discussion"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
