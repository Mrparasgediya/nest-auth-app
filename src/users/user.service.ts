import { Injectable, NotFoundException } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';

@Injectable()
export default class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        email: true,
        id: true,
      },
    });
  }
  async getUserById(id: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: { id },
      select: { email: true, id: true },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    return foundUser;
  }
}
