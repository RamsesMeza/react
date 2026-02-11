import { AuthProvider } from '../../users/enums/auth-provider.enum';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  providers: AuthProvider[];
}
