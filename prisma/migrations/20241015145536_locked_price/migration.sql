/*
  Warnings:

  - Added the required column `lockedPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "lockedPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalAmount" DECIMAL(65,30) NOT NULL;
