import { Body, Controller, Get, Post } from '@nestjs/common';
import PokemonDto from './dto/pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get()
  getAllPokemon() {
    return this.pokemonService.findAllPokemon();
  }

  @Post()
  savePokemons(@Body() pokemon: PokemonDto) {
    return this.pokemonService.savePokemon(pokemon);
  }
}
