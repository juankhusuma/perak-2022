/*
  Warnings:

  - You are about to drop the column `isIndividual` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "isIndividual" BOOLEAN;

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "isIndividual";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "paymentMethodId" TEXT,
ADD COLUMN     "paymentReceipt" TEXT;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
