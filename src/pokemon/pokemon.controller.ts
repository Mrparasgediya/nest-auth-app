import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
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

  @Get(':id')
  getPokemonById(@Param() params) {
    return this.pokemonService.getPokemonById(+params.id);
  }

  @Delete(':id')
  deletePokemonById(@Param() params) {
    return this.pokemonService.deleteById(+params.id);
  }

  // @Get(':id/powers')
  // getPokemonPowers(@Param() Params){
  //   return this.pokemonService.
  // }
}
