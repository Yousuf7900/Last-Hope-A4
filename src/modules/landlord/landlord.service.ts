import { prisma } from "../../lib/prisma";
import type { TCreateProperty } from "./landlord.interface";


const createProperty = async (landlordId: string, payload: TCreateProperty) => {
    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId
        }
    });

    if (!category) {
        throw new Error("Category not found");
    }

    const property = await prisma.property.create({
        data: {
            title: payload.title,
            description: payload.description,
            location: payload.description,
            address: payload.address,
            rentAmount: payload.rentAmount,
            bedrooms: payload.bedrooms,
            bathrooms: payload.bathrooms,
            landlordId,
            categoryId: payload.categoryId
        },
        include: {
            landlord: {
                omit: {
                    password: true
                }
            },
            category: true
        }
    });

    return property;
}


export const LandlordServices = {
    createProperty,
}