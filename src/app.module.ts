import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AuthModule from './auth/auth.module';
import BookMarkModule from './bookmarks/bookmarks.module';
import { PokemonModule } from './pokemon/pokemon.module';
import PowerModule from './power/power.module';
import { UsersModule } from './users/users.module';
import { validate } from './utils/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    UsersModule,
    AuthModule,
    BookMarkModule,
    PokemonModule,
    PowerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
