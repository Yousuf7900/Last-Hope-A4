import bcrypt from "bcryptjs";
import { UserRole } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";

const categories = [
    { name: "Apartment" },
    { name: "House" },
    { name: "Studio" },
    { name: "Villa" },
    { name: "Office" },
    { name: "Duplex" },
    { name: "Penthouse" }
];

const seed = async () => {

    console.log("Data seeding...");

    await prisma.category.createMany({
        data: categories,
        skipDuplicates: true
    });

    const admin = await prisma.user.findUnique({
        where: {
            email: "admin@rentnest.com"
        }
    });

    if (!admin) {

        const hashedPassword = await bcrypt.hash(
            "admin123",
            Number(config.salt_round)
        );

        await prisma.user.create({
            data: {
                name: "System Admin",
                email: "admin@rentnest.com",
                password: hashedPassword,
                role: UserRole.ADMIN
            }
        });

        console.log("Admin created.");
    }

    console.log("Data Seeding completed.");
};

seed()
    .catch((err) => {
        console.error(err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });