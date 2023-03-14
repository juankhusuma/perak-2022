-- AlterTable
ALTER TABLE "PaymentMethod" ADD COLUMN     "accountProvider" TEXT,
ALTER COLUMN "accountNo" SET DATA TYPE TEXT;
