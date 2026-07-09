import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import { PaymentControllers } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { PaymentValidation } from "./payment.validation";


const router = Router();

router.post("/create", auth(UserRole.TENANT), validateRequest(PaymentValidation.createPaymentValidation), PaymentControllers.createPayment);

router.get("/", auth(UserRole.TENANT), PaymentControllers.getMyPayments);

router.get("/:id", auth(UserRole.TENANT), PaymentControllers.getPaymentById);

export const PaymentRoutes = router;