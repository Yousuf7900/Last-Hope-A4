import type { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";

const register = async (req: Request, res: Response) => {
    const result = await AuthServices.registerUser(req.body);

    res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: result
    })
}

const login = async (req: Request, res: Response) => {

}

export const AuthControllers = {
    register,
    login
}