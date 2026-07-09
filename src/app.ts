import { globalErrorHandler } from "./middlewares/globalErrorHandler";
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
import config from "./config";
import { AdminRoutes } from "./modules/admin/admin.route";
import { PaymentRoutes } from "./modules/payment/payment.route";
import { PaymentControllers } from "./modules/payment/payment.controller";
import { ReviewRoutes } from "./modules/review/review.route";
import { notFound } from "./middlewares/notFound";

const app: Application = express();

app.post("/api/v1/payments/confirm", express.raw({ type: "application/json" }), PaymentControllers.confirmPayment)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.app_url,
    credentials: true
}));

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
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/payments", PaymentRoutes);
app.use("/api/v1/reviews", ReviewRoutes);

app.use(notFound);
app.use(globalErrorHandler);


export default app;