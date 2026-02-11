import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth-response.dto';
import { GoogleMobileAuthDto } from './dto/google-mobile-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { AuthenticatedUser } from './interfaces/authenticated-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('google/mobile')
  authenticateWithGoogleMobile(
    @Body() googleMobileAuthDto: GoogleMobileAuthDto,
  ): Promise<AuthResponseDto> {
    return this.authService.authenticateWithGoogleMobile(googleMobileAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() authenticatedUser: AuthenticatedUser) {
    return this.authService.getProfile(authenticatedUser.userId);
  }
}
