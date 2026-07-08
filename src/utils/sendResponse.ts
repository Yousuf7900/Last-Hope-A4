import type { Response } from "express";

type TResponse<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
};

export const sendResponse = <T>(
    res: Response,
    responseData: TResponse<T>
) => {
    return res.status(responseData.statusCode).json({
        success: responseData.success,
        statusCode: responseData.statusCode,
        message: responseData.message,
        data: responseData.data
    });
};