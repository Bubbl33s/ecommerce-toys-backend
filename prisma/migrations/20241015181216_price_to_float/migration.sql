/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "totalAmount" SET DATA TYPE DOUBLE PRECISION;
