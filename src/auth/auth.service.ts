import { BadRequestException, Injectable } from '@nestjs/common';
import { UserStore } from 'src/core/user.store';
import { AuthDTO } from './dto/auth.dto';
import { compareSync, hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import UserEntity from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userStore: UserStore,
    private readonly jwtService: JwtService,
  ) {}

  signupUser(authData: AuthDTO) {
    const { email, password } = authData;

    const foundUserWithEmail = this.userStore.findUserByEmail(email);
    if (foundUserWithEmail) {
      throw new BadRequestException('Entered email is already exists!');
    }

    const hashedPassword = hashSync(password, 10);
    const newUser: UserEntity = {
      id: randomUUID(),
      email,
      password: hashedPassword,
    };
    this.userStore.addUser(newUser);

    return {
      id: newUser.id,
      email,
    };
  }

  signInUser(authData: AuthDTO) {
    const { email, password } = authData;

    const foundUser = this.userStore.findUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestException('Invalid Email!');
    }
    if (!compareSync(password, foundUser.password)) {
      throw new BadRequestException('Invalid Password!');
    }
    const accessToken = this.jwtService.sign({ id: foundUser.id });

    return { accessToken };
  }
}
