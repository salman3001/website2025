/*
  Warnings:

  - You are about to drop the column `title` on the `BlogCategory` table. All the data in the column will be lost.
  - Added the required column `name` to the `BlogCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogCategory" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;
