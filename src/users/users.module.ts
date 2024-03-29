import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import UserService from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, PrismaService],
})
export class UsersModule {}
