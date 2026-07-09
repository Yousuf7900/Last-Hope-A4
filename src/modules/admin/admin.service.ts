import GlobalError from "../../error/globalError";
import { prisma } from "../../lib/prisma";
import type { TUpdateUserStatus } from "./admin.interface";
import httpStatus from "http-status"

const getUsers = async () => {

    const users = await prisma.user.findMany({
        omit: {
            password: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return users;
};

const updateUserStatus = async (
    adminId: string,
    userId: string,
    payload: TUpdateUserStatus
) => {

    if (adminId === userId) {
        throw new GlobalError(httpStatus.BAD_REQUEST,"You cannot update your own account.");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new GlobalError(httpStatus.NOT_FOUND,"User not found");
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            isBlocked: payload.isBlocked
        },
        omit: {
            password: true
        }
    });

    return updatedUser;
};

const getProperties = async () => {

    const properties = await prisma.property.findMany({
        include: {
            category: true,
            landlord: {
                omit: {
                    password: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return properties;
};

const getRentals = async () => {

    const rentals = await prisma.rental.findMany({
        include: {
            tenant: {
                omit: {
                    password: true
                }
            },
            property: {
                include: {
                    category: true,
                    landlord: {
                        omit: {
                            password: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return rentals;
};


export const AdminServices = {
    getUsers,
    updateUserStatus,
    getProperties,
    getRentals,
}