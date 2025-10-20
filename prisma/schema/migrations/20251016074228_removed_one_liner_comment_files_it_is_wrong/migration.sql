/*
  Warnings:

  - You are about to drop the column `linerId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_linerId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "linerId";
