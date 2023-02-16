import { Module } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import BookMarkStore from 'src/core/bookmark.store';
import { UserStore } from 'src/core/user.store';
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
  providers: [BookMarkService, BookMarkStore, UserStore],
})
export default class BookMarkModule {}
