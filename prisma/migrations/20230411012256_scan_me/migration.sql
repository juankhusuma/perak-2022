/*
  Warnings:

  - You are about to drop the column `challengeStatusId` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_challengeStatusId_fkey";

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "challengeStatusId";

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "challengeStatusId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "scanMeScore" INTEGER;

-- DropTable
DROP TABLE "Example";

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_challengeStatusId_fkey" FOREIGN KEY ("challengeStatusId") REFERENCES "ChallengeStatus"("name") ON DELETE SET NULL ON UPDATE CASCADE;
