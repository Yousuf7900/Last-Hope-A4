import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { RentalControllers } from "./rental.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { RentalValidation } from "./rental.validation";

const router = Router();

router.post("/", auth(UserRole.TENANT), validateRequest(RentalValidation.createRentalValidation), RentalControllers.createRental
);
router.get("/", auth(), RentalControllers.getMyRentals);
router.get("/:id", auth(), RentalControllers.getRentalById);

export const RentalRoutes = router;