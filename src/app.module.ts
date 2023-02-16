import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AuthModule from './auth/auth.module';
import BookMarkModule from './bookmarks/bookmarks.module';
import { CoreModule } from './core/core.module';
import { validate } from './core/env.validation';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    CoreModule,
    UsersModule,
    AuthModule,
    BookMarkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
