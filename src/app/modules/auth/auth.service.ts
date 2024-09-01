import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { UserModel } from "../User/user.model";

const loginUser = async (payload: TLoginUser) => {

  const user = await UserModel.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not registered');
  }
  const hashPassword = user.password;

  const isPasswordMatch = await bcrypt.compare(payload.password, hashPassword as string)
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password is wrong');
  }


  const jwtPayload = {
    id: user?.id,
    name: user.name,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.secret_key as string,
    { expiresIn: config.expire_time },
  );


  const data = await UserModel.findOne({ email: payload?.email }).select('-password');
  return {
    accessToken,
    data
  };
};

export const authServices = {
  loginUser
}


