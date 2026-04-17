/*
  Warnings:

  - You are about to drop the column `solutionImage` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `solutionText` on the `Question` table. All the data in the column will be lost.
  - Added the required column `solution` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "solutionImage",
DROP COLUMN "solutionText",
ADD COLUMN     "solution" TEXT NOT NULL;
