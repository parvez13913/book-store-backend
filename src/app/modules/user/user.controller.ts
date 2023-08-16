/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ICreateUserResponse } from './user.interface';
import { UserService } from './user.service';
import config from '../../../config';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await UserService.createUser(user);

  //cookie options for extra security
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  //set refreshtoken into cookie
  res.cookie('refreshToken', result.refreshToken, cookieOptions);

  sendResponse<ICreateUserResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User created successfully`,
    data: result,
  });
});

export const UserController = {
  createUser,
};
