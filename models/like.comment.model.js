

import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/constants.js"

// here we are creating a new mongo schema for our User collection
const LikeCommentSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTIONS.COMMENTS,
        trim: true,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTIONS.PROFILE,
        trim: true,
        required: true
    },
    isLiked: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const LikesComment = mongoose.model(COLLECTIONS.LIKES_COMMENTS, LikeCommentSchema);

export default LikesComment;