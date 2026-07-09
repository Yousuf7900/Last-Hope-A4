import { z } from "zod";

const propertyQueryValidation = z.object({
    search: z.string().optional(),
    location: z.string().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    categoryId: z.string().optional()
});

export const PropertyValidation = {
    propertyQueryValidation
};