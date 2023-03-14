/*
  Warnings:

  - You are about to drop the column `gameId` on the `PaymentMethod` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_gameId_fkey";

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "gameId";

-- DropEnum
DROP TYPE "TeamStatusMessage";

-- CreateTable
CREATE TABLE "_GameToPaymentMethod" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToPaymentMethod_AB_unique" ON "_GameToPaymentMethod"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToPaymentMethod_B_index" ON "_GameToPaymentMethod"("B");

-- AddForeignKey
ALTER TABLE "_GameToPaymentMethod" ADD CONSTRAINT "_GameToPaymentMethod_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPaymentMethod" ADD CONSTRAINT "_GameToPaymentMethod_B_fkey" FOREIGN KEY ("B") REFERENCES "PaymentMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;
