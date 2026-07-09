import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { ReviewControllers } from "./review.controller";

const router = Router();

router.post("/", auth(UserRole.TENANT), ReviewControllers.createReview);

export const ReviewRoutes = router;