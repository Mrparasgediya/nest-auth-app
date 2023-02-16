import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import PowerController from './power.controller';
import PowerService from './power.service';

@Module({
  controllers: [PowerController],
  providers: [PowerService, PrismaService],
})
export default class PowerModule {}
