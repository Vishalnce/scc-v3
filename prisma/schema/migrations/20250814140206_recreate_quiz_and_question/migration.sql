/*
  Warnings:

  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `solution` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Question` table. All the data in the column will be lost.
  - The `id` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `marksPositive` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `marksNegative` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Changed the type of `options` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "question",
DROP COLUMN "solution",
DROP COLUMN "updatedAt",
ADD COLUMN     "questionImage" TEXT,
ADD COLUMN     "questionText" TEXT,
ADD COLUMN     "solutionImage" TEXT,
ADD COLUMN     "solutionText" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "options",
ADD COLUMN     "options" JSONB NOT NULL,
ALTER COLUMN "marksPositive" SET DATA TYPE INTEGER,
ALTER COLUMN "marksNegative" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
