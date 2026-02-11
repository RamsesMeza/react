import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthProvider } from './enums/auth-provider.enum';
import { User, UserDocument } from './schemas/user.schema';
import { PublicUser } from './types/public-user.type';

type CreateLocalUserInput = {
  fullName: string;
  email: string;
  passwordHash: string;
};

type CreateGoogleUserInput = {
  fullName: string;
  email: string;
  googleId: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({ email: this.normalizeEmail(email) })
      .exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return this.userModel.findById(id).exec();
  }

  async createLocalUser(input: CreateLocalUserInput): Promise<UserDocument> {
    const user = new this.userModel({
      fullName: input.fullName.trim(),
      email: this.normalizeEmail(input.email),
      providers: [AuthProvider.LOCAL],
      passwordHash: input.passwordHash,
      isEmailVerified: false,
    });

    return user.save();
  }

  async createGoogleUser(input: CreateGoogleUserInput): Promise<UserDocument> {
    const user = new this.userModel({
      fullName: input.fullName.trim(),
      email: this.normalizeEmail(input.email),
      providers: [AuthProvider.GOOGLE],
      googleId: input.googleId,
      avatarUrl: input.avatarUrl,
      isEmailVerified: input.isEmailVerified,
    });

    return user.save();
  }

  async save(user: UserDocument): Promise<UserDocument> {
    return user.save();
  }

  toPublicUser(user: UserDocument): PublicUser {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      providers: [...user.providers],
      isEmailVerified: user.isEmailVerified,
      avatarUrl: user.avatarUrl,
    };
  }

  normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
