import { IUser } from '../../../../domain/dist/index.js';
import { Schema, model} from 'mongoose';

export const UserRole = {
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT'
}

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { type: String, UserRole },
});

export const UserModel = model<IUser>('User', userSchema);
