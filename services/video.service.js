import { logger } from '../log/logger.js';
import Videos from '../models/video.model.js';
import { STATUS_MESSAGE } from '../utils/constants.js';
import AppError from '../utils/errors/AppError.js';
import Likes from '../models/like.video.model.js';

export const fetchAllVideos = async (query) => {
    try {
        const mongoQuery = {};
        const { category = "", title = "" } = query;
        if (category) {
            mongoQuery.category = {
                $regex: new RegExp(query.category, 'i')  // case-insensitive regex match
            };
        }

        if (title) {
            mongoQuery.title = {
                $regex: new RegExp(query.title, 'i')  // case-insensitive regex match
            };
        }
        const results = await Videos.find(mongoQuery);
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

export const fetchVideo = async (query, userId) => {
    try {
        const result = await Videos.findOne(query).lean()
        if (!result) {
            return {
                success: false,
                statusCode: 404,
                message: 'Video not found.',
                data: null,
            }
        }

        let likeInfo = null;
        if (userId) {
            likeInfo = await Likes.findOne({ videoId: result._id, userId });
        }
        const likeCount = await Likes.countDocuments({ videoId: result._id, isLiked: true });

        return {
            success: true,
            statusCode: 200,
            message: 'Video fetch successfully.',
            data: {
                ...result,
                likeCount,
                reactedByMe: likeInfo,
            },
        }
    } catch (error) {
        logger.error(`Failed while fetching Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

export const createVideo = async (payload) => {
    try {
        const result = await Videos.create(payload);
        return {
            success: true,
            statusCode: 201,
            message: 'Video added successfully.',
            data: result
        }
    } catch (error) {
        logger.error(`Failed while adding Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

export const updateVideo = async (query, payload) => {
    try {
        const result = await Videos.findOneAndUpdate(
            query,
            { $set: payload },
            { new: true }
        );
        if (!result) {
            return {
                success: false,
                statusCode: 404,
                message: 'Failed to delete video. Not found.',
                data: null,
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Video updated successfully.',
            data: result
        }
    } catch (error) {
        logger.error(`Failed while update Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

export const deleteVideo = async (query) => {
    try {
        const result = await Videos.findOneAndDelete(
            query,
        );
        if (!result) {
            return {
                success: false,
                statusCode: 404,
                message: 'Failed to delete video. Not found.',
                data: null,
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Video deleted successfully.',
            data: result
        }
    } catch (error) {
        logger.error(`Failed while update Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}
