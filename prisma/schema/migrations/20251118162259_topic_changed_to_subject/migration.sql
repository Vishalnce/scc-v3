/*
  Warnings:

  - You are about to drop the column `topic` on the `SmallQuiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SmallQuiz" DROP COLUMN "topic",
ADD COLUMN     "subject" TEXT NOT NULL DEFAULT 'General';
