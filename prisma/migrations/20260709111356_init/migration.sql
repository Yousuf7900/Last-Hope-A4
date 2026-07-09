/*
  Warnings:

  - The values [COMPLETED] on the enum `RentalStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[rentalId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rentalId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RentalStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "public"."Rental" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Rental" ALTER COLUMN "status" TYPE "RentalStatus_new" USING ("status"::text::"RentalStatus_new");
ALTER TYPE "RentalStatus" RENAME TO "RentalStatus_old";
ALTER TYPE "RentalStatus_new" RENAME TO "RentalStatus";
DROP TYPE "public"."RentalStatus_old";
ALTER TABLE "Rental" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "rentalId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "rentalId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionId" TEXT,
    "paymentIntentId" TEXT,
    "method" TEXT,
    "provider" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_rentalId_key" ON "Payment"("rentalId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_rentalId_key" ON "Review"("rentalId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
