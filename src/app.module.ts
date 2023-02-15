import { Module } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
