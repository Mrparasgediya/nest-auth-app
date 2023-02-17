import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { compareSync, hashSync } from 'bcrypt';
import PrismaService from 'src/prisma/prisma.service';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signupUser(authData: AuthDTO) {
    const { email, password } = authData;

    const foundUserWithEmail = await this.prismaService.user.findFirst({
      where: { email },
    });
    if (foundUserWithEmail) {
      throw new BadRequestException('Entered email is already exists!');
    }

    const hashedPassword = hashSync(password, 10);
    return this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async signInUser(authData: AuthDTO) {
    const { email, password } = authData;

    const foundUser = await this.prismaService.user.findFirst({
      where: { email },
    });
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
