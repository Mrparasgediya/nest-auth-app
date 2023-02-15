import { Module } from '@nestjs/common/decorators';
import { JwtModule } from '@nestjs/jwt';
import BookMarkStore from 'src/core/bookmark.store';
import { UserStore } from 'src/core/user.store';
import BookMarkController from './bookmark.controller';
import BookMarkService from './bookmark.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SECRET',
    }),
  ],
  controllers: [BookMarkController],
  providers: [BookMarkService, BookMarkStore, UserStore],
})
export default class BookMarkModule {}
