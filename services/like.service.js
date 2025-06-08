import { logger } from '../log/logger.js';
import LikesComment from '../models/like.comment.model.js';
import Likes from '../models/like.video.model.js';
import { STATUS_MESSAGE } from '../utils/constants.js';
import AppError from '../utils/errors/AppError.js';

export const likeOrDislikeVideo = async ({ videoId, userId, isLiked }) => {
    try {
        // first we will check if a reaction already exists
        const existing = await Likes.findOne({ videoId, userId });

        if (existing) {
            // we simple update the reaction if it exist
            existing.isLiked = isLiked;
            const savedLike = await existing.save();
            return {
                success: true,
                statusCode: 200,
                message: 'Video reaction updated.',
                data: savedLike,
            }
        }

        // or we create a new reaction
        const newLike = new Likes({ videoId, userId, isLiked });
        const savedLike = await newLike.save();
        return {
            success: true,
            statusCode: 200,
            message: 'Video reaction added.',
            data: savedLike,
        }
    } catch (error) {
        logger.error(`Failed while adding reaction => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
};

export const likeOrDislikeComment = async ({ commentId, userId, isLiked }) => {
    try {
        // first we will check if a reaction already exists
        const existing = await LikesComment.findOne({ commentId, userId });

        if (existing) {
            // we simple update the reaction if it exist
            existing.isLiked = isLiked;
            const savedLike = await existing.save();
            return {
                success: true,
                statusCode: 200,
                message: 'Comment reaction updated.',
                data: savedLike,
            }
        }

        // or we create a new reaction
        const newLike = new LikesComment({ commentId, userId, isLiked });
        const savedLike = await newLike.save();
        return {
            success: true,
            statusCode: 200,
            message: 'Comment reaction added.',
            data: savedLike,
        }
    } catch (error) {
        logger.error(`Failed while adding reaction => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
};
