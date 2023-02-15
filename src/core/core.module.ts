import { Global, Module } from '@nestjs/common';
import BookMarkStore from './bookmark.store';
import { UserStore } from './user.store';

@Global()
@Module({
  providers: [UserStore, BookMarkStore],
  exports: [UserStore, BookMarkStore],
})
export class CoreModule {}
