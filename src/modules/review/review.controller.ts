import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {

    const tenantId = req.user!.userId;

    const result = await ReviewServices.createReview(
        tenantId,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review submitted successfully",
        data: result
    });

});

export const ReviewControllers = {
    createReview
};