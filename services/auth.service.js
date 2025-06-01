import bcrypt from "bcrypt";

import { logger } from "../log/logger.js";
import Users from "../models/profile.model.js";
import { STATUS_MESSAGE } from "../utils/constants.js";
import AppError from "../utils/errors/AppError.js";
import { generateToken } from "../utils/jwt.utils.js";

// Our service will be handling all the business logic and saving to our db
export const signUp = async (payload) => {
    try {
        // This can be done in schema too
        // hashing password so we are not storing readable password
        payload.password = await bcrypt.hash(payload.password, parseInt(process.env.SALT));

        const newUser = new Users(payload);
        const addUser = await newUser.save();
        return {
            statusCode: 201,
            message: "User signup successfully.",
            data: addUser,
        };
    } catch (error) {
        logger.error(`Failed while saving Error => ${error.message}`);
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

export const login = async ({ email, password }) => {
    try {
        const user = await Users.findOne({ email }).select("+password"); // this will return the password too as by default we set password select as false in the models
        if (!user) {
            // using same message for both email and password for security purpose.
            throw new AppError('Email or password is incorrect.', user, 400)
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AppError('Email or password is incorrect.', user, 400)
        }

        // This will be our payload for the jwt token.
        // we can add any field as per requirement
        const tokenPayload = {
            email: user.email,
            firstName: user.firstName,
        }
        // generating jwt token
        const token = generateToken(tokenPayload);

        return {
            statusCode: 200,
            message: "User logged in successfully.",
            data: token,
        };
    } catch (error) {
        logger.error(`Failed while trying to login => ${error.message}`);
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

export const getUser = async (query) => {
    try {
        const user = await Users.findOne(query);
        if (!user) {
            throw new AppError('User not found.', user, 404)
        }
        return {
            statusCode: 200,
            message: 'User fetch successfully.',
            data: user,
        }
    } catch (error) {
        logger.error(`Failed while fetching Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}
