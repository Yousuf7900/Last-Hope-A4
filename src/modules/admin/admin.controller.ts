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

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {

    const adminId = req.user!.userId;

    const userId = req.params.id as string;

    const result = await AdminServices.updateUserStatus(
        adminId,
        userId,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User status updated successfully",
        data: result
    });

});

const getProperties = catchAsync(async (req: Request, res: Response) => {

    const result = await AdminServices.getProperties();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrieved successfully",
        data: result
    });

});

const getRentals = catchAsync(async (req: Request, res: Response) => {

    const result = await AdminServices.getRentals();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rentals retrieved successfully",
        data: result
    });

});


export const AdminControllers = {
    getUsers,
    updateUserStatus,
    getProperties,
    getRentals,
}