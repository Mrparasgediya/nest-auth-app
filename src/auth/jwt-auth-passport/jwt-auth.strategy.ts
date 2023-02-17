import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import PrismaService from 'src/prisma/prisma.service';
import JwtPayload from '../dto/jwt.payload.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(payload: any) {
    const { id } = payload;
    const foundUser = await this.prismaService.user.findFirst({
      where: { id },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    return plainToClass(JwtPayload, payload, {
      excludeExtraneousValues: true,
    });
  }
}
