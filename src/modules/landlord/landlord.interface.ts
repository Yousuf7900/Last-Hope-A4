import type { RentalStatus } from "../../../generated/prisma/enums";

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

export type TUpdateRentalStatus = {
    status: RentalStatus;
}