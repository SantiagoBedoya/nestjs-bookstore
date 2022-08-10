import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, UserStatus } from '../types';

export type UserDocument = Document & User;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({
    unique: true,
    lowercase: true,
  })
  email: string;
  @Prop()
  password: string;
  @Prop({
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: string;
  @Prop({
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
