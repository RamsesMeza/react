import { AuthProvider } from '../../users/enums/auth-provider.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  providers: AuthProvider[];
}
