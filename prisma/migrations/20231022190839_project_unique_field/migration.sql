/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imgUrl` to the `Collaborator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collaborator" ADD COLUMN     "imgUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");
