/*
  Warnings:

  - You are about to drop the column `Subjects` on the `SmallConcepts` table. All the data in the column will be lost.
  - Added the required column `topic` to the `SmallConcepts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SmallConcepts" DROP COLUMN "Subjects",
ADD COLUMN     "topic" TEXT NOT NULL;
