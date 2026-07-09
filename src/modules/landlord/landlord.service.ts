import { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import type { TCreateProperty, TUpdateProperty, TUpdateRentalStatus } from "./landlord.interface";


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
            location: payload.location,
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


const getRentalRequests = async (landlordId: string) => {

    const requests = await prisma.rental.findMany({
        where: {
            property: {
                landlordId
            }
        },
        include: {
            tenant: {
                omit: {
                    password: true
                }
            },
            property: {
                include: {
                    category: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return requests;
};


const updateRentalRequest = async (
    landlordId: string,
    rentalId: string,
    payload: TUpdateRentalStatus
) => {

    const rental = await prisma.rental.findUnique({
        where: {
            id: rentalId
        },
        include: {
            property: true
        }
    });

    if (!rental) {
        throw new Error("Rental request not found");
    }

    if (rental.property.landlordId !== landlordId) {
        throw new Error("You are not authorized");
    }

    if (rental.status !== RentalStatus.PENDING) {
        throw new Error("Rental request has already been processed");
    }

    if (
        payload.status !== RentalStatus.APPROVED &&
        payload.status !== RentalStatus.REJECTED
    ) {
        throw new Error("Status must be APPROVED or REJECTED");
    }

    const updatedRental = await prisma.rental.update({
        where: {
            id: rentalId
        },
        data: {
            status: payload.status
        },
        include: {
            tenant: {
                omit: {
                    password: true
                }
            },
            property: {
                include: {
                    category: true
                }
            }
        }
    });

    // if (payload.status === RentalStatus.APPROVED) {

    //     await prisma.property.update({
    //         where: {
    //             id: rental.propertyId
    //         },
    //         data: {
    //             isAvailable: false
    //         }
    //     });

    // }

    return updatedRental;
};



export const LandlordServices = {
    createProperty,
    updateProperty,
    deleteProperty,
    getRentalRequests,
    updateRentalRequest,
}