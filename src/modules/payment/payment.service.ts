import type Stripe from "stripe";
import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import type { TCreatePayment } from "./payment.interface";
import httpStatus from "http-status";
import GlobalError from "../../error/globalError";

const createPayment = async (tenantId: string, payload: TCreatePayment) => {
    const { rentalId } = payload;

    const rental = await prisma.rental.findUnique({
        where: {
            id: rentalId
        },
        include: {
            property: true,
            payment: true
        }
    });

    if (!rental) {
        throw new GlobalError(httpStatus.NOT_FOUND,"Rental request not found");
    }

    if (rental.tenantId !== tenantId) {
        throw new GlobalError(httpStatus.FORBIDDEN,"You are not authorized to pay for this rental");
    }

    if (rental.status !== RentalStatus.APPROVED) {
        throw new GlobalError(httpStatus.BAD_REQUEST,"Rental request is not approved yet");
    }

    if (rental.payment) {
        throw new GlobalError(httpStatus.CONFLICT,"Payment already exists for this rental");
    }

    const payment = await prisma.payment.create({
        data: {
            tenantId,
            rentalId,
            amount: rental.property.rentAmount,
            provider: "STRIPE",
            status: PaymentStatus.PENDING
        }
    });

    const session = await stripe.checkout.sessions.create({
        mode: "payment",

        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: rental.property.title,
                        description: rental.property.description
                    },
                    unit_amount: Math.round(rental.property.rentAmount * 100)
                },
                quantity: 1
            }
        ],

        metadata: {
            paymentId: payment.id,
            rentalId: rental.id
        },
        success_url: `${config.app_url}/payment/success`,
        cancel_url: `${config.app_url}/payment/cancel`
    });

    return {
        checkoutUrl: session.url,
        paymentId: payment.id
    }
}

const confirmPayment = async (event: Stripe.Event) => {

    if (event.type !== "checkout.session.completed") {
        return;
    }

    const session = event.data.object as Stripe.Checkout.Session;

    const paymentId = session.metadata?.paymentId;

    if (!paymentId) {
        throw new GlobalError(httpStatus.BAD_REQUEST,"Payment metadata not found");
    }

    const paymentIntentId = session.payment_intent?.toString() ?? null;

    const payment = await prisma.payment.update({
        where: {
            id: paymentId
        },
        data: {
            status: PaymentStatus.PAID,
            transactionId: paymentIntentId,
            paymentIntentId,
            method: "CARD",
            paidAt: new Date()
        },
        include: {
            rental: true
        }
    });

    await prisma.rental.update({
        where: {
            id: payment.rentalId
        },
        data: {
            status: RentalStatus.ACTIVE
        }
    });

    await prisma.property.update({
        where: {
            id: payment.rental.propertyId
        },
        data: {
            isAvailable: false
        }
    });

};

const getMyPayments = async (tenantId: string) => {

    const payments = await prisma.payment.findMany({
        where: {
            tenantId
        },
        include: {
            rental: {
                include: {
                    property: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return payments;
};

const getPaymentById = async (
    tenantId: string,
    paymentId: string
) => {

    const payment = await prisma.payment.findUnique({
        where: {
            id: paymentId
        },
        include: {
            rental: {
                include: {
                    property: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        }
    });

    if (!payment) {
        throw new GlobalError(httpStatus.NOT_FOUND,"Payment not found");
    }

    if (payment.tenantId !== tenantId) {
        throw new GlobalError(httpStatus.FORBIDDEN,"You are not authorized to access this payment");
    }

    return payment;
};

export const PaymentServices = {
    createPayment,
    confirmPayment,
    getMyPayments,
    getPaymentById
}