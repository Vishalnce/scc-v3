-- CreateEnum
CREATE TYPE "PopupType" AS ENUM ('A', 'B');

-- CreateTable
CREATE TABLE "Popup" (
    "id" TEXT NOT NULL,
    "type" "PopupType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "showAfter1" INTEGER NOT NULL,
    "showAfter2" INTEGER NOT NULL,
    "showAfter3" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Popup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Popup_type_key" ON "Popup"("type");
