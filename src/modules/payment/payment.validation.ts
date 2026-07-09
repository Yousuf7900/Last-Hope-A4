import { z } from "zod";

const createPaymentValidation = z.object({
    rentalId: z.string().uuid()
});

export const PaymentValidation = {
    createPaymentValidation
};