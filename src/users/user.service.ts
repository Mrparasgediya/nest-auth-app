import { Injectable, NotFoundException } from '@nestjs/common';
import { UserStore } from 'src/core/user.store';
import UserEntity from './user.entity';

@Injectable()
export default class UserService {
  constructor(private readonly usersStore: UserStore) {}

  private getUserForPayload(user: UserEntity) {
    return { id: user.id, email: user.email };
  }

  getAllUsers() {
    return this.usersStore
      .getUsers()
      .map((user) => this.getUserForPayload(user));
  }
  getUserById(id: string) {
    const foundUser = this.usersStore.findUserById(id);
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    return this.getUserForPayload(foundUser);
  }
}
