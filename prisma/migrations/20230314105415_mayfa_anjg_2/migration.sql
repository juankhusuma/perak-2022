/*
  Warnings:

  - You are about to drop the column `ign` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "ign";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "ign" TEXT;
