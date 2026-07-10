import type { UserRole } from "../../../generated/prisma/enums";


export type TRegisterUser = {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export type TLoginUser = {
    email: string;
    password: string;
}

export type TUpdateProfile = {
    name?: string;
    password?: string;
}