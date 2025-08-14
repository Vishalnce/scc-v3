/*
  Warnings:

  - You are about to drop the column `question` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `solution` on the `Question` table. All the data in the column will be lost.
  - Changed the type of `options` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "question",
DROP COLUMN "solution",
ADD COLUMN     "questionImage" TEXT,
ADD COLUMN     "questionText" TEXT,
ADD COLUMN     "solutionImage" TEXT,
ADD COLUMN     "solutionText" TEXT,
DROP COLUMN "options",
ADD COLUMN     "options" JSONB NOT NULL;
