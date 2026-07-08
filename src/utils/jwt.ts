import jwt, { type JwtPayload, type Secret, type SignOptions } from "jsonwebtoken";

const createToken = (payload: JwtPayload, secret: Secret, expiresIn: SignOptions["expiresIn"]) => {
    const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);

    return token;
}

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret);
}

export const JwtUtils = {
    createToken,
    verifyToken,
}