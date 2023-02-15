import { Global, Module } from '@nestjs/common';
import { UserStore } from './user.store';

@Global()
@Module({
  providers: [UserStore],
  exports: [UserStore],
})
export class CoreModule {}
