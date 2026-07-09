import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    port: Number(process.env.PORT),
    database_url: process.env.DATABASE_URL,
    salt_round: process.env.SALT_ROUND,
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
    app_url: process.env.APP_URL,
    stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY!,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY!,
    stripe_webhook_secret_key: process.env.STRIPE_WEBHOOK_SECRET!
};