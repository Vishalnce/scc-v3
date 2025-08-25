-- CreateTable
CREATE TABLE "SmallConcepts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmallConcepts_pkey" PRIMARY KEY ("id")
);
