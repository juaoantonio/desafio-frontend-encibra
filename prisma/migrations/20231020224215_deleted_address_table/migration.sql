/*
  Warnings:

  - You are about to drop the column `addressId` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collaborator" DROP CONSTRAINT "Collaborator_addressId_fkey";

-- AlterTable
ALTER TABLE "Collaborator" DROP COLUMN "addressId";

-- DropTable
DROP TABLE "Address";
