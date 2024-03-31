/*
  Warnings:

  - The primary key for the `Material` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Material` table. All the data in the column will be lost.
  - The `numeroMaterial` column on the `Material` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Material_numeroMaterial_key";

-- AlterTable
ALTER TABLE "Material" DROP CONSTRAINT "Material_pkey",
DROP COLUMN "id",
DROP COLUMN "numeroMaterial",
ADD COLUMN     "numeroMaterial" SERIAL NOT NULL,
ADD CONSTRAINT "Material_pkey" PRIMARY KEY ("numeroMaterial");
