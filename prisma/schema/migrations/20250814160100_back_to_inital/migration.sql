/*
  Warnings:

  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionImage` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionText` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `solutionImage` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `solutionText` on the `Question` table. All the data in the column will be lost.
  - The `options` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solution` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "questionImage",
DROP COLUMN "questionText",
DROP COLUMN "solutionImage",
DROP COLUMN "solutionText",
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "solution" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "marksPositive" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "marksNegative" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "options",
ADD COLUMN     "options" TEXT[],
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Question_id_seq";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
