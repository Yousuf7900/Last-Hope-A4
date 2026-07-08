import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { LandlordServices } from "./landlord.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProperty = catchAsync(async (req: Request, res: Response) => {
    const landlordId = req.user!.userId;

    const result = await LandlordServices.createProperty(landlordId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Property created successfully",
        data: result
    })
})

export const LandlordControllers = {
    createProperty,
}