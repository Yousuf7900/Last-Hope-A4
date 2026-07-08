import { prisma } from "../../lib/prisma";
import type { TCreateProperty, TUpdateProperty } from "./landlord.interface";


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


const updateProperty = async (landlordId: string, propertyId: string, payload: TUpdateProperty) => {

    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    });

    if (!property) {
        throw new Error("Property not found");
    }

    if (property.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this property");
    }

    if (payload.categoryId) {
        const category = await prisma.category.findUnique({
            where: {
                id: payload.categoryId
            }
        });

        if (!category) {
            throw new Error("Category not found");
        }
    }

    const updatedProperty = await prisma.property.update({
        where: {
            id: propertyId
        },
        data: payload,
        include: {
            category: true,
            landlord: {
                omit: {
                    password: true
                }
            }
        }
    });

    return updatedProperty;
};


const deleteProperty = async (landlordId: string, propertyId: string) => {

    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    });

    if (!property) {
        throw new Error("Property not found");
    }

    if (property.landlordId !== landlordId) {
        throw new Error("You are not authorized to delete this property");
    }

    await prisma.property.delete({
        where: {
            id: propertyId
        }
    });

    return null;
};


export const LandlordServices = {
    createProperty,
    updateProperty,
    deleteProperty
}