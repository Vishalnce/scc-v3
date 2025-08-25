-- CreateTable
CREATE TABLE "Typing" (
    "id" SERIAL NOT NULL,
    "typing" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Typing_pkey" PRIMARY KEY ("id")
);
