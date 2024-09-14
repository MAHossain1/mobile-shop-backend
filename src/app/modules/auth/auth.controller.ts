/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';
// import AppError from '../../errors/AppError';
// import { JwtPayload } from 'jsonwebtoken';

// function isJwtPayload(user: any): user is JwtPayload {
//   return user !== null && typeof user === 'object';
// }

const LoginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.LoginUser(req.body);

  const { refreshToken, accessToken, data } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Successfully Logged in.',
    data: { accessToken, data },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;

  // Use the type guard function to ensure req.user is a valid JwtPayload
  //   console.log(req.user);
  // if (!isJwtPayload(req.user)) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  // }

  const { userEmail } = req.user!;

  const result = await AuthServices.changePassword(userEmail, passwordData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password updated successfully!',
    data: result,
  });
});

export const AuthControllers = {
  LoginUser,
  changePassword,
};
