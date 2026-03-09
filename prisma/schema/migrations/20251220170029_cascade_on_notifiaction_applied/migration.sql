-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_currentAffairId_fkey";

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_currentAffairId_fkey" FOREIGN KEY ("currentAffairId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
