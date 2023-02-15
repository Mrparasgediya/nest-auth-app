import { Injectable } from '@nestjs/common';
import UserEntity from 'src/users/user.entity';

@Injectable()
export class UserStore {
  private users: UserEntity[];

  constructor() {
    this.users = [
      {
        id: '236ea4a6-e329-4ca8-9836-aeb15a3cffe4',
        email: 'john@gmail.com',
        password:
          '$2b$10$B3y0pLynLM7JXUp0X8UIm.8FH.gSqrzm61KxcxCSGFOEBhv3D1yCe',
      },
    ];
  }

  getUsers() {
    return this.users;
  }

  addUser(newUser: UserEntity) {
    this.users = this.users.concat([newUser]);
  }

  findUserById(id: string) {
    return this.users.find((currUser) => currUser.id === id);
  }
  findUserByEmail(email: string) {
    return this.users.find((currUser) => currUser.email === email);
  }
}
