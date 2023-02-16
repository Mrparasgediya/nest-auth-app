import { Module } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
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
  providers: [AuthService, JwtAuthStrategy],
})
export default class AuthModule {}
