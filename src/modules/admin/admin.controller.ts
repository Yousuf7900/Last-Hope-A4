import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AdminServices } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getUsers = catchAsync(async (req: Request, res: Response) => {

    const result = await AdminServices.getUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: result
    });

});


export const AdminControllers = {
    getUsers,
}