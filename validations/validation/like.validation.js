import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

export const validateVideoReaction = Joi.object({
    videoId: Joi.objectId()
        .required()
        .messages({
            "string.empty": 'Video id is not allowed to be empty.',
            "any.requried": 'Video id mandatory.',
            "string.pattern.name": 'Id must be a valid mongo id.',
        }),
    isLiked: Joi.boolean().required(),
});

export const validateCommentReaction = Joi.object({
    commentId: Joi.objectId()
        .required()
        .messages({
            "string.empty": 'Comment id is not allowed to be empty.',
            "any.requried": 'Comment id mandatory.',
            "string.pattern.name": 'Id must be a valid mongo id.',
        }),
    isLiked: Joi.boolean().required(),
});