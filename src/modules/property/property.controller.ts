import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PropertyServices } from "./property.service";

const getAllProperties = catchAsync(async (req: Request, res: Response) => {

    const result = await PropertyServices.getAllPropertiesFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrieved successfully",
        data: result
    });
});

const getSingleProperty = catchAsync(async (req: Request, res: Response) => {

    const result = await PropertyServices.getSinglePropertyFromDB(req.params.id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property retrieved successfully",
        data: result
    });
});

export const PropertyControllers = {
    getAllProperties,
    getSingleProperty
};