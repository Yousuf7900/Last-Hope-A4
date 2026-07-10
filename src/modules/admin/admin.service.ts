import GlobalError from "../../error/globalError";
import { prisma } from "../../lib/prisma";
import type { TCategory, TUpdateUserStatus } from "./admin.interface";
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
        throw new GlobalError(httpStatus.BAD_REQUEST, "You cannot update your own account.");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new GlobalError(httpStatus.NOT_FOUND, "User not found");
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

const createCategory = async (payload: TCategory) => {

    const categoryExists = await prisma.category.findUnique({
        where: {
            name: payload.name
        }
    });

    if (categoryExists) {
        throw new GlobalError(
            httpStatus.CONFLICT, "Category already exists"
        );
    }

    const category = await prisma.category.create({
        data: {
            name: payload.name
        }
    });

    return category;
};

const updateCategory = async (
    categoryId: string,
    payload: TCategory
) => {

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    });

    if (!category) {
        throw new GlobalError(
            httpStatus.NOT_FOUND, "Category not found"
        );
    }

    const duplicate = await prisma.category.findFirst({
        where: {
            name: payload.name,
            NOT: {
                id: categoryId
            }
        }
    });

    if (duplicate) {
        throw new GlobalError(
            httpStatus.CONFLICT, "Category already exists"
        );
    }

    const updatedCategory = await prisma.category.update({
        where: {
            id: categoryId
        },
        data: {
            name: payload.name
        }
    });

    return updatedCategory;
};

const deleteCategory = async (categoryId: string) => {

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        },
        include: {
            properties: true
        }
    });

    if (!category) {
        throw new GlobalError(
            httpStatus.NOT_FOUND, "Category not found"
        );
    }

    if (category.properties.length > 0) {
        throw new GlobalError(
            httpStatus.BAD_REQUEST, "Category cannot be deleted because it is assigned to properties"
        );
    }

    await prisma.category.delete({
        where: {
            id: categoryId
        }
    });

    return null;
};


export const AdminServices = {
    getUsers,
    updateUserStatus,
    getProperties,
    getRentals,
    createCategory,
    updateCategory,
    deleteCategory,
}