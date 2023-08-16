/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ICreateUserResponse = {
  accessToken: string;
  refreshToken: string;
  result: IUser;
};

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, 'email' | 'password'> & { _id: string }> | null;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
