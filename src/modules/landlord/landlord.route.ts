import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { LandlordControllers } from "./landlord.controller";


const router = Router();


router.post("/properties", auth(UserRole.LANDLORD), LandlordControllers.createProperty);

router.put("/properties/:id", auth(UserRole.LANDLORD), LandlordControllers.updateProperty);

router.delete("/properties/:id", auth(UserRole.LANDLORD), LandlordControllers.deleteProperty);

router.get("/requests", auth(UserRole.LANDLORD), LandlordControllers.getRentalRequests);

router.patch("/requests/:id", auth(UserRole.LANDLORD), LandlordControllers.updateRentalRequest);

export const LandlordRoutes = router;