/*
  Warnings:

  - You are about to drop the column `level` on the `SmallQuiz` table. All the data in the column will be lost.
  - You are about to drop the column `marksNegative` on the `SmallQuiz` table. All the data in the column will be lost.
  - You are about to drop the column `marksPositive` on the `SmallQuiz` table. All the data in the column will be lost.
  - You are about to drop the column `solutionText` on the `SmallQuiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SmallQuiz" DROP COLUMN "level",
DROP COLUMN "marksNegative",
DROP COLUMN "marksPositive",
DROP COLUMN "solutionText";
