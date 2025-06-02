import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

export const validateFetchVideos = Joi.object({
    category: Joi.string()
});
