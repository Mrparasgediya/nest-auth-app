import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon, Power } from '@prisma/client';
import PrismaService from 'src/prisma/prisma.service';
import PokemonDto from './dto/pokemon.dto';

type PokemonResponse = Pokemon & { powers: Power[] };
@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaService) {}

  private getTransformedPokemonForResponse(pokemon: any): PokemonResponse {
    const { PowerPokemon, ...restPokemonFields } = pokemon;
    return {
      ...restPokemonFields,
      powers: PowerPokemon.map((currPower) => currPower.power),
    };
  }

  findAllPokemon(): Promise<PokemonResponse[]> {
    return this.prismaService.pokemon
      .findMany({
        include: {
          PowerPokemon: {
            select: {
              power: {},
            },
          },
        },
      })
      .then((pokemons) =>
        pokemons.map((currPokemon) =>
          this.getTransformedPokemonForResponse(currPokemon),
        ),
      );
  }

  savePokemon(pokemon: PokemonDto) {
    const { imageUrl, name, powers } = pokemon;
    return this.prismaService.pokemon.create({
      data: {
        imageUrl,
        name,
        PowerPokemon: {
          createMany: {
            data: powers.map((powerId) => ({
              powerId,
            })),
          },
        },
      },
    });
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    const foundPokemon = await this.prismaService.pokemon.findFirst({
      where: { id },
      include: {
        PowerPokemon: {
          select: {
            power: {},
          },
        },
      },
    });
    if (!foundPokemon) {
      throw new NotFoundException('Pokemon not found!');
    }
    return this.getTransformedPokemonForResponse(foundPokemon);
  }

  async deleteById(id: number) {
    await this.prismaService.powerPokemon.deleteMany({
      where: {
        pokemonId: id,
      },
    });

    await this.prismaService.pokemon.delete({
      where: { id },
    });
  }
}
