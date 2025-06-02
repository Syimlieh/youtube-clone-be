import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

export const validateVideoComment = Joi.object({
    videoId: Joi.string()
        .required()
        .messages({
            "string.empty": 'Video id is not allowed to be empty.',
            "any.requried": 'Video id mandatory.',
        }),
    parentCommentId: Joi.string(),
    comment: Joi.string()
        .required()
        .messages({
            "string.empty": 'Comment is not allowed to be empty.',
            "any.requried": 'Comment is mandatory.',
        }),
});
