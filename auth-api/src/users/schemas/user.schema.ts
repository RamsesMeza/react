import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthProvider } from '../enums/auth-provider.enum';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true, trim: true, minlength: 2, maxlength: 80 })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  email: string;

  @Prop({
    type: [String],
    enum: Object.values(AuthProvider),
    default: [AuthProvider.LOCAL],
  })
  providers: AuthProvider[];

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  passwordHash?: string;

  @Prop({ index: true, sparse: true })
  googleId?: string;

  @Prop()
  avatarUrl?: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
