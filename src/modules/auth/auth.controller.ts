import type { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.registerUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: result
    })
});

const login = catchAsync(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, user } = await AuthServices.loginUser(req.body);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: { accessToken, refreshToken, user }
    })
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.getMe(req.user!.userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile retrieved successfully",
        data: result
    });
});

const updateMe = catchAsync(async (req, res) => {

    const userId = req.user!.userId;

    const result = await AuthServices.updateMe(
        userId,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile updated successfully",
        data: result
    });

});

export const AuthControllers = {
    register,
    login,
    getMe,
    updateMe
}