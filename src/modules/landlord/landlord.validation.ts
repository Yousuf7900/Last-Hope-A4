import { RentalStatus } from "../../../generated/prisma/enums";
import z from "zod";

const createPropertyValidation = z.object({
    title: z.string().min(5),
    description: z.string().min(20),
    location: z.string().min(2),
    address: z.string().min(5),
    rentAmount: z.number().positive(),
    bedrooms: z.number().int().positive(),
    bathrooms: z.number().int().positive(),
    categoryId: z.string().uuid()
});

const updatePropertyValidation =
    createPropertyValidation.partial();


const updateRentalStatusValidation = z.object({
    status: z.enum([
        RentalStatus.APPROVED,
        RentalStatus.REJECTED
    ])
});

export const LandlordValidations = {
    createPropertyValidation,
    updatePropertyValidation,
    updateRentalStatusValidation
}