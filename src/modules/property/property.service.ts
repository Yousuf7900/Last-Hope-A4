import GlobalError from "../../error/globalError";
import { prisma } from "../../lib/prisma";
import type { TPropertyQuery } from "../../types/property.type";
import httpStatus from "http-status";
const getAllPropertiesFromDB = async (query: TPropertyQuery) => {

    const { location, type, minPrice, maxPrice } = query;

    const where: any = {};

    if (location) {
        where.location = {
            contains: location,
            mode: "insensitive"
        };
    }

    if (type) {
        where.category = {
            name: {
                equals: type,
                mode: "insensitive"
            }
        };
    }

    if (minPrice || maxPrice) {

        where.rentAmount = {};

        if (minPrice) {
            where.rentAmount.gte = Number(minPrice);
        }

        if (maxPrice) {
            where.rentAmount.lte = Number(maxPrice);
        }
    }

    const properties = await prisma.property.findMany({
        where,
        include: {
            category: true,
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return properties;
};

const getSinglePropertyFromDB = async (propertyId: string) => {

    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        },
        include: {
            category: true,
            landlord: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });

    if (!property) {
        throw new GlobalError(httpStatus.NOT_FOUND, "Property not found");
    }

    return property;
};

export const PropertyServices = {
    getAllPropertiesFromDB,
    getSinglePropertyFromDB
};