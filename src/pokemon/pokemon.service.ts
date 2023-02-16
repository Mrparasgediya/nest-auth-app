import { Injectable } from '@nestjs/common';
import { Pokemon } from '@prisma/client';
import PrismaService from 'src/prisma/prisma.service';
import PokemonDto from './dto/pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaService) {}

  findAllPokemon(): Promise<Pokemon[]> {
    return this.prismaService.pokemon.findMany();
  }

  savePokemon(pokemon: PokemonDto) {
    const { imageUrl, name, power } = pokemon;
    return this.prismaService.pokemon.create({
      data: {
        imageUrl,
        name,
        PowerPokemon: {
          createMany: {
            data: power.map((powerId) => ({
              powerId,
            })),
          },
        },
      },
    });
  }
}
