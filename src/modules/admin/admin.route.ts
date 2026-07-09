import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.get("/users", auth(UserRole.ADMIN), AdminControllers.getUsers);

router.patch("/users/:id", auth(UserRole.ADMIN), AdminControllers.updateUserStatus);

router.get("/properties", auth(UserRole.ADMIN), AdminControllers.getProperties);

router.get("/rentals", auth(UserRole.ADMIN), AdminControllers.getRentals);


export const AdminRoutes = router;