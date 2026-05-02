/*
  Warnings:

  - Added the required column `timetoread` to the `Editorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Editorial" ADD COLUMN     "timetoread" TEXT NOT NULL;
