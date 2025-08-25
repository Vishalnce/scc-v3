/*
  Warnings:

  - You are about to drop the column `level` on the `SmallConcepts` table. All the data in the column will be lost.
  - Added the required column `Subjects` to the `SmallConcepts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SmallConcepts" DROP COLUMN "level",
ADD COLUMN     "Subjects" TEXT NOT NULL;
