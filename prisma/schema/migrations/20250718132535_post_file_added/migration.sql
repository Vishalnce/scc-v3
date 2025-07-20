/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keywords` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE post_id_seq;
ALTER TABLE "Post" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "keywords" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('post_id_seq'),
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE post_id_seq OWNED BY "Post"."id";

-- DropIndex
DROP INDEX "Post_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
