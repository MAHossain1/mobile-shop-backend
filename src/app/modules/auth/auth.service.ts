import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import bcrypt from 'bcrypt';

const LoginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  // Whether the user exists or not.
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isPasswordMatch = await User.isPasswordMatch(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Your password is incorrect!');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role ?? 'user',
  };

  // create  accessToken
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string
  );

  // generate refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    data: user,
  };
};

const changePassword = async (
  userEmail: string,
  payload: { oldPassword: string; newPassword: string }
) => {
  //   console.log(userData);
  const user = await User.isUserExistsByEmail(userEmail);
  //   console.log('user from controller', user);

  // Whether the user exists or not.
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  //   const isPasswordMatch = await User.isPasswordMatch(
  //     payload?.oldPassword,
  //     user?.password
  //   );

  //   if (!isPasswordMatch) {
  //     throw new AppError(httpStatus.BAD_REQUEST, 'Your password is incorrect!');
  //   }

  //checking if the password is correct
  if (!(await User.isPasswordMatch(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcyrpt_salt_rounds)
  );

  const result = await User.findOneAndUpdate(
    {
      email: userEmail,
      role: user.role,
    },
    {
      password: newHashedPassword,
    }
  );

  return result;
};

export const AuthServices = {
  LoginUser,
  changePassword,
};
