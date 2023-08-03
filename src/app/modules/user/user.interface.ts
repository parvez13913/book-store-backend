import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IUser = {
  name: UserName;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
