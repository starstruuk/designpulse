/*
  Warnings:

  - You are about to drop the column `source` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "source",
ADD COLUMN     "sourceId" TEXT;

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_name_key" ON "Source"("name");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;
