import type { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



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

export const AuthControllers = {
    login
}