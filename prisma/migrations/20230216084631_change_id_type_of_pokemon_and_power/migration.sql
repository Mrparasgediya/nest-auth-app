/*
  Warnings:

  - The primary key for the `pokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `pokemon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `power` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `power` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pokemonId` column on the `power` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "power" DROP CONSTRAINT "power_pokemonId_fkey";

-- AlterTable
ALTER TABLE "pokemon" DROP CONSTRAINT "pokemon_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "power" DROP CONSTRAINT "power_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "pokemonId",
ADD COLUMN     "pokemonId" INTEGER,
ADD CONSTRAINT "power_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "power" ADD CONSTRAINT "power_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
