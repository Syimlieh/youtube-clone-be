import { logger } from "../log/logger.js";
import { STATUS_MESSAGE } from "../utils/constants.js";
import AppError from "../utils/errors/AppError.js";
import FileMetada from "../models/file.metadata.model.js";

// Our service will be handling all the business logic and saving to our db
export const saveFile = async (data) => {
    try {

        const newFile = new FileMetada(data);
        const addFile = await newFile.save();
        return {
            statusCode: 201,
            message: "File saved successfully.",
            data: addFile,
        };
    } catch (error) {
        logger.error(`Failed while saving Error => ${error.message}`);
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}