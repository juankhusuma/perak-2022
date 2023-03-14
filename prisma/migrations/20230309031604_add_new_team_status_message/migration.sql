/*
  Warnings:

  - Added the required column `name` to the `TeamStatus` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeamStatusMessage" AS ENUM ('WAITING_FOR_CONFIRMATION', 'CONFIRMED', 'REJECTED');

-- AlterTable
ALTER TABLE "TeamStatus" DROP COLUMN "name",
ADD COLUMN     "name" "TeamStatusMessage" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeamStatus_name_key" ON "TeamStatus"("name");
