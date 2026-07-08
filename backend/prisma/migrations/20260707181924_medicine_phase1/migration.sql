/*
  Warnings:

  - A unique constraint covering the columns `[batchNumber]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MedicineType" AS ENUM ('TABLET', 'CAPSULE', 'SYRUP', 'INJECTION', 'OINTMENT', 'DROPS', 'POWDER', 'OTHER');

-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "genericName" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "type" "MedicineType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_batchNumber_key" ON "Medicine"("batchNumber");
