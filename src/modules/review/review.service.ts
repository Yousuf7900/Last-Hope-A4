import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";
import GlobalError from "../../error/globalError";
import { prisma } from "../../lib/prisma";
import type { TCreateReview } from "./review.interface";
import httpStatus from "http-status"
const createReview = async (
    tenantId: string,
    payload: TCreateReview
) => {

    const { rentalId, rating, comment } = payload;

    const rental = await prisma.rental.findUnique({
        where: {
            id: rentalId
        },
        include: {
            payment: true,
            property: true,
            review: true
        }
    });

    if (!rental) {
        throw new GlobalError(httpStatus.NOT_FOUND, "Rental not found");
    }

    if (rental.tenantId !== tenantId) {
        throw new GlobalError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    if (
        rental.status !== RentalStatus.ACTIVE &&
        rental.status !== RentalStatus.COMPLETED
    ) {
        throw new GlobalError(httpStatus.BAD_REQUEST, "Review can only be submitted after a successful rental");
    }

    if (!rental.payment || rental.payment.status !== PaymentStatus.PAID) {
        throw new GlobalError(httpStatus.BAD_REQUEST, "Payment is not completed");
    }

    if (rental.review) {
        throw new GlobalError(httpStatus.CONFLICT, "Review already submitted");
    }

    const review = await prisma.review.create({
        data: {
            rentalId,
            propertyId: rental.propertyId,
            tenantId,
            rating,
            comment
        },
        include: {
            property: true,
            tenant: {
                omit: {
                    password: true
                }
            }
        }
    });

    return review;
};

export const ReviewServices = {
    createReview
};