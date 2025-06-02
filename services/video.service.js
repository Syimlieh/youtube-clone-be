import { logger } from '../log/logger.js';
import Videos from '../models/video.model.js';
import { STATUS_MESSAGE } from '../utils/constants.js';
import AppError from '../utils/errors/AppError.js';

export const fetchAllVideos = async (query) => {
    try {
        const results = await Videos.find(query);
        return {
            success: true,
            statusCode: 200,
            message: 'Videos fetch successfully.',
            data: results,
        }
    } catch (error) {
        logger.error(`Failed while fetching Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

export const fetchVideo = async (query) => {
    try {
        const result = await Videos.findOne(query);
        if (!result) {
            return {
                success: false,
                statusCode: 404,
                message: 'Video not found.',
                data: null,
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Video fetch successfully.',
            data: result,
        }
    } catch (error) {
        logger.error(`Failed while fetching Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}
