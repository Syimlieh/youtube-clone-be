import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

export const validateFetchVideos = Joi.object({
    title: Joi.string(),
    category: Joi.string(),
});
