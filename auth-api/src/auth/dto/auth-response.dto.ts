import { PublicUser } from '../../users/types/public-user.type';

export class AuthResponseDto {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  user: PublicUser;
}
