import type { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import AppError from "../error/globalError";

export const globalErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {

    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong";
    let errorDetails: unknown = null;

    if (err instanceof ZodError) {

        let statusCode: number = httpStatus.BAD_REQUEST;
        message = "Validation Error";

        errorDetails = err.issues.map(issue => ({
            path: issue.path.join("."),
            message: issue.message
        }));

    }

    else if (err instanceof AppError) {

        let statusCode: number = err.statusCode;
        message = err.message;

    }

    else if (err instanceof Error) {

        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorDetails
    });

};