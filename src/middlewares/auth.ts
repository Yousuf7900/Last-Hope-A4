import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { JwtUtils } from "../utils/jwt";
import config from "../config";
import type { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";


declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                role: UserRole;
            };
        }
    }
}

export const auth = (...requiredRoles: UserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : req.headers.authorization;

        if (!token) {
            throw new Error("You are not logged in.");
        }

        const verifiedToken = JwtUtils.verifyToken(token, config.accessSecret) as JwtPayload;

        const { userId, email, role } = verifiedToken;

        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("You are not authorized.");
        };

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error("User not found.");
        }
        if (user.isBlocked) {
            throw new Error("This user is blocked.");
        }

        req.user = {
            userId,
            email,
            role
        }

        next();
    });
};