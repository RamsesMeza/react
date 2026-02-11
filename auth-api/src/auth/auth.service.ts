import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { AuthProvider } from '../users/enums/auth-provider.enum';
import { UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { GoogleMobileAuthDto } from './dto/google-mobile-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { getJwtExpirationInSeconds } from './utils/token-expiry.util';

@Injectable()
export class AuthService {
  private readonly googleClient = new OAuth2Client();
  private readonly googleAudience: string[];
  private readonly jwtExpiresIn: string | number;
  private readonly bcryptRounds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.googleAudience = this.getGoogleAudience();
    this.jwtExpiresIn =
      this.configService.get<string>('JWT_EXPIRES_IN') ?? '15m';
    this.bcryptRounds = this.getBcryptRounds();
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser?.providers.includes(AuthProvider.LOCAL)) {
      throw new ConflictException('Email is already registered');
    }

    if (!existingUser) {
      const passwordHash = await bcrypt.hash(
        registerDto.password,
        this.bcryptRounds,
      );
      const user = await this.usersService.createLocalUser({
        fullName: registerDto.fullName,
        email: registerDto.email,
        passwordHash,
      });

      return this.buildAuthResponse(user);
    }

    existingUser.fullName = registerDto.fullName;
    existingUser.passwordHash = await bcrypt.hash(
      registerDto.password,
      this.bcryptRounds,
    );

    if (!existingUser.providers.includes(AuthProvider.LOCAL)) {
      existingUser.providers.push(AuthProvider.LOCAL);
    }

    const updatedUser = await this.usersService.save(existingUser);

    return this.buildAuthResponse(updatedUser);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user);
  }

  async authenticateWithGoogleMobile(
    googleMobileAuthDto: GoogleMobileAuthDto,
  ): Promise<AuthResponseDto> {
    if (!this.googleAudience.length) {
      throw new InternalServerErrorException(
        'Google auth is not configured. Define GOOGLE_CLIENT_IDS.',
      );
    }

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: googleMobileAuthDto.idToken,
        audience: this.googleAudience,
      });

      const payload = ticket.getPayload();
      if (!payload?.email || !payload.sub) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      if (!payload.email_verified) {
        throw new UnauthorizedException('Google email is not verified');
      }

      const existingUser = await this.usersService.findByEmail(payload.email);
      const fullName =
        payload.name?.trim() || payload.email.split('@')[0] || 'User';

      if (!existingUser) {
        const newUser = await this.usersService.createGoogleUser({
          fullName,
          email: payload.email,
          googleId: payload.sub,
          avatarUrl: payload.picture,
          isEmailVerified: Boolean(payload.email_verified),
        });

        return this.buildAuthResponse(newUser);
      }

      existingUser.fullName = existingUser.fullName || fullName;
      existingUser.googleId = existingUser.googleId || payload.sub;
      existingUser.avatarUrl = existingUser.avatarUrl || payload.picture;
      existingUser.isEmailVerified =
        existingUser.isEmailVerified || Boolean(payload.email_verified);

      if (!existingUser.providers.includes(AuthProvider.GOOGLE)) {
        existingUser.providers.push(AuthProvider.GOOGLE);
      }

      const updatedUser = await this.usersService.save(existingUser);
      return this.buildAuthResponse(updatedUser);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Google token verification failed');
    }
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    return this.usersService.toPublicUser(user);
  }

  private async buildAuthResponse(
    user: UserDocument,
  ): Promise<AuthResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      providers: [...user.providers],
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: getJwtExpirationInSeconds(this.jwtExpiresIn),
      user: this.usersService.toPublicUser(user),
    };
  }

  private getGoogleAudience(): string[] {
    const rawAudience =
      this.configService.get<string>('GOOGLE_CLIENT_IDS') ??
      this.configService.get<string>('GOOGLE_CLIENT_ID') ??
      '';

    return rawAudience
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  private getBcryptRounds(): number {
    const rawRounds =
      this.configService.get<string>('BCRYPT_SALT_ROUNDS') ?? '12';
    const parsedRounds = Number.parseInt(rawRounds, 10);

    if (
      !Number.isFinite(parsedRounds) ||
      parsedRounds < 10 ||
      parsedRounds > 15
    ) {
      return 12;
    }

    return parsedRounds;
  }
}
