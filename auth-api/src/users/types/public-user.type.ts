import { AuthProvider } from '../enums/auth-provider.enum';

export type PublicUser = {
  id: string;
  fullName: string;
  email: string;
  providers: AuthProvider[];
  isEmailVerified: boolean;
  avatarUrl?: string;
};
