/*
  Warnings:

  - You are about to drop the column `timetoread` on the `Editorial` table. All the data in the column will be lost.
  - Added the required column `timeToRead` to the `Editorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Editorial" DROP COLUMN "timetoread",
ADD COLUMN     "timeLimit" DOUBLE PRECISION NOT NULL DEFAULT 15,
ADD COLUMN     "timeToRead" DOUBLE PRECISION NOT NULL;
