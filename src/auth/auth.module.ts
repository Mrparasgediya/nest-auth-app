import { Module } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import PrismaService from 'src/prisma/prisma.service';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { JwtAuthStrategy } from './jwt-auth-passport/jwt-auth.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get('JWT_SECRET'),
          expiresIn: '60min',
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, PrismaService],
})
export default class AuthModule {}
