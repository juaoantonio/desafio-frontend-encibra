/*
  Warnings:

  - The `fieldOfWork` column on the `Collaborator` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `employmentType` column on the `Collaborator` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "fieldsOfWork" AS ENUM ('BACKEND', 'FRONTEND', 'DEVOPS', 'DESIGN', 'MANAGEMENT', 'REQUIREMENTS');

-- CreateEnum
CREATE TYPE "employmentType" AS ENUM ('CLT', 'PJ');

-- AlterTable
ALTER TABLE "Collaborator" DROP COLUMN "fieldOfWork",
ADD COLUMN     "fieldOfWork" "fieldsOfWork"[],
DROP COLUMN "employmentType",
ADD COLUMN     "employmentType" "employmentType"[];
