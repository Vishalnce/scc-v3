-- CreateTable
CREATE TABLE "Hell" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hell_id_key" ON "Hell"("id");
