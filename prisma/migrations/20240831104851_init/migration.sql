/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Blogs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_title_key" ON "Blogs"("title");
