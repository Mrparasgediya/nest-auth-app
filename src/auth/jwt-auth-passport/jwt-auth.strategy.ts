import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import JwtPayload from '../dto/jwt.payload.dto';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(payload: any) {
    return plainToClass(JwtPayload, payload, {
      excludeExtraneousValues: true,
    });
  }
}
