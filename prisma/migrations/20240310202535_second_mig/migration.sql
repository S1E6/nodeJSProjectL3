/*
  Warnings:

  - You are about to alter the column `numeroMaterial` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.
  - You are about to alter the column `design` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `etat` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "numeroMaterial" SET DATA TYPE VARCHAR(5),
ALTER COLUMN "design" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "etat" SET DATA TYPE VARCHAR(10);
