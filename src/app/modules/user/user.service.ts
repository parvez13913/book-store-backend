import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICreateUserResponse, IUser } from './user.interface';
import { User } from './user.model';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';

const createUser = async (payload: IUser): Promise<ICreateUserResponse> => {
  const { email } = payload;
  //checking wheater the updated data is emty object or not
  if (!Object.keys(payload).length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You did not enter anything !');
  }

  const result = await User.create(payload);

  //check whetehr the user exist or not
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist !');
  }

  const { email: userEmail } = payload;
  const { _id: userId } = isUserExist;
  //create access token
  const accessToken = JwtHelpers.createToken(
    { userEmail, userId },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  //create refresh token
  const refreshToken = JwtHelpers.createToken(
    { userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    result,
  };
};

export const UserService = {
  createUser,
};
