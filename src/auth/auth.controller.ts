import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('/auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUpUser(@Body() authData: AuthDTO) {
    return this.authService.signupUser(authData);
  }

  @Post('/signin')
  signInUser(@Body() authData: AuthDTO) {
    return this.authService.signInUser(authData);
  }
}
