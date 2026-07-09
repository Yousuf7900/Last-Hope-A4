import { prisma } from "../../lib/prisma";


const getUsers = async () => {

    const users = await prisma.user.findMany({
        omit: {
            password: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return users;
};


export const AdminServices = {
    getUsers,
}