-- AlterTable
ALTER TABLE "SmallConcepts" ADD COLUMN     "toc" JSONB,
ALTER COLUMN "id" DROP DEFAULT;
