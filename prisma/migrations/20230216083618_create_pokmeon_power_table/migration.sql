-- CreateTable
CREATE TABLE "pokemon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "power" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonId" TEXT,

    CONSTRAINT "power_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "power" ADD CONSTRAINT "power_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
