-- CreateTable
CREATE TABLE "Material" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numeroMaterial" TEXT NOT NULL,
    "design" TEXT,
    "etat" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Material_numeroMaterial_key" ON "Material"("numeroMaterial");
