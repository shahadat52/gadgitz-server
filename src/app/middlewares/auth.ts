import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appErrors';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../modules/User/user.model';
const auth = (...requireRole: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const headers = req?.headers?.authorization?.split(' ') as string[];
        // console.log(headers);
        if (!headers) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'This user is unauthorized!! Please set Headers',
            );
        }

        const token = headers[1] || req?.headers?.authorization;
        if (!token) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'This user is unauthorized!! Please login and collect token',
            );
        }

        let decoded;
        try {
            decoded = jwt.verify(
                token,
                config.secret_key as string,
            ) as JwtPayload;

        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
        }

        const { id } = decoded;
        //start\\

        const user = await UserModel.findById(id);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not available');
        };

        //end\\

        jwt.verify(token, config.secret_key as string, function (err, decoded) {
            if (err) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'User is Unauthorized');
            }
            const { role } = decoded as JwtPayload;
            if (requireRole && !requireRole.includes(role)) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'User is Unauthorized cz you have no role');
            }
            req.user = decoded as JwtPayload;
            next();
        });
    });
};

export default auth;
