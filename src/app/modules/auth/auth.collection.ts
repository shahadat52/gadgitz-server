import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';
import { authServices } from './auth.service';


const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.createUserInDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  })
});


const login = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is logged successfully',
    token: result.accessToken,
    data: result.data,
  });
});


export const authCollections = {
  createUser,
  login
};
