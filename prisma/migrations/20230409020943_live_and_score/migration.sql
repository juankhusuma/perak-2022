-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "score" INTEGER[],
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "SnakeScore" ADD COLUMN     "score" INTEGER;

-- AlterTable
ALTER TABLE "TetrisScore" ADD COLUMN     "score" INTEGER;

-- CreateTable
CREATE TABLE "Live" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "gameId" TEXT,
    "team1Score" TEXT,
    "team2Score" TEXT,
    "date" TIMESTAMP(3),
    "link" TEXT,

    CONSTRAINT "Live_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LiveToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LiveToTeam_AB_unique" ON "_LiveToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_LiveToTeam_B_index" ON "_LiveToTeam"("B");

-- AddForeignKey
ALTER TABLE "Live" ADD CONSTRAINT "Live_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LiveToTeam" ADD CONSTRAINT "_LiveToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Live"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LiveToTeam" ADD CONSTRAINT "_LiveToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
