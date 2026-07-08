import type { PropertyWhereInput } from "../../generated/prisma/models";

export type TCreateProperty = {
    title: string;
    description: string;

    location: string;
    address: string;

    rentAmount: number;

    bedrooms: number;
    bathrooms: number;

    categoryId: string;
};

export type TUpdateProperty = {
    title?: string;
    description?: string;

    location?: string;
    address?: string;

    rentAmount?: number;

    bedrooms?: number;
    bathrooms?: number;

    isAvailable?: boolean;

    categoryId?: string;
};

export interface TPropertyQuery extends PropertyWhereInput {
    location?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
}