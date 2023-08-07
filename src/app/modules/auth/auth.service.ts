import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser, IRefreshTokenResponse } from './auth.interface';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { IUser } from '../user/user.interface';

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  if (
    isUserExist?.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
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
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifiedToken(
      token,
      config.jwt.jwt_refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh token');
  }

  const { userId } = verifiedToken;
  const currentUser = (await User.findById(userId)) as IUser;

  const { email } = currentUser;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.FORBIDDEN, 'User does not exist');
  }
  const { _id, email: currentEmail } = isUserExist;

  const newAccessToken = JwtHelpers.createToken(
    { _id, currentEmail },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
