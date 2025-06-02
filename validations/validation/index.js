import { validateSignup, validateSignin, validateObjectId } from './auth.validation.js';

import { validateFetchVideos } from './video.validation.js';

import { validateVideoReaction } from './like.validation.js';

import { validateVideoComment } from './comment.validation.js';

export {
    validateSignup,
    validateSignin,
    validateObjectId,

    // video validation
    validateFetchVideos,

    // like validation
    validateVideoReaction,

    // comment validation
    validateVideoComment
};