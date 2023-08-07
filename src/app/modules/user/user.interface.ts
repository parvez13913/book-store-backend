/* eslint-disable no-unused-vars */
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

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<
    Pick<IUser, 'name' | 'email' | 'password'> & { _id: string }
  > | null;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
