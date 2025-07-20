/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editorHtml` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toc` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Post_title_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "alt" TEXT NOT NULL,
ADD COLUMN     "editorHtml" TEXT NOT NULL,
ADD COLUMN     "toc" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
