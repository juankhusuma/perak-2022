/*
  Warnings:

  - Made the column `score` on table `SnakeScore` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SnakeScore" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "score" SET DEFAULT 0;
