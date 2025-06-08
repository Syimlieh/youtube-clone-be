

import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/constants.js";

// here we are creating a new mongo schema for our User collection
const CommentSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTIONS.VIDEOS,
        trim: true,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTIONS.PROFILE,
        trim: true,
        required: true
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTIONS.COMMENTS,
        trim: true,
        default: null
    },
}, {
    timestamps: true
})

const Comments = mongoose.model(COLLECTIONS.COMMENTS, CommentSchema);

export default Comments;