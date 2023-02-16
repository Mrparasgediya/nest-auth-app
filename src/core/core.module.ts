import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import BookMarkStore from './bookmark.store';
import { UserStore } from './user.store';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [UserStore, BookMarkStore],
  exports: [UserStore, BookMarkStore],
})
export class CoreModule {}
