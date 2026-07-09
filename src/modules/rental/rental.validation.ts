import { z } from "zod";

const createRentalValidation = z.object({
    propertyId: z.string().uuid(),

    moveInDate: z
        .string()
        .datetime()
        .optional()
});

export const RentalValidation = {
    createRentalValidation
};