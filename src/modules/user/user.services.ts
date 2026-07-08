import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import type { TRegisterUser } from "../../types/auth.type";

const registerUser = async (payload: TRegisterUser) => {
    const { name, email, password, role } = payload;

    const isUserExist = await prisma.user.findUnique({
        where: { email }
    });

    if (isUserExist) {
        throw new Error("User already exists");
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

export const UserServices = {
    registerUser,
}