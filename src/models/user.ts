import { IUser } from '@/interfaces/IUser';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String,

    salt: String,

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

const model = mongoose.model<IUser & mongoose.Document>('User', UserSchema);

const UserModel = {
  name: 'UserModel',
  model
}

export default UserModel
