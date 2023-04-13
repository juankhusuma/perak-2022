/*
  Warnings:

  - You are about to drop the `ScoreToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ScoreToken" DROP CONSTRAINT "ScoreToken_userId_fkey";

-- DropTable
DROP TABLE "ScoreToken";
