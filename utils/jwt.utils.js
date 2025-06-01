import jwt from "jsonwebtoken"
import AppError from "./errors/AppError.js";
import { logger } from "../log/logger.js";

// getting seret and expires from our env
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const generateToken = (payload) => {
    // generating new jwt token
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
    try {
        // verify if token is valid or not
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        logger.error("Token verification failed.")
        throw new AppError("Verification failed due to invalid token.", error, error.statusCode || 500);
    }
};
