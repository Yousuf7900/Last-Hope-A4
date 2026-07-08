import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const register = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.registerUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: result
    })
});

export const UserControllers = {
    register,
}