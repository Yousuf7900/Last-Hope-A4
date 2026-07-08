import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { auth } from "../../middlewares/auth";


const router = Router();

router.post("/register", AuthControllers.register);
router.post("/login", AuthControllers.login);
router.get("/me", auth(), AuthControllers.getMe);


export const AuthRoutes = router;