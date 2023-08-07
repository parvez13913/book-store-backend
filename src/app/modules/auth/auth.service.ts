import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  if (
    isUserExist?.password &&
    (await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { _id: userId, email: userEmail } = isUserExist;

  const accessToken = JwtHelpers.createToken(
    { userId, userEmail },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string,
  );

  const refreshToken = JwtHelpers.createToken(
    { userId, userEmail },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
