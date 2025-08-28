-- CreateTable
CREATE TABLE "QuizPost" (
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

    CONSTRAINT "QuizPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizPost" ADD CONSTRAINT "QuizPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
