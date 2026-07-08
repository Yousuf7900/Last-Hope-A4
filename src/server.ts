import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port;

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