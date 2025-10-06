-- CreateTable
CREATE TABLE "Rank" (
    "rankId" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "maxMarks" INTEGER NOT NULL,
    "timeTaken" INTEGER NOT NULL,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("rankId")
);

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
