import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import type { TLoginUser } from "../../types/auth.type";
import { JwtUtils } from "../../utils/jwt";

const loginUser = async (payload: TLoginUser) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error("User does not exist");
    };

    if (user.isBlocked) {
        throw new Error("This user is blocked");
    };

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Invalid credentials");
    };

    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
    };

    const accessToken = JwtUtils.createToken(jwtPayload, config.accessSecret, config.accessExpiresIn);

    const refreshToken = JwtUtils.createToken(jwtPayload, config.refreshSecret, config.refreshExpiresIn);

    const {password: _, ...userWithoutPassword} = user;

    return {
        accessToken,
        refreshToken,
        user: userWithoutPassword
    }
}

export const AuthServices = {
    loginUser
}