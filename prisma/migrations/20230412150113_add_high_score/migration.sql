/*
  Warnings:

  - You are about to drop the column `score` on the `SnakeScore` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `TetrisScore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SnakeScore" DROP COLUMN "score",
ADD COLUMN     "currScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "highScore" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "TetrisScore" DROP COLUMN "score",
ADD COLUMN     "attempts" INTEGER DEFAULT 0,
ADD COLUMN     "currScore" INTEGER DEFAULT 0,
ADD COLUMN     "highScore" INTEGER DEFAULT 0;
