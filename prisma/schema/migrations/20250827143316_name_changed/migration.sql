/*
  Warnings:

  - You are about to drop the `SmallQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SmallQuestion";

-- CreateTable
CREATE TABLE "SmallQuiz" (
    "id" TEXT NOT NULL,
    "questionText" TEXT,
    "options" JSONB NOT NULL,
    "solutionText" TEXT,
    "correctOption" INTEGER NOT NULL,
    "marksPositive" DOUBLE PRECISION NOT NULL,
    "marksNegative" DOUBLE PRECISION NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmallQuiz_pkey" PRIMARY KEY ("id")
);
