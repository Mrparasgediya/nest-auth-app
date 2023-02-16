import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import JwtPayload from 'src/auth/dto/jwt.payload.dto';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
