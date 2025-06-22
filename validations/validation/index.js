import { validateSignup, validateSignin, validateObjectId } from './auth.validation.js';

import { validateFetchVideos, videoValidationSchema, validateUpdateVideoSchema } from './video.validation.js';

import { validateVideoReaction, validateCommentReaction } from './like.validation.js';

import { validateVideoComment, validateUpdateComment } from './comment.validation.js';

export {
    validateSignup,
    validateSignin,
    validateObjectId,

    // video validation
    validateFetchVideos,
    videoValidationSchema,
    validateUpdateVideoSchema,

    // like validation
    validateVideoReaction,
    validateCommentReaction,

    // comment validation
    validateVideoComment,
    validateUpdateComment
};