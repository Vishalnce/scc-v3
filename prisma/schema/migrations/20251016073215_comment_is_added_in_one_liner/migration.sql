-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "linerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_linerId_fkey" FOREIGN KEY ("linerId") REFERENCES "Liner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
