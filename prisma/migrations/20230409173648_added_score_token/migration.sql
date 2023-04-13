-- CreateTable
CREATE TABLE "ScoreToken" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ScoreToken_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "ScoreToken" ADD CONSTRAINT "ScoreToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
