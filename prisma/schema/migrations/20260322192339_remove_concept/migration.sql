/*
  Warnings:

  - You are about to drop the column `conceptId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Concept` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_conceptId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "conceptId";

-- DropTable
DROP TABLE "public"."Concept";
