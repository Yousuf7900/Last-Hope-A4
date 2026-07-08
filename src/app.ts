import cookieParser from "cookie-parser";
import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import httpStatus from "http-status";
import { AuthRoutes } from "./modules/auth/auth.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { PropertyRoutes } from "./modules/property/property.route";
import { LandlordRoutes } from "./modules/landlord/landlord.route";
import { RentalRoutes } from "./modules/rental/rental.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "API is up and running"
    });
});


app.use("/api/v1/auth", AuthRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/properties", PropertyRoutes);
app.use("/api/v1/landlord", LandlordRoutes);
app.use("/api/v1/rentals", RentalRoutes);

export default app;