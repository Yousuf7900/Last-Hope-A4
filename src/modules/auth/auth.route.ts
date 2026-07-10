import { Router, type Request, type Response } from "express";
import { AuthControllers } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";


const router = Router();

router.post("/register", validateRequest(AuthValidation.registerUserValidation), AuthControllers.register);
router.post("/login", validateRequest(AuthValidation.loginValidation), AuthControllers.login);
router.get("/me", auth(), AuthControllers.getMe);
router.patch("/me", auth(), validateRequest(AuthValidation.updateProfileValidation), AuthControllers.updateMe);


export const AuthRoutes = router;