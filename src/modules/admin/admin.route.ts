import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.get("/users", auth(UserRole.ADMIN), AdminControllers.getUsers);


export const AdminRoutes = router;