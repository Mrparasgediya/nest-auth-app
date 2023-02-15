import { Module } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import BookMarkModule from './bookmarks/bookmarks.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule, BookMarkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
