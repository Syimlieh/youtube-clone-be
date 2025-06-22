import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

export const validateFetchVideos = Joi.object({
    title: Joi.string(),
    category: Joi.string(),
});

export const videoValidationSchema = Joi.object({
    videoId: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    description: Joi.string().trim().allow("").optional(),
    thumbnail: Joi.string().uri().trim().allow("").optional(),
    url: Joi.string().uri().trim().required(),
    profile: Joi.string().uri().trim().allow("").optional(),
    channel: Joi.string().trim().required(),
    channelId: Joi.string().trim().required(),
    banner: Joi.string().uri().trim().allow("").optional(),
    views: Joi.number().integer().min(0).default(0),
    duration: Joi.string().trim().allow("").optional(),
    publishedAt: Joi.date().iso().optional(),
    subscriberCount: Joi.number().integer().min(0).default(0),
    category: Joi.array().items(Joi.string().trim()).default([])
});

export const validateUpdateVideoSchema = Joi.object({
    title: Joi.string().trim(),
    description: Joi.string().trim().allow("").optional(),
    thumbnail: Joi.string().uri().trim().allow("").optional(),
    url: Joi.string().uri().trim(),
    profile: Joi.string().uri().trim().allow("").optional(),
    channel: Joi.string().trim(),
    channelId: Joi.string().trim(),
    banner: Joi.string().uri().trim().allow("").optional(),
    views: Joi.number().integer().min(0).default(0),
    duration: Joi.string().trim().allow("").optional(),
    publishedAt: Joi.date().iso().optional(),
    subscriberCount: Joi.number().integer().min(0).default(0),
    category: Joi.array().items(Joi.string().trim()).default([])
});
