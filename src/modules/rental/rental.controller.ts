import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RentalServices } from "./rental.service";

const createRental = catchAsync(async (req: Request, res: Response) => {

    const tenantId = req.user!.userId;

    const result = await RentalServices.createRental(
        tenantId,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Rental request submitted successfully",
        data: result
    });

});

const getMyRentals = catchAsync() => {

}

const getRentalById = catchAsync() => {

}

export const RentalControllers = {
    createRental,
    getMyRentals,
    getRentalById
};