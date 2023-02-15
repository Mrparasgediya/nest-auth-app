import { Controller, Param } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import UserService from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param() { id }: { id: string }) {
    return this.userService.getUserById(id);
  }
}
