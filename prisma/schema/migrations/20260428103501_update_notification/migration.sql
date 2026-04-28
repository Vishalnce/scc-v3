/*
  Warnings:

  - You are about to drop the column `currentAffairId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `entityId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('QUIZ', 'BLOG', 'EXAM', 'CONCEPT', 'CURRENT_AFFAIR');

-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_currentAffairId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_quizId_fkey";

-- DropIndex
DROP INDEX "public"."Notification_title_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "currentAffairId",
DROP COLUMN "quizId",
ADD COLUMN     "entityId" INTEGER NOT NULL,
ADD COLUMN     "type" "NotificationType" NOT NULL;
