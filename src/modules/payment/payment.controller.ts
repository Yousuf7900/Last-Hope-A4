import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import Stripe from "stripe";
import config from "../../config";

const createPayment = catchAsync(async (req: Request, res: Response) => {
    const tenantId = req.user!.userId;

    const result = await PaymentServices.createPayment(tenantId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Checkout session created successfully",
        data: result
    })
})

const confirmPayment = catchAsync(async (req: Request, res: Response) => {

    const signature = req.headers["stripe-signature"] as string;

    const event = Stripe.webhooks.constructEvent(
        req.body,
        signature,
        config.stripe_webhook_secret_key
    );

    await PaymentServices.confirmPayment(event);

    res.status(httpStatus.OK).json({
        received: true
    });

});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {

    const tenantId = req.user!.userId;

    const result = await PaymentServices.getMyPayments(tenantId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payments retrieved successfully",
        data: result
    });

});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {

    const tenantId = req.user!.userId;

    const paymentId = req.params.id as string;

    const result = await PaymentServices.getPaymentById(
        tenantId,
        paymentId
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment retrieved successfully",
        data: result
    });

});

export const PaymentControllers = {
    createPayment,
    confirmPayment,
    getMyPayments,
    getPaymentById
}