import { UserRole } from "../../../generated/prisma/enums";
import { z } from "zod";

const registerUserValidation = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),

    email: z.string().email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    role: z.enum(UserRole)
});

const loginValidation = z.object({
    email: z.string().email("Invalid email address"),

    password: z.string().min(1, "Password is required")
});

const updateProfileValidation = z.object({

    name: z.string().min(2).max(100).optional(),

    password: z.string().min(6).optional()

});

export const AuthValidation = {
    registerUserValidation,
    loginValidation,
    updateProfileValidation
};