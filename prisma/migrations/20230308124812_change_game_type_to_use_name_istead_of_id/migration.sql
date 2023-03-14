/*
  Warnings:

  - You are about to drop the column `gameTypeId` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_gameTypeId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "gameTypeId",
ADD COLUMN     "gameTypeName" TEXT;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameTypeName_fkey" FOREIGN KEY ("gameTypeName") REFERENCES "GameType"("name") ON DELETE SET NULL ON UPDATE CASCADE;
