/*
  Warnings:

  - You are about to drop the `BlogDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogDetail" DROP CONSTRAINT "BlogDetail_blogId_fkey";

-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "blogDetails" JSONB[];

-- DropTable
DROP TABLE "BlogDetail";
