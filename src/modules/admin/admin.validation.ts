import { z } from "zod";

const createCategoryValidation = z.object({
    name: z.string().min(2).max(50)
});

const updateCategoryValidation = z.object({
    name: z.string().min(2).max(50)
});

export const AdminValidation = {
    createCategoryValidation,
    updateCategoryValidation
};