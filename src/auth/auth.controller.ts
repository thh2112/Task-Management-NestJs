import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { Authenticated } from '@shared/decorators';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Request() { payload }) {
    const result = await this.authService.login(payload);
    const response: ApiResponse = {
      isSuccess: true,
      message: 'Login successfully',
      result,
    };

    return response;
  }

  @Post('/sign-up')
  async signUp(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    const response: ApiResponse = {
      isSuccess: true,
      message: 'Created user successfully',
      result,
    };

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Authenticated() payload) {
    const result = await this.authService.profile(payload);
    const response: ApiResponse = {
      isSuccess: true,
      message: 'Get profile successfully',
      result,
    };

    return response;
  }

  @Post('forgot-password')
  async forgotPassword() {}

  @Post('reset-password')
  async resetPassword() {}
}
