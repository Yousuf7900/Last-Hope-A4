import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port;

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected");

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();