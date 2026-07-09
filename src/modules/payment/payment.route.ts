import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import { PaymentControllers } from "./payment.controller";
import { auth } from "../../middlewares/auth";


const router = Router();

router.post("/create", auth(UserRole.TENANT), PaymentControllers.createPayment);

export const PaymentRoutes = router;