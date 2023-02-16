import { Controller, Param, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth.guard';
import UserService from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
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
