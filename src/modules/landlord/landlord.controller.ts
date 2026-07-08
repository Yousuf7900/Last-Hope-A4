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


const updateProperty = catchAsync(async (req: Request, res: Response) => {

    const landlordId = req.user!.userId;

    const propertyId = req.params.id as string;

    const result = await LandlordServices.updateProperty(
        landlordId,
        propertyId,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property updated successfully",
        data: result
    });

});


const deleteProperty = catchAsync(async (req: Request, res: Response) => {

    const landlordId = req.user!.userId;

    const propertyId = req.params.id as string;

    await LandlordServices.deleteProperty(
        landlordId,
        propertyId
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property deleted successfully",
        data: null
    });

});

export const LandlordControllers = {
    createProperty,
    updateProperty,
    deleteProperty,
}