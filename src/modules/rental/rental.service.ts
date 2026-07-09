import { RentalStatus } from "../../../generated/prisma/enums";
import GlobalError from "../../error/globalError";
import { prisma } from "../../lib/prisma";
import type { TCreateRental } from "./rental.interface";
import httpStatus from "http-status"
const createRental = async (tenantId: string, payload: TCreateRental) => {

    const { propertyId, moveInDate } = payload;

    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    });

    if (!property) {
        throw new GlobalError(httpStatus.NOT_FOUND, "Property not found");
    }

    if (!property.isAvailable) {
        throw new GlobalError(httpStatus.NOT_FOUND, "Property is not available");
    }

    if (property.landlordId === tenantId) {
        throw new GlobalError(httpStatus.BAD_REQUEST, "You cannot rent your own property");
    }

    const approvedRental = await prisma.rental.findFirst({
        where: {
            propertyId,
            status: RentalStatus.APPROVED
        }
    });

    if (approvedRental) {
        throw new GlobalError(httpStatus.CONFLICT, "This property has already been rented.");
    }

    const existingRequest = await prisma.rental.findFirst({
        where: {
            propertyId,
            tenantId,
            status: RentalStatus.PENDING
        }
    });

    if (existingRequest) {
        throw new GlobalError(httpStatus.CONFLICT, "You already have a pending request for this property");
    }

    const rental = await prisma.rental.create({
        data: {
            propertyId,
            tenantId,
            status: RentalStatus.PENDING,
            ...(moveInDate ? { moveInDate } : {})
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
        throw new GlobalError(httpStatus.NOT_FOUND, "Rental request not found");
    }
    if (rental.tenantId !== tenantId) {
        throw new GlobalError(httpStatus.FORBIDDEN, "You are not authorized to access this rental request");
    }

    return rental;
}

export const RentalServices = {
    createRental,
    getMyRentals,
    getRentalById
};