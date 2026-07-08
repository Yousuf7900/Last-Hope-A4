import { Router, type Request, type Response } from "express";
import { AuthControllers } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";


const router = Router();

router.post("/register", AuthControllers.register);
router.post("/login", AuthControllers.login);
router.get("/me", auth(), AuthControllers.getMe);


export const AuthRoutes = router;