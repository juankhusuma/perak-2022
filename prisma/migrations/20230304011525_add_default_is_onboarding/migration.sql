-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_teamStatusId_fkey";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "teamStatusId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isOnboarded" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamStatusId_fkey" FOREIGN KEY ("teamStatusId") REFERENCES "TeamStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
