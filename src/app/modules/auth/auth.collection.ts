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
  // const { refreshToken } = result;
  // res.cookie('refreshToken', refreshToken, {
  //   httpOnly: true,
  //   secure: config.node_env === 'production',
  // });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is logged successfully',
    token: result.accessToken,
    data: result.data,
  });
});

// const changePassword = catchAsync(async (req, res) => {
//   const { ...passwordData } = req.body;
//   const result = await authServices.changePasswordInDB(req.user, passwordData);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Password change successfully',
//     data: result,
//   });
// });

// const refreshToken = catchAsync(async (req, res) => {
//   const result = await authServices.refreshTokenFromDB(req.cookies);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Refresh token retrieved successfully',
//     data: result,
//   });
// });

// const forgetPassword = catchAsync(async (req, res) => {
//   const { id } = req.body;
//   const result = await authServices.forgetPasswordInDB(id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Reset link sent to email successfully',
//     data: result,
//   });
// });

// const resetPassword = catchAsync(async (req, res) => {
//   const token = req.headers.authorization;
//   const { newPassword } = req.body;
//   const result = await authServices.resetPasswordInDB(newPassword, token);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Password reset successfully',
//     data: result,
//   });
// });

export const authCollections = {
  createUser,
  login
};
