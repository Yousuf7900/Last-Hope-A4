import jwt, { type Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

const createToken = (
    payload: object,
    secret: Secret,
    expiresIn: string
) => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn as StringValue
    });
};

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret);
};

export const JwtUtils = {
    createToken,
    verifyToken
};