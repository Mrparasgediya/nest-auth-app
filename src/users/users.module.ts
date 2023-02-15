import { Module } from '@nestjs/common';
import { UserStore } from 'src/core/user.store';
import UserService from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [UserStore],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
