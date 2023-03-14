/*
  Warnings:

  - The `name` column on the `TeamStatus` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TeamStatus" DROP COLUMN "name",
ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TeamStatus_name_key" ON "TeamStatus"("name");
