-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "familyGameScore" INTEGER;

-- CreateTable
CREATE TABLE "SnakeScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "SnakeScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TetrisScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "TetrisScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "gameId" TEXT,
    "teamId" TEXT,
    "startDate" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "gameId" TEXT,
    "team1Score" TEXT,
    "team2Score" TEXT,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "challengeStatusId" TEXT,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submisionUrl" TEXT,
    "challengeId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "ChallengeStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ScheduleToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ResultToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SnakeScore_userId_key" ON "SnakeScore"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TetrisScore_userId_key" ON "TetrisScore"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeStatus_name_key" ON "ChallengeStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToTeam_AB_unique" ON "_ScheduleToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleToTeam_B_index" ON "_ScheduleToTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResultToTeam_AB_unique" ON "_ResultToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ResultToTeam_B_index" ON "_ResultToTeam"("B");

-- AddForeignKey
ALTER TABLE "SnakeScore" ADD CONSTRAINT "SnakeScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TetrisScore" ADD CONSTRAINT "TetrisScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengeStatusId_fkey" FOREIGN KEY ("challengeStatusId") REFERENCES "ChallengeStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToTeam" ADD CONSTRAINT "_ScheduleToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToTeam" ADD CONSTRAINT "_ScheduleToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResultToTeam" ADD CONSTRAINT "_ResultToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResultToTeam" ADD CONSTRAINT "_ResultToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
