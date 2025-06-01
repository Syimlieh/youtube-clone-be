import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

// creating schema for Joi validation
export const validateSignup = Joi.object({
    firstName: Joi.string()
        .trim()
        .required()
        .messages({ // provide a clear and readable message for different scenario
            'string.empty': 'First name is required.',
            'any.required': 'First name is mandatory.',
        }),
    lastName: Joi.string()
        .trim()
        .required()
        .messages({ // provide a clear and readable message for different scenario
            'string.empty': 'Last name is required.',
            'any.required': 'Last name is mandatory.',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": 'Email is not allowed to be empty.',
            "any.requried": 'Email is mandatory.',
        }),
    password: Joi.string()
        .min(8)
        .required(), // for simplicity we are not adding regex and validate based on small, cap and special character
    channelId: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Channel name is required.',
            'any.required': 'Channel name is mandatory.',
        }),
});

export const validateSignin = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": 'Email is not allowed to be empty.',
            "any.requried": 'Email is mandatory.',
        }),
    password: Joi.string()
        .min(8)
        .required(),
});


// this will validate any id we pass to our req.
// it will only allow this Mongo generated id format :  6804986b0405747f7569d0f9
export const validateObjectId = Joi.object({
    id: Joi.objectId().required().messages({
        'any.required': 'Id is required.',
        'string.pattern.name': 'Id must be a valid mongo id.',
        'string.empty': 'Id cannot be empty.'
    })
});