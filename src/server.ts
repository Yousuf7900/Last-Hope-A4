import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT;

async function main() {
    try {
        await prisma.$connect();
        app.listen(port, () => {
            console.log("Server running on port: ", port);
        })
    } catch (error) {
        console.log("Server failed to start");
        await prisma.$disconnect();
        process.exit(1);
    }
};

main();