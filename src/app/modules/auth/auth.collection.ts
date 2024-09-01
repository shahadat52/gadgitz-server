import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import { RequestHandler } from 'express';

const login: RequestHandler = catchAsync(async (req, res) => {
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
  login
};
