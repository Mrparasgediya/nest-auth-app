import { Module } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import PrismaService from 'src/prisma/prisma.service';
import BookMarkController from './bookmark.controller';
import BookMarkService from './bookmark.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return { secret: config.get('JWT_SECRET'), expiresIn: '60min' };
      },
    }),
  ],
  controllers: [BookMarkController],
  providers: [BookMarkService, PrismaService],
})
export default class BookMarkModule {}
