import UserEntity from 'src/users/user.entity';

export class UserStore {
  private users: UserEntity[];

  constructor() {
    this.users = [];
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
