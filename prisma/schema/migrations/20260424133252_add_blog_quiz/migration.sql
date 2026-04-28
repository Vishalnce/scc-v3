-- CreateTable
CREATE TABLE "BlogQuiz" (
    "id" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,
    "questionText" TEXT,
    "options" JSONB NOT NULL,
    "solutionText" TEXT,
    "correctOption" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogQuiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogQuiz" ADD CONSTRAINT "BlogQuiz_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
