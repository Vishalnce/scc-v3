/*
  Warnings:

  - You are about to drop the `QuizPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuizPost" DROP CONSTRAINT "QuizPost_postId_fkey";

-- DropTable
DROP TABLE "QuizPost";

-- CreateTable
CREATE TABLE "PostQuiz" (
    "id" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "questionText" TEXT,
    "options" JSONB NOT NULL,
    "solutionText" TEXT,
    "correctOption" INTEGER NOT NULL,
    "marksPositive" DOUBLE PRECISION NOT NULL,
    "marksNegative" DOUBLE PRECISION NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostQuiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostQuiz" ADD CONSTRAINT "PostQuiz_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
