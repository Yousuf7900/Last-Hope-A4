import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { AdminControllers } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = Router();

router.get("/users", auth(UserRole.ADMIN), AdminControllers.getUsers);

router.patch("/users/:id", auth(UserRole.ADMIN), AdminControllers.updateUserStatus);

router.get("/properties", auth(UserRole.ADMIN), AdminControllers.getProperties);

router.get("/rentals", auth(UserRole.ADMIN), AdminControllers.getRentals);

router.post("/categories", auth(UserRole.ADMIN), validateRequest(AdminValidation.createCategoryValidation), AdminControllers.createCategory);

router.patch("/categories/:id", auth(UserRole.ADMIN), validateRequest(AdminValidation.updateCategoryValidation), AdminControllers.updateCategory);

router.delete("/categories/:id", auth(UserRole.ADMIN), AdminControllers.deleteCategory);


export const AdminRoutes = router;