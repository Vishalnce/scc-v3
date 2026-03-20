/*
  Warnings:

  - You are about to drop the column `title` on the `SmallConcepts` table. All the data in the column will be lost.
  - You are about to drop the column `toc` on the `SmallConcepts` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `SmallConcepts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SmallConcepts" DROP COLUMN "title",
DROP COLUMN "toc",
DROP COLUMN "topic";
