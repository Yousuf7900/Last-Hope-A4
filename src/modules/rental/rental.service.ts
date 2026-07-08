import { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import type { TCreateRental } from "./rental.interface";

const createRental = async (tenantId: string, payload: TCreateRental) => {

    const { propertyId, moveInDate } = payload;

    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    });

    if (!property) {
        throw new Error("Property not found");
    }

    if (!property.isAvailable) {
        throw new Error("Property is not available");
    }

    if (property.landlordId === tenantId) {
        throw new Error("You cannot rent your own property");
    }

    const approvedRental = await prisma.rental.findFirst({
        where: {
            propertyId,
            status: RentalStatus.APPROVED
        }
    });

    if (approvedRental) {
        throw new Error("This property has already been rented.");
    }

    const existingRequest = await prisma.rental.findFirst({
        where: {
            propertyId,
            tenantId,
            status: RentalStatus.PENDING
        }
    });

    if (existingRequest) {
        throw new Error("You already have a pending request for this property");
    }

    const rental = await prisma.rental.create({
        data: {
            propertyId,
            tenantId,
            moveInDate,
            status: RentalStatus.PENDING
        },
        include: {
            property: {
                include: {
                    category: true
                }
            },
            tenant: {
                omit: {
                    password: true
                }
            }
        }
    });

    return rental;
};


const getMyRentals = async (tenantId: string) => {
    const rentals = await prisma.rental.findMany({
        where: {
            tenantId
        },
        include: {
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
}

const getRentalById = async (tenantId: string, rentalId: string) => {
    const rental = await prisma.rental.findUnique({
        where: {
            id: rentalId
        },
        include: {
            property: {
                include: {
                    category: true,
                    landlord: {
                        omit: {
                            password: true
                        }
                    }
                }
            },
            tenant: {
                omit: {
                    password: true
                }
            }
        }
    });

    if (!rental) {
        throw new Error("Rental request not found");
    }
    if (rental.tenantId !== tenantId) {
        throw new Error("You are not authorized to access this rental request");
    }

    return rental;
}

export const RentalServices = {
    createRental,
    getMyRentals,
    getRentalById
};