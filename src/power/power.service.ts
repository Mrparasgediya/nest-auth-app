import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';

@Injectable()
export default class PowerService {
  constructor(private readonly prismaService: PrismaService) {}
  getAll() {
    return this.prismaService.power.findMany();
  }
}
