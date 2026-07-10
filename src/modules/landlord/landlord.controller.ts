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

const getRentalRequests = catchAsync(async (req: Request, res: Response) => {

    const landlordId = req.user!.userId;

    const result = await LandlordServices.getRentalRequests(landlordId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully",
        data: result
    });

});


const updateRentalRequest = catchAsync(async (req: Request, res: Response) => {

    const landlordId = req.user!.userId;

    const rentalId = req.params.id as string;

    const result = await LandlordServices.updateRentalRequest(
        landlordId,
        rentalId,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request updated successfully",
        data: result
    });

});

const getTenantHistory = catchAsync(async (req, res) => {

    const landlordId = req.user!.userId;

    const result = await LandlordServices.getTenantHistory(
        landlordId,
        req.params.tenantId as string
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Tenant history retrieved successfully",
        data: result
    });

});

export const LandlordControllers = {
    createProperty,
    updateProperty,
    deleteProperty,
    getRentalRequests,
    updateRentalRequest,
    getTenantHistory
}