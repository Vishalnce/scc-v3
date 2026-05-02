/*
  Warnings:

  - Added the required column `timetoread` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timetoread` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "timetoread" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "timetoread" TEXT NOT NULL;
