import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import type { TLoginUser, TRegisterUser } from "../../types/auth.type";
import { JwtUtils } from "../../utils/jwt";
import GlobalError from "../../error/globalError";
import httpStatus from "http-status";

const registerUser = async (payload: TRegisterUser) => {
    const { name, email, password, role } = payload;

    const isUserExist = await prisma.user.findUnique({
        where: { email }
    });

    if (isUserExist) {
        throw new GlobalError(httpStatus.CONFLICT, "User already exists");
    };

    const hashedPassword = await bcrypt.hash(password, Number(config.salt_round));

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        },
        omit: {
            password: true
        }
    });

    return {
        user
    };

};


const loginUser = async (payload: TLoginUser) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new GlobalError(httpStatus.NOT_FOUND, "User does not exist");
    };

    if (user.isBlocked) {
        throw new GlobalError(httpStatus.FORBIDDEN, "This user is blocked");
    };

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new GlobalError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    };

    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
    };

    const accessToken = JwtUtils.createToken(jwtPayload, config.accessSecret, config.accessExpiresIn);

    const refreshToken = JwtUtils.createToken(jwtPayload, config.refreshSecret, config.refreshExpiresIn);

    const { password: _, ...userWithoutPassword } = user;

    return {
        accessToken,
        refreshToken,
        user: userWithoutPassword
    }
}

const getMe = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        omit: {
            password: true
        }
    });

    if (!user) {
        throw new GlobalError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
}

export const AuthServices = {
    registerUser,
    loginUser,
    getMe
}