/*
  Warnings:

  - You are about to drop the column `pokemonId` on the `power` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "power" DROP CONSTRAINT "power_pokemonId_fkey";

-- AlterTable
ALTER TABLE "power" DROP COLUMN "pokemonId";

-- CreateTable
CREATE TABLE "pokemon_power" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "powerId" INTEGER NOT NULL,

    CONSTRAINT "pokemon_power_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pokemon_power" ADD CONSTRAINT "pokemon_power_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_power" ADD CONSTRAINT "pokemon_power_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
