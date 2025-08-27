-- AlterTable
ALTER TABLE "SmallConcepts" ALTER COLUMN "id" SET DEFAULT 255,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "SmallConcepts_id_seq";

-- CreateTable
CREATE TABLE "SmallQuestion" (
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

    CONSTRAINT "SmallQuestion_pkey" PRIMARY KEY ("id")
);
