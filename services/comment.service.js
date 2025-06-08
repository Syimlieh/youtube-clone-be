import { logger } from '../log/logger.js';
import Comments from '../models/comment.model.js';
import { fetchCommentsPipeline } from '../pipelines/comment.pipeline.js';
import { STATUS_MESSAGE } from '../utils/constants.js';
import AppError from '../utils/errors/AppError.js';

export const addNewComment = async (payload) => {
    try {
        if (payload.parentCommentId) {
            const filter = {
                _id: payload.parentCommentId,
                videoId: payload.videoId
            } // i am using both video id and comment id to match the parent comment
            const parentComment = await Comments.findOne(filter);
            if (!parentComment) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'No such comment exists.',
                    data: null,
                };
            }
        }

        const newComment = new Comments(payload);
        const saveComment = await newComment.save();
        if (!saveComment) {
            return {
                success: false,
                statusCode: 500,
                message: 'Failed to add comment.',
                data: null,
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Comment added successfully.',
            data: saveComment,
        }
    } catch (error) {
        logger.error(`Failed while adding comment => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
};

export const fetchComments = async (query) => {
    try {
        const pipeline = fetchCommentsPipeline(query);
        const result = await Comments.aggregate(pipeline);
        return {
            success: true,
            statusCode: 200,
            message: 'Comments fetched successfully.',
            data: result,
        };
    } catch (error) {
        logger.error(`Failed while fetching Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}