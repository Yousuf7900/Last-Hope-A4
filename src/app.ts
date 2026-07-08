import cookieParser from "cookie-parser";
import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import httpStatus from "http-status";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "API is up and running"
    });
})

export default app;